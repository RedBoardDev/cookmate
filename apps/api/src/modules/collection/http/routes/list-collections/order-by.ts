import type { Prisma } from "@/generated/prisma/client";
import { defineSortConfig } from "@/shared/lib/list-query";

type OrderByInput = Prisma.CollectionOrderByWithRelationInput;

export const listCollectionsSortConfig = defineSortConfig<OrderByInput>({
  default: [{ id: "desc" }],
  fields: {
    createdAt: (direction) => ({ createdAt: direction }),
    updatedAt: (direction) => ({ updatedAt: direction }),
    name: (direction) => ({ name: direction }),
  },
});
