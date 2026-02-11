import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { CollectionSelectResult } from "./types";

/**
 * LIST
 */
const listCollectionsSelectFn = async <TSelect extends Prisma.CollectionSelect>(
  where: Prisma.CollectionWhereInput,
  select: TSelect,
  orderBy?: Prisma.CollectionOrderByWithRelationInput | Prisma.CollectionOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<CollectionSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countCollectionsAboveId(pagination?.findId, where),
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
 * COUNT
 */
const countCollectionsAboveId = async (
  id: string | undefined,
  where?: Prisma.CollectionWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().collection.count({
    where: { ...where, id: { gt: id } },
  });
};
