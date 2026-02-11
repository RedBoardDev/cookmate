import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countCollectionMembersQuery = (where: Prisma.CollectionMemberWhereInput) =>
  getPrisma().collectionMember.count({ where: { ...where } });

export type countCollectionMembersQueryType = Awaited<ReturnType<typeof countCollectionMembersQuery>>;

export const countCollectionMembers = async (
  where: Prisma.CollectionMemberWhereInput,
): Promise<countCollectionMembersQueryType> => {
  return await countCollectionMembersQuery(where);
};
