import { z } from "zod";

const INGREDIENT_NAME_MAX_LENGTH = 100;

export const ingredientField = {
  name: z.string().min(1).max(INGREDIENT_NAME_MAX_LENGTH),
};

export const ingredientSystemField = {
  createdAt: z.date(),
};

export const ingredientFields = {
  name: { name: ingredientField.name },
  createdAt: { createdAt: ingredientSystemField.createdAt },
};

export const ingredientPropsSchema = z.object({
  ...ingredientField,
  ...ingredientSystemField,
});

export type IngredientProps = z.infer<typeof ingredientPropsSchema>;

export const ingredientSnapshotSchema = ingredientPropsSchema.extend({
  id: z.uuid(),
});

export type IngredientSnapshot = z.infer<typeof ingredientSnapshotSchema>;
