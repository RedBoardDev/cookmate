import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { type Pagination, paginationForComplexQuery } from "@/shared/lib/pagination";
import { handleError } from "@/shared/utils/handle-error";
import type { EquipmentSelectResult } from "./types";

/**
 * LIST
 */
const listEquipmentsSelectFn = async <TSelect extends Prisma.EquipmentSelect>(
  where: Prisma.EquipmentWhereInput,
  select: TSelect,
  orderBy?: Prisma.EquipmentOrderByWithRelationInput | Prisma.EquipmentOrderByWithRelationInput[],
  pagination?: Pagination,
): Promise<EquipmentSelectResult<TSelect>[]> => {
  const paginationQuery = await paginationForComplexQuery(pagination, () =>
    countEquipmentsAboveId(pagination?.findId, where),
  );

  return getPrisma().equipment.findMany({
    where,
    select,
    orderBy: orderBy ?? { id: "desc" },
    ...paginationQuery,
  });
};

export const listEquipmentsSelect = handleError(listEquipmentsSelectFn);

/**
 * COUNT
 */
const countEquipmentsAboveId = async (
  id: string | undefined,
  where?: Prisma.EquipmentWhereInput,
): Promise<number | undefined> => {
  if (!id) return undefined;
  return getPrisma().equipment.count({
    where: { ...where, id: { gt: id } },
  });
};
