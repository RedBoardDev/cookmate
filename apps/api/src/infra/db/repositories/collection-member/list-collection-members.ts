import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { paginationForComplexQuery, type Pagination } from "@/shared/lib/pagination";
import type { CollectionMemberSelectResult } from "./types";

/**
 * LIST
 */
const listCollectionMembersSelectFn = async <TSelect extends Prisma.CollectionMemberSelect>(
  where: Prisma.CollectionMemberWhereInput,
  select: TSelect,
  orderBy?:
    | Prisma.CollectionMemberOrderByWithRelationInput
    | Prisma.CollectionMemberOrderByWithRelationInput[],
  pagination?: Pagination
): Promise<CollectionMemberSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countCollectionMembersAboveId(pagination?.findId, where)
  );

  return getPrisma().collectionMember.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listCollectionMembersSelect = handleError(listCollectionMembersSelectFn);

/**
 * COUNT
 */
const countCollectionMembersAboveId = async (
  id: string | undefined,
  where?: Prisma.CollectionMemberWhereInput
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().collectionMember.count({
    where: { ...where, id: { gt: id } },
  });
};
