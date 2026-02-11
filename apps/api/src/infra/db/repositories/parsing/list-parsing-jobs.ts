import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { ParsingJobSelectResult } from "./types";

/**
 * LIST
 */
const listParsingJobsSelectFn = async <TSelect extends Prisma.ParsingJobSelect>(
  where: Prisma.ParsingJobWhereInput,
  select: TSelect,
  orderBy?: Prisma.ParsingJobOrderByWithRelationInput | Prisma.ParsingJobOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<ParsingJobSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countParsingJobsAboveId(pagination?.findId, where),
  );

  return getPrisma().parsingJob.findMany({
    where,
    select,
    orderBy: orderBy ?? { createdAt: "desc" },
    ...paginationQuery,
  });
};

export const listParsingJobsSelect = handleError(listParsingJobsSelectFn);

/**
 * COUNT
 */
const countParsingJobsAboveId = async (
  id: string | undefined,
  where?: Prisma.ParsingJobWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().parsingJob.count({
    where: { ...where, id: { gt: id } },
  });
};
