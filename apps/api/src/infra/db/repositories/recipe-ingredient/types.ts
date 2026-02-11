import type { Prisma } from "@/generated/prisma/client";

export type RecipeIngredientSelectResult<TSelect extends Prisma.RecipeIngredientSelect> =
  Prisma.RecipeIngredientGetPayload<{
    select: TSelect;
  }>;

export type RecipeIngredientIncludeResult<TSelect extends Prisma.RecipeIngredientInclude> =
  Prisma.RecipeIngredientGetPayload<{
    include: TSelect;
  }>;

export type ListRecipeIngredientsSelectQueryType = RecipeIngredientSelectResult<Prisma.RecipeIngredientSelect>[];

export type GetRecipeIngredientSelectQueryType = RecipeIngredientSelectResult<Prisma.RecipeIngredientSelect>;
