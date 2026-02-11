import type { Prisma } from "@/generated/prisma/client";

export type DiscoverRecipeSelectResult<TSelect extends Prisma.DiscoverRecipeSelect> = Prisma.DiscoverRecipeGetPayload<{
  select: TSelect;
}>;

export type DiscoverRecipeIncludeResult<TSelect extends Prisma.DiscoverRecipeInclude> =
  Prisma.DiscoverRecipeGetPayload<{
    include: TSelect;
  }>;

export type ListCommentsSelectQueryType = DiscoverRecipeSelectResult<Prisma.DiscoverRecipeSelect>[];

export type GetCommentSelectQueryType = DiscoverRecipeSelectResult<Prisma.DiscoverRecipeSelect>;
