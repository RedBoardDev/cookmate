import type { Prisma } from "@/generated/prisma/client";
import { defineSortConfig } from "@/shared/lib/list-query";

type OrderByInput = Prisma.CollectionMemberOrderByWithRelationInput;

export const listMembersSortConfig = defineSortConfig<OrderByInput>({
  default: [{ id: "desc" }],
  fields: {
    joinedAt: (direction) => ({ joinedAt: direction }),
    userId: (direction) => ({ userId: direction }),
  },
});
