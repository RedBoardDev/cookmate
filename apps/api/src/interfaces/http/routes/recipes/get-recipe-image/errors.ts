import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";
import { RecipePolicies } from "@cookmate/domain";
import { RecipeImageNotFoundError } from "@cookmate/domain/recipe-image";
import type { SelectResult } from "./select";

export const getRecipeImageErrors = async (
  recipeImage: SelectResult,
  userId: string,
  imageId: string
): Promise<void> => {
  if (!recipeImage.recipeId) {
    throw new RecipeImageNotFoundError(imageId);
  }

  const recipe = await getRecipeSelect({ id: recipeImage.recipeId }, { id: true, userId: true });

  RecipePolicies.assertCanView(recipe.userId, userId);
};
