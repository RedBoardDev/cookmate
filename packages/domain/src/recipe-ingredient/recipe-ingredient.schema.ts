import { z } from "zod";

const RECIPE_INGREDIENT_PREPARATION_MAX_LENGTH = 1000;

export const recipeIngredientField = {
  quantity: z.number().nonnegative().nullable(),
  preparation: z.string().min(1).max(RECIPE_INGREDIENT_PREPARATION_MAX_LENGTH).nullable(),
  optional: z.boolean(),
  order: z.number().int().nonnegative(),
};

export const recipeIngredientSystemField = {
  ingredientId: z.uuid(),
  unitId: z.uuid().nullable(),
  recipeId: z.uuid().nullable(),
  discoverRecipeId: z.uuid().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const recipeIngredientFields = {
  quantity: { quantity: recipeIngredientField.quantity },
  preparation: { preparation: recipeIngredientField.preparation },
  optional: { optional: recipeIngredientField.optional },
  order: { order: recipeIngredientField.order },
  ingredientId: { ingredientId: recipeIngredientSystemField.ingredientId },
  unitId: { unitId: recipeIngredientSystemField.unitId },
  recipeId: { recipeId: recipeIngredientSystemField.recipeId },
  discoverRecipeId: { discoverRecipeId: recipeIngredientSystemField.discoverRecipeId },
  createdAt: { createdAt: recipeIngredientSystemField.createdAt },
  updatedAt: { updatedAt: recipeIngredientSystemField.updatedAt },
};

export const recipeIngredientPropsSchema = z.object({
  ...recipeIngredientField,
  ...recipeIngredientSystemField,
});

export type RecipeIngredientProps = z.infer<typeof recipeIngredientPropsSchema>;

export const recipeIngredientSchema = recipeIngredientPropsSchema.extend({
  id: z.uuid(),
});

export type RecipeIngredient = z.infer<typeof recipeIngredientSchema>;
