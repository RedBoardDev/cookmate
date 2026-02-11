import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countCollectionsQuery = (where: Prisma.CollectionWhereInput) =>
  getPrisma().collection.count({ where: { ...where } });

export type countCollectionsQueryType = Awaited<ReturnType<typeof countCollectionsQuery>>;

export const countCollections = async (where: Prisma.CollectionWhereInput): Promise<countCollectionsQueryType> => {
  return await countCollectionsQuery(where);
};
