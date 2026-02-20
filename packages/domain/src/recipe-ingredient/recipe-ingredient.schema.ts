import { z } from "zod";

const RECIPE_INGREDIENT_NOTE_MAX_LENGTH = 1000;

export const recipeIngredientField = {
  name: z.string().min(1),
  quantity: z.number().nonnegative().nullable(),
  unit: z.string().min(1).nullable(),
  note: z.string().min(1).max(RECIPE_INGREDIENT_NOTE_MAX_LENGTH).nullable(),
  optional: z.boolean(),
  order: z.number().int().nonnegative(),
};

export const recipeIngredientSystemField = {
  recipeId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const recipeIngredientFields = {
  name: { name: recipeIngredientField.name },
  quantity: { quantity: recipeIngredientField.quantity },
  unit: { unit: recipeIngredientField.unit },
  note: { note: recipeIngredientField.note },
  optional: { optional: recipeIngredientField.optional },
  order: { order: recipeIngredientField.order },
  recipeId: { recipeId: recipeIngredientSystemField.recipeId },
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
