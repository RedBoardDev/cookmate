import { z } from "zod";

const RECIPE_IMAGE_NAME_MAX_LENGTH = 100;

export const recipeImageField = {
  s3Url: z.string().min(1),
  name: z.string().min(1).max(RECIPE_IMAGE_NAME_MAX_LENGTH),
  mimeType: z.string().min(1),
  size: z.number().int().nonnegative(),
  order: z.number().int().nonnegative(),
};

export const recipeImageSystemField = {
  recipeId: z.uuid().nullable(),
  discoverRecipeId: z.uuid().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const recipeImageFields = {
  s3Url: { s3Url: recipeImageField.s3Url },
  name: { name: recipeImageField.name },
  mimeType: { mimeType: recipeImageField.mimeType },
  size: { size: recipeImageField.size },
  order: { order: recipeImageField.order },
  recipeId: { recipeId: recipeImageSystemField.recipeId },
  discoverRecipeId: { discoverRecipeId: recipeImageSystemField.discoverRecipeId },
  createdAt: { createdAt: recipeImageSystemField.createdAt },
  updatedAt: { updatedAt: recipeImageSystemField.updatedAt },
};

export const recipeImagePropsSchema = z.object({
  ...recipeImageField,
  ...recipeImageSystemField,
});

export type RecipeImageProps = z.infer<typeof recipeImagePropsSchema>;

export const recipeImageSchema = recipeImagePropsSchema.extend({
  id: z.uuid(),
});

export type RecipeImage = z.infer<typeof recipeImageSchema>;
