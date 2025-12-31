import type { Prisma } from "@/generated/prisma/client";

export type UserSelectResult<TSelect extends Prisma.UserSelect> = Prisma.UserGetPayload<{
  select: TSelect;
}>;

export type UserIncludeResult<TSelect extends Prisma.UserInclude> = Prisma.UserGetPayload<{
  include: TSelect;
}>;

export type ListUsersSelectQueryType = UserSelectResult<Prisma.UserSelect>[];

export type GetUserSelectQueryType = UserSelectResult<Prisma.UserSelect>;
