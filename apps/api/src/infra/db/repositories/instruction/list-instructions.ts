import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { paginationForComplexQuery, type Pagination } from "@/shared/lib/pagination";
import type { InstructionSelectResult } from "./types";

/**
 * LIST
 */
const listInstructionsSelectFn = async <TSelect extends Prisma.InstructionSelect>(
  where: Prisma.InstructionWhereInput,
  select: TSelect,
  orderBy?: Prisma.InstructionOrderByWithRelationInput | Prisma.InstructionOrderByWithRelationInput[],
  pagination?: Pagination
): Promise<InstructionSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countInstructionsAboveId(pagination?.findId, where)
  );

  return getPrisma().instruction.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listInstructionsSelect = handleError(listInstructionsSelectFn);

/**
 * COUNT
 */
const countInstructionsAboveId = async (
  id: string | undefined,
  where?: Prisma.InstructionWhereInput
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().instruction.count({
    where: { ...where, id: { gt: id } },
  });
};
