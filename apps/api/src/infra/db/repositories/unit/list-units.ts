import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { UnitSelectResult } from "./types";

/**
 * LIST
 */
const listUnitsSelectFn = async <TSelect extends Prisma.UnitSelect>(
  where: Prisma.UnitWhereInput,
  select: TSelect,
  orderBy?: Prisma.UnitOrderByWithRelationInput | Prisma.UnitOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<UnitSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countUnitsAboveId(pagination?.findId, where),
  );

  return getPrisma().unit.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listUnitsSelect = handleError(listUnitsSelectFn);

/**
 * COUNT
 */
const countUnitsAboveId = async (
  id: string | undefined,
  where?: Prisma.UnitWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().unit.count({
    where: { ...where, id: { gt: id } },
  });
};
