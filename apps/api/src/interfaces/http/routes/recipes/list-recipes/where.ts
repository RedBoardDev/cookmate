import {
  recipeAttributeSchema,
  recipeBudgetSchema,
  recipeCategorySchema,
  recipeDifficultySchema,
  recipeSourceSchema,
} from "@cookmate/domain";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import {
  defineWhereConfigs,
  whereCustom,
  whereDateRange,
  whereEnumArray,
  whereEnumValue,
  whereString,
  whereUuidArray,
} from "@/shared/lib/list-query";
import { arrayParamSchema } from "@/shared/lib/list-query/utils/array-param-schema";

type WhereInput = Prisma.RecipeWhereInput;

export const listRecipesWhereConfigs = defineWhereConfigs<WhereInput>([
  whereString("whereName", {
    field: "name",
    description: "Filter by name (contains)",
    contains: true,
    insensitive: true,
  }),
  whereString("whereDescription", {
    field: "description",
    description: "Filter by description (contains)",
    contains: true,
    insensitive: true,
  }),
  whereEnumValue("whereDifficulty", {
    field: "difficulty",
    description: "Filter by difficulty",
    schema: recipeDifficultySchema,
  }),
  whereEnumValue("whereBudget", {
    field: "budget",
    description: "Filter by budget",
    schema: recipeBudgetSchema,
  }),
  whereEnumValue("whereSource", {
    field: "source",
    description: "Filter by source",
    schema: recipeSourceSchema,
  }),
  whereEnumArray("whereCategories", {
    field: "categories",
    description: "Filter by categories (has at least one)",
    schema: recipeCategorySchema,
    op: "hasSome",
  }),
  whereEnumArray("whereAttributes", {
    field: "attributes",
    description: "Filter by attributes (has at least one)",
    schema: recipeAttributeSchema,
    op: "hasSome",
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
  whereDateRange("whereUpdatedAt", {
    field: "updatedAt",
    description: "Filter by updatedAt range",
  }),
  whereCustom("whereCollectionIds", {
    description: "Filter by collection IDs",
    schema: arrayParamSchema(z.uuid()),
    toWhere: (value) => ({
      collections: {
        some: {
          id: { in: value },
        },
      },
    }),
  }),
  whereCustom("whereTotalTimeMax", {
    description: "Filter by max total time (minutes)",
    schema: z.coerce.number().int().min(0),
    toWhere: (value) => ({ totalTimeMin: { lte: value } }),
  }),
  whereCustom("whereTotalTimeMin", {
    description: "Filter by min total time (minutes)",
    schema: z.coerce.number().int().min(0),
    toWhere: (value) => ({ totalTimeMin: { gte: value } }),
  }),
]);
