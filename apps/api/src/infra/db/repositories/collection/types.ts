import type { Prisma } from "@/generated/prisma/client";

export type CollectionSelectResult<TSelect extends Prisma.CollectionSelect> = Prisma.CollectionGetPayload<{
  select: TSelect;
}>;

export type CollectionIncludeResult<TSelect extends Prisma.CollectionInclude> = Prisma.CollectionGetPayload<{
  include: TSelect;
}>;

export type ListCollectionsSelectQueryType = CollectionSelectResult<Prisma.CollectionSelect>[];

export type GetCollectionSelectQueryType = CollectionSelectResult<Prisma.CollectionSelect>;
