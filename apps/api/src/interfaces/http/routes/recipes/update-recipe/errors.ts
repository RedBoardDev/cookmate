import { RecipePolicies } from "@cookmate/domain/recipe";
import type { Prisma } from "@/generated/prisma/client";
import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";

const selectRecipe = {
  userId: true,
  shortUrl: true,
  source: true,
  sourceUrl: true,
} satisfies Prisma.RecipeSelect;

export type EditableRecipe = Prisma.RecipeGetPayload<{ select: typeof selectRecipe }>;

export const updateRecipeErrors = async (recipeId: string, userId: string): Promise<EditableRecipe> => {
  const recipe = await getRecipeSelect({ id: recipeId }, selectRecipe);

  RecipePolicies.assertCanEdit(recipe.userId, userId);

  return recipe;
};
