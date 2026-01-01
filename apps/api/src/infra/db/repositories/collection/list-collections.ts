import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { paginationForComplexQuery, type Pagination } from "@/shared/lib/pagination";
import type { CollectionSelectResult } from "./types";
import { collectionEntitySelect, toCollectionEntity } from "./collection-entity";

/**
 * LIST
 */
const listCollectionsSelectFn = async <TSelect extends Prisma.CollectionSelect>(
  where: Prisma.CollectionWhereInput,
  select: TSelect,
  orderBy?: Prisma.CollectionOrderByWithRelationInput | Prisma.CollectionOrderByWithRelationInput[],
  pagination?: Pagination
): Promise<CollectionSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countCollectionsAboveId(pagination?.findId, where)
  );

  return getPrisma().collection.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listCollectionsSelect = handleError(listCollectionsSelectFn);

/**
 * LIST ENTITIES
 */
export const listCollectionsEntity = async (
  where: Prisma.CollectionWhereInput,
  orderBy?: Prisma.CollectionOrderByWithRelationInput | Prisma.CollectionOrderByWithRelationInput[],
  pagination?: Pagination
) => {
  const collections = await listCollectionsSelect(where, collectionEntitySelect, orderBy, pagination);
  return collections.map(toCollectionEntity);
};

/**
 * COUNT
 */
const countCollectionsAboveId = async (
  id: string | undefined,
  where?: Prisma.CollectionWhereInput
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().collection.count({
    where: { ...where, id: { gt: id } },
  });
};
