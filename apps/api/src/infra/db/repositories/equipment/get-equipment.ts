import { EquipmentNotFoundError } from "@cookmate/domain/equipment";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { EquipmentSelectResult } from "./types";

/**
 * GET
 */
const getEquipmentSelectFn = async <TSelect extends Prisma.EquipmentSelect>(
  where: Prisma.EquipmentWhereUniqueInput,
  select: TSelect,
): Promise<EquipmentSelectResult<TSelect>> => {
  const equipment = await getPrisma().equipment.findUnique({ where, select });
  if (!equipment) throw new EquipmentNotFoundError(where.id);
  return equipment;
};

export const getEquipmentSelect = handleError(getEquipmentSelectFn);

/**
 * FIND FIRST
 */
const findFirstEquipmentFn = async <TSelect extends Prisma.EquipmentSelect>(
  where: Prisma.EquipmentWhereInput,
  select: TSelect,
): Promise<EquipmentSelectResult<TSelect> | null> => {
  return getPrisma().equipment.findFirst({ where, select });
};

export const findFirstEquipment = handleError(findFirstEquipmentFn);
