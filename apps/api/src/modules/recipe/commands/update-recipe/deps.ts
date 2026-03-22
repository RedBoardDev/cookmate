import { RecipePolicies } from "@cookmate/domain/recipe";
import type { Prisma } from "@/generated/prisma/client";
import { recipeReader } from "../../infra/prisma/recipe-reader";
import { recipeWriter } from "../../infra/prisma/recipe-writer";
import type { UpdateRecipeCommand, UpdateRecipeResult } from "./contract";

const selectRecipe = {
  userId: true,
  shortUrl: true,
  source: true,
  sourceUrl: true,
} satisfies Prisma.RecipeSelect;

export type EditableRecipe = Prisma.RecipeGetPayload<{ select: typeof selectRecipe }>;

export type UpdateRecipeWriteInput = UpdateRecipeCommand & {
  readonly existingRecipe: EditableRecipe;
};

export type UpdateRecipeDeps = {
  loadEditableRecipe: (recipeId: string, userId: string) => Promise<EditableRecipe>;
  updateRecipe: (input: UpdateRecipeWriteInput) => Promise<UpdateRecipeResult>;
};

export const defaultUpdateRecipeDeps: UpdateRecipeDeps = {
  loadEditableRecipe: async (recipeId, userId) => {
    const recipe = await recipeReader.getById({ id: recipeId }, selectRecipe);

    RecipePolicies.assertCanEdit(recipe.userId, userId);

    return recipe;
  },
  updateRecipe: async (input) => recipeWriter.update(input),
};
