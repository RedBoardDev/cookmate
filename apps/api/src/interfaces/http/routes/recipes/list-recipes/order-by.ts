import type { Prisma } from "@/generated/prisma/client";
import { defineSortConfig } from "@/shared/lib/list-query";

type OrderByInput = Prisma.RecipeOrderByWithRelationInput;

export const listRecipesSortConfig = defineSortConfig<OrderByInput>({
  default: [{ createdAt: "desc" }, { id: "desc" }],
  fields: {
    id: (direction) => ({ id: direction }),
    createdAt: (direction) => [{ createdAt: direction }, { id: direction }],
    updatedAt: (direction) => [{ updatedAt: direction }, { id: direction }],
    name: (direction) => [{ name: direction }, { id: direction }],
    totalTimeMin: (direction) => [{ totalTimeMin: direction }, { id: direction }],
  },
});
