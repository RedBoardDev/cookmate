import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";
import { RecipePolicies } from "@cookmate/domain";

export const listRecipeImagesErrors = async (
  recipeId: string,
  userId: string
): Promise<void> => {
  const recipe = await getRecipeSelect({ id: recipeId }, { id: true, userId: true });

  RecipePolicies.assertCanView(recipe.userId, userId);
};
