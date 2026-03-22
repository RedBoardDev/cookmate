import { recipeFields } from "@cookmate/domain/recipe";
import { z } from "zod";
import { createRecipeBodySchema } from "../create-recipe/contract";

export const updateRecipeParamsSchema = z.object({
  recipeId: z.uuid(),
});

export const updateRecipeBodySchema = createRecipeBodySchema.omit({
  images: true,
});

export const updateRecipeResponseSchema = z.object({
  id: z.uuid(),
  ...recipeFields.shortUrl,
});

export type UpdateRecipeParams = z.infer<typeof updateRecipeParamsSchema>;
export type UpdateRecipeBody = z.infer<typeof updateRecipeBodySchema>;
export type UpdateRecipeCommand = UpdateRecipeParams &
  UpdateRecipeBody & {
    readonly userId: string;
  };
export type UpdateRecipeResult = z.infer<typeof updateRecipeResponseSchema>;
