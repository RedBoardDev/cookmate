import type { GetRecipesRecipeid200 } from "@/generated/types";
import type { RecipeEditorFormValues } from "@/modules/RecipeEditor/application/recipeEditor.schema";

function toIngredients(recipe: GetRecipesRecipeid200["data"]): RecipeEditorFormValues["ingredients"] {
  if (recipe.ingredients.length === 0) {
    return [];
  }

  return recipe.ingredients
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((ingredient, index) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      note: ingredient.note,
      optional: ingredient.optional,
      order: index,
    }));
}

function toInstructions(recipe: GetRecipesRecipeid200["data"]): RecipeEditorFormValues["instructions"] {
  if (recipe.instructions.length === 0) {
    return [];
  }

  return recipe.instructions
    .slice()
    .sort((left, right) => left.order - right.order)
    .map((instruction, index) => ({
      text: instruction.text,
      durationMin: instruction.durationMin,
      order: index,
    }));
}

export const RecipeEditorMapper = {
  toFormValues(apiData?: GetRecipesRecipeid200 | null): RecipeEditorFormValues | null {
    if (!apiData?.data) {
      return null;
    }

    const recipe = apiData.data;

    return {
      name: recipe.name,
      description: recipe.description,
      servings: recipe.servings,
      yieldUnitLabel: recipe.yieldUnitLabel,
      prepTimeMin: recipe.prepTimeMin,
      cookTimeMin: recipe.cookTimeMin,
      totalTimeMin: recipe.totalTimeMin,
      difficulty: recipe.difficulty,
      budget: recipe.budget,
      categories: [...recipe.categories],
      attributes: [...recipe.attributes],
      ingredients: toIngredients(recipe),
      instructions: toInstructions(recipe),
    };
  },
};
