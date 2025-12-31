import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";

/**
 * COUNT
 */
const countUsersQuery = (where: Prisma.UserWhereInput) => getPrisma().user.count({ where: { ...where } });

export type countUsersQueryType = Awaited<ReturnType<typeof countUsersQuery>>;

export const countUsers = async (where: Prisma.UserWhereInput): Promise<countUsersQueryType> => {
  return await countUsersQuery(where);
};
