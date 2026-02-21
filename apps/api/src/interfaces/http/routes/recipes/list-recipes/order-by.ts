import type { Prisma } from "@/generated/prisma/client";
import { defineSortConfig } from "@/shared/lib/list-query";

type OrderByInput = Prisma.RecipeOrderByWithRelationInput;

export const listRecipesSortConfig = defineSortConfig<OrderByInput>({
  default: [{ createdAt: "desc" }],
  fields: {
    createdAt: (direction) => ({ createdAt: direction }),
    updatedAt: (direction) => ({ updatedAt: direction }),
    name: (direction) => ({ name: direction }),
    totalTimeMin: (direction) => ({ totalTimeMin: direction }),
  },
});
