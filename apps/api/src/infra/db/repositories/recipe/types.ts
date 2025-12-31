import type { Prisma } from "@/generated/prisma/client";

export type RecipeSelectResult<TSelect extends Prisma.RecipeSelect> = Prisma.RecipeGetPayload<{
  select: TSelect;
}>;

export type RecipeIncludeResult<TSelect extends Prisma.RecipeInclude> = Prisma.RecipeGetPayload<{
  include: TSelect;
}>;

export type ListRecipesSelectQueryType = RecipeSelectResult<Prisma.RecipeSelect>[];

export type GetRecipeSelectQueryType = RecipeSelectResult<Prisma.RecipeSelect>;
