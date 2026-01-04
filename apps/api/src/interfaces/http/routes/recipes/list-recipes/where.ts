import type { Prisma } from "@/generated/prisma/client";
import {
  defineWhereConfigs,
  whereDateRange,
  whereEnumValue,
  whereString,
  whereUuidArray,
  whereCustom,
} from "@/shared/lib/list-query";
import { recipeDifficultySchema, recipeBudgetSchema, recipeSourceSchema } from "@cookmate/domain";
import { z } from "zod";

type WhereInput = Prisma.RecipeWhereInput;

export const listRecipesWhereConfigs = defineWhereConfigs<WhereInput>([
  whereString("whereTitle", {
    field: "title",
    description: "Filter by title (contains)",
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
