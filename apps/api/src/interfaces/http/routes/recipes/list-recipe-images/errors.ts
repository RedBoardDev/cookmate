import { RecipePolicies } from "@cookmate/domain/recipe";
import { getRecipeSelect } from "@/infra/db/repositories/recipe/get-recipe";

export const listRecipeImagesErrors = async (recipeId: string, userId: string): Promise<void> => {
  const recipe = await getRecipeSelect({ id: recipeId }, { id: true, userId: true });

  RecipePolicies.assertCanView(recipe.userId, userId);
};
