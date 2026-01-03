# List Query Helpers

Keep list routes consistent, explicit, and well-typed (OpenAPI/Zod).

## Standard query params
- Pagination: `page`, `pageSize`, `findId`
- Sort: `sort=field:asc|desc` (CSV or repeated param)
- Where: `where<Field>` and `where<Field>Gte` / `where<Field>Lte`
- Arrays: CSV or repeated param for every array filter

## Behavior
- Arrays accept CSV or repeated query params.
- All filters are combined with AND only.
- Invalid query params return 400 (validation error).
- Handlers stay explicit: `where`, `orderBy`, `pagination` are visible and passed to repo calls.
- Helper `field` values are type-checked against Prisma `WhereInput` keys.

## Folder layout
- `config/where/*` helpers to define filters
- `config/sort/*` helper to define sorting
- `parse/*` parse functions (no DB calls)
- `schema/*` query schema builder
- `utils/*` shared helpers
- `types/*` shared types

## Typical usage

### 1) Define where filters
```ts
import type { Prisma } from "@/generated/prisma/client";
import { z } from "zod";
import { recipeTagSchema } from "@cookmate/domain/recipe";
import {
  defineWhereConfigs,
  whereDateRange,
  whereEnumArray,
  whereEnumValue,
  whereNumber,
  whereNumberArray,
  whereCustom,
  whereString,
  whereUuidArray,
} from "@/shared/lib/list-query";

type WhereInput = Prisma.RecipeWhereInput;

export const listRecipesWhereConfigs = defineWhereConfigs<WhereInput>([
  whereString("whereTitle", {
    field: "title",
    description: "Filter by title (contains)",
    contains: true,
    insensitive: true,
  }),
  whereEnumArray("whereTags", {
    field: "tags",
    description: "Filter by tags (ANY)",
    schema: recipeTagSchema,
    op: "hasSome",
  }),
  whereEnumValue("whereDifficulty", {
    field: "difficulty",
    description: "Filter by difficulty",
    schema: z.enum(["EASY", "MEDIUM", "HARD"]),
  }),
  whereNumber("whereServings", {
    field: "servings",
    description: "Filter by servings",
    int: true,
    min: 1,
  }),
  whereNumberArray("whereTotalTimeMin", {
    field: "totalTimeMin",
    description: "Filter by total time (minutes)",
    op: "in",
    int: true,
  }),
  whereCustom("whereComplex", {
    description: "Complex filter",
    schema: z.string(),
    toWhere: (value, ctx) => ({
      AND: [{ title: { contains: value } }, { userId: ctx.user.id }],
    }),
  }),
  whereUuidArray("whereIds", {
    field: "id",
    description: "Filter by recipe IDs",
    op: "in",
  }),
  whereDateRange("whereCreatedAt", {
    field: "createdAt",
    description: "Filter by createdAt range",
  }),
]);
```

### 2) Define sort config
```ts
import type { Prisma } from "@/generated/prisma/client";
import { defineSortConfig } from "@/shared/lib/list-query";

type OrderByInput = Prisma.RecipeOrderByWithRelationInput;

export const listRecipesSortConfig = defineSortConfig<OrderByInput>({
  default: [{ createdAt: "desc" }, { id: "desc" }],
  fields: {
    createdAt: (direction) => ({ createdAt: direction }),
    title: (direction) => ({ title: direction }),
  },
});
```

### 3) Build query schema
```ts
import { defineListQuerySchema } from "@/shared/lib/list-query";
import { listRecipesWhereConfigs } from "./where";
import { listRecipesSortConfig } from "./order-by";

export const query = defineListQuerySchema({
  where: listRecipesWhereConfigs,
  sort: listRecipesSortConfig,
});
```

### 4) Handler (explicit)
```ts
const pagination = parsePagination(ctx.query);
const filters = parseWhereParams(ctx.query, listRecipesWhereConfigs, ctx);
const orderBy = parseSortParams(ctx.query, listRecipesSortConfig);
const where = combineWhere({ userId: ctx.user.id }, filters);

const [items, totalItems] = await Promise.all([
  listRecipesEntity(where, orderBy, pagination),
  countRecipes(where),
]);
```

## Other helpers
```ts
import { whereBoolean } from "@/shared/lib/list-query";

type WhereInput = { isPublished?: boolean };

const whereIsPublished = whereBoolean<WhereInput>("whereIsPublished", {
  field: "isPublished",
  description: "Filter by published state",
});
```

## Notes
- `parseWhereParams` returns `undefined` when no filters are provided.
- `combineWhere` only handles AND (no OR/NOT).
- `sort` is strict: `field:asc|desc`.
