import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countUnitsQuery = (where: Prisma.UnitWhereInput) => getPrisma().unit.count({ where: { ...where } });

export type countUnitsQueryType = Awaited<ReturnType<typeof countUnitsQuery>>;

export const countUnits = async (where: Prisma.UnitWhereInput): Promise<countUnitsQueryType> => {
  return await countUnitsQuery(where);
};
