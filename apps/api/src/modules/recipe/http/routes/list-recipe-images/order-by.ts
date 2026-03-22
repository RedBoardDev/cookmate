import type { Prisma } from "@/generated/prisma/client";
import { defineSortConfig } from "@/shared/lib/list-query";

type OrderByInput = Prisma.RecipeImageOrderByWithRelationInput;

export const listRecipeImagesSortConfig = defineSortConfig<OrderByInput>({
  default: [{ order: "asc" }, { createdAt: "asc" }],
  fields: {
    order: (direction) => ({ order: direction }),
    createdAt: (direction) => ({ createdAt: direction }),
    updatedAt: (direction) => ({ updatedAt: direction }),
  },
});
