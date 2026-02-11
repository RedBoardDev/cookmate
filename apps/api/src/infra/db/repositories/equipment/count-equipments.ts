import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countEquipmentsQuery = (where: Prisma.EquipmentWhereInput) =>
  getPrisma().equipment.count({ where: { ...where } });

export type countEquipmentsQueryType = Awaited<ReturnType<typeof countEquipmentsQuery>>;

export const countEquipments = async (where: Prisma.EquipmentWhereInput): Promise<countEquipmentsQueryType> => {
  return await countEquipmentsQuery(where);
};
