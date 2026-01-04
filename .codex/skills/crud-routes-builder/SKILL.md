---
name: crud-routes-builder
description: Generate base HTTP CRUD routes (create, list, get, delete) for a domain entity in apps/api/src/interfaces/http/routes, using existing domain fields/schemas and repositories; handles nested sub-entities via Fastify prefixes. Use when asked to scaffold CRUD routes for an entity (e.g., "Crée les routes CRUD pour Recipe", "Génère le CRUD de l'entité Ingredient", "Fais les routes CRUD de Member dans Collection").
---
# CRUD Routes Builder

Create the four base routes under `apps/api/src/interfaces/http/routes/{entities}/` following the `collections` example already in the repo. Domain + repository must already exist; leave imports unresolved if missing. No update route.

## Inputs to confirm
- Singular + plural names (kebab case), especially irregular plurals.
- Whether this is a sub-entity and its parent (parent folder + `parentId` param name).
- Tag/summary/description strings (PascalCase plural tags; e.g., `["Collections"]`, `["Collection Members"]`).

## Naming & placement
- Folder: lower kebab plural (e.g., `collections`).
- Files: `create-{entity}`, `list-{entities}`, `get-{entity}`, `delete-{entity}`.
- Parent index registers routes; sub-entity routes live in `{parent-entities}/{sub-entities}/` and are registered from the parent with `prefix: "/:parentId/sub-entities"`.

## Route registration (index.ts)
```ts
import type { FastifyInstance } from "fastify";
import { createEntityRoute } from "./create-entity";
import { listEntitiesRoute } from "./list-entities";
import { getEntityRoute } from "./get-entity";
import { deleteEntityRoute } from "./delete-entity";
// import { subRoutes } from "./sub-entities";

export async function entitiesRoutes(app: FastifyInstance) {
  await app.register(listEntitiesRoute);
  await app.register(getEntityRoute);
  await app.register(createEntityRoute);
  await app.register(deleteEntityRoute);
  // await app.register(subRoutes, { prefix: "/:parentId/sub-entities" });
}
```

## Create route (create-{entity}/)
- `index.ts`: `route().post().auth().meta({ tags, summary, description }).schemas(schemas).handle(createEntityHandler)`.
- `schema.ts`: body from domain fields (`{ ...entityFields.foo }`), `response` `{ 201: entitySnapshotSchema }`, export `schemas`.
- `handler.ts`: `RouteHandler<typeof schemas>`, grab `ctx.user`/`ctx.body`, run `createEntityErrors` if needed, call `createEntity` from `db-access`, return `{ status: HttpStatus.Created, data: entity.toSnapshot() }`.
- `db-access.ts`: import `getPrisma`, `handleError`, `{ Entity }` from `@cookmate/domain/{entity}`; build entity (set timestamps/owner fields), persist with prisma (map domain names to Prisma columns like ownerId -> userId), wrap with `handleError`.

## List route (list-{entities}/)
- `select.ts`: define Prisma `select`, `responseSchema` (usually `z.array(...)`), and `transform`; export `selectConfig` (use `SelectConfig` type from `@/shared/types/select-config`).
- `where.ts`: export `listEntitiesWhereConfigs` via `defineWhereConfigs`.
- `order-by.ts`: export `listEntitiesSortConfig` via `defineSortConfig`.
- `schema.ts`: `query` uses `defineListQuerySchema({ where, sort })`; `response` uses `selectConfig.schema`; export `schemas`. For sub-entities include `params` with parentId.
- `handler.ts`: parse query with `parsePagination`, `parseWhereParams`, `parseSortParams`, build `where` with `combineWhere`, then call `listEntitiesSelect` and `countEntities`. Return `{ status: HttpStatus.OK, data: selectConfig.transform(...), metadata: { pagination } }`.

## Get route (get-{entity}/)
- `select.ts`: same pattern, but `responseSchema` is a single object (not array). `transform` may accept extra options (e.g., `isOwner`).
- `schema.ts`: `params` `z.object({ {entityId}: z.uuid() })`, `response` `{ 200: selectConfig.schema }`.
- `handler.ts`: fetch via repository `getEntitySelect` with `selectConfig.select`; run `getEntityErrors` if needed; return `{ status: HttpStatus.OK, data: selectConfig.transform(result, options) }`.

## Delete route (delete-{entity}/)
- `index.ts`: `route().delete("/:{entityId}")`.
- `schema.ts`: `params` UUID, `response` `{ 204: z.null() }`.
- `handler.ts`: run `deleteEntityErrors`, call local `deleteEntity` (db-access), return `{ status: HttpStatus.NoContent }`.
- `db-access.ts`: `deleteEntity = handleError(async (id) => { await getPrisma().entity.delete({ where: { id } }); })`.

## Sub-entities
- Folder: `{parent-entities}/{sub-entities}/`, with its own `index.ts` registering subroutes.
- Parent `index.ts` registers subroutes with `prefix: "/:parentId/{sub-entities}"` and parent params include `{ parentId: z.uuid() }`.
- Tags: PascalCase plural with parent context (e.g., `["Collection Members"]`).

## References
- apps/api/src/interfaces/http/routes/collections/**
- apps/api/src/interfaces/http/routes/collections/members/**
