import type { Prisma } from "@/generated/prisma/client";

export type RecipeImageSelectResult<TSelect extends Prisma.RecipeImageSelect> = Prisma.RecipeImageGetPayload<{
  select: TSelect;
}>;

export type RecipeImageIncludeResult<TSelect extends Prisma.RecipeImageInclude> = Prisma.RecipeImageGetPayload<{
  include: TSelect;
}>;

export type ListRecipeImagesSelectQueryType = RecipeImageSelectResult<Prisma.RecipeImageSelect>[];

export type GetRecipeImageSelectQueryType = RecipeImageSelectResult<Prisma.RecipeImageSelect>;
