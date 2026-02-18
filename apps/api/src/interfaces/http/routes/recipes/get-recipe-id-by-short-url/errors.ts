import { RecipePolicies } from "@cookmate/domain/recipe";
import type { RecipeByShortUrlSelectResult } from "./handler";

export const getRecipeIdByShortUrlErrors = (recipe: RecipeByShortUrlSelectResult, userId: string): void => {
  RecipePolicies.assertCanView(recipe.userId, userId);
};
