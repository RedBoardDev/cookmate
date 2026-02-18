import { RecipePolicies } from "@cookmate/domain/recipe";
import type { SelectResult } from "./select";

export const getRecipeErrors = (recipe: SelectResult, userId: string): void => {
  RecipePolicies.assertCanView(recipe.userId, userId);
};
