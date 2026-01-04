import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { UnitNotFoundError } from "@cookmate/domain/unit";
import type { UnitSelectResult } from "./types";

/**
 * GET
 */
const getUnitSelectFn = async <TSelect extends Prisma.UnitSelect>(
  where: Prisma.UnitWhereUniqueInput,
  select: TSelect
): Promise<UnitSelectResult<TSelect>> => {
  const unit = await getPrisma().unit.findUnique({ where, select });
  if (!unit) throw new UnitNotFoundError(where.id);
  return unit;
};

export const getUnitSelect = handleError(getUnitSelectFn);

/**
 * FIND FIRST
 */
const findFirstUnitFn = async <TSelect extends Prisma.UnitSelect>(
  where: Prisma.UnitWhereInput,
  select: TSelect
): Promise<UnitSelectResult<TSelect> | null> => {
  return getPrisma().unit.findFirst({ where, select });
};

export const findFirstUnit = handleError(findFirstUnitFn);
