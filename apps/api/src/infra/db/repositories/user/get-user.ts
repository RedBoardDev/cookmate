import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { UserNotFoundError } from "@cookmate/domain/user";
import type { UserSelectResult } from "./types";

/**
 * GET
 */
const getUserSelectFn = async <TSelect extends Prisma.UserSelect>(
  where: Prisma.UserWhereUniqueInput,
  select: TSelect
): Promise<UserSelectResult<TSelect>> => {
  const user = await getPrisma().user.findUnique({ where, select });
  if (!user) throw new UserNotFoundError(where.id);
  return user;
};

export const getUserSelect = handleError(getUserSelectFn);

/**
 * FIND FIRST
 */
const findFirstUserFn = async <TSelect extends Prisma.UserSelect>(
  where: Prisma.UserWhereInput,
  select: TSelect
): Promise<UserSelectResult<TSelect> | null> => {
  return getPrisma().user.findFirst({ where, select });
};

export const findFirstUser = handleError(findFirstUserFn);
