import type { Prisma } from "@/generated/prisma/client";
import { defineWhereConfigs, whereDateRange, whereUuidArray } from "@/shared/lib/list-query";

type WhereInput = Prisma.RecipeImageWhereInput;

export const listRecipeImagesWhereConfigs = defineWhereConfigs<WhereInput>([
  whereUuidArray("whereIds", {
    field: "id",
    description: "Filter by image IDs",
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
]);
