import type { Prisma } from "@/generated/prisma/client";

export type CollectionMemberSelectResult<TSelect extends Prisma.CollectionMemberSelect> = Prisma.CollectionMemberGetPayload<{
  select: TSelect;
}>;

export type CollectionMemberIncludeResult<TSelect extends Prisma.CollectionMemberInclude> = Prisma.CollectionMemberGetPayload<{
  include: TSelect;
}>;

export type ListCollectionMembersSelectQueryType = CollectionMemberSelectResult<Prisma.CollectionMemberSelect>[];

export type GetCollectionMemberSelectQueryType = CollectionMemberSelectResult<Prisma.CollectionMemberSelect>;
