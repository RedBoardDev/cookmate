import { handleError } from "@/shared/utils/handle-error";
import type { UpdateRecipeCommand, UpdateRecipeResult } from "./contract";
import { defaultUpdateRecipeDeps, type UpdateRecipeDeps } from "./deps";

const deps: UpdateRecipeDeps = defaultUpdateRecipeDeps;

export const executeUpdateRecipe = handleError(async (input: UpdateRecipeCommand): Promise<UpdateRecipeResult> => {
  const existingRecipe = await deps.loadEditableRecipe(input.recipeId, input.userId);

  return deps.updateRecipe({
    ...input,
    existingRecipe,
  });
});
