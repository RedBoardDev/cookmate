import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { UserSelectResult } from "./types";

/**
 * LIST
 */
const listUsersSelectFn = async <TSelect extends Prisma.UserSelect>(
  where: Prisma.UserWhereInput,
  select: TSelect,
  orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<UserSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countUsersAboveId(pagination?.findId, where),
  );

  return getPrisma().user.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listUsersSelect = handleError(listUsersSelectFn);

/**
 * COUNT
 */
const countUsersAboveId = async (
  id: string | undefined,
  where?: Prisma.UserWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().user.count({
    where: { ...where, id: { gt: id } },
  });
};
