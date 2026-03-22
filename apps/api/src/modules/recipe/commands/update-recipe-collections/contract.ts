import { z } from "zod";

export const updateRecipeCollectionsParamsSchema = z.object({
  recipeId: z.uuid(),
});

export const updateRecipeCollectionsBodySchema = z.object({
  collectionIds: z.array(z.uuid()),
});

export const updateRecipeCollectionsResponseSchema = z.object({
  success: z.boolean(),
});

export const updateRecipeCollectionsSchemas = {
  params: updateRecipeCollectionsParamsSchema,
  body: updateRecipeCollectionsBodySchema,
  response: {
    200: updateRecipeCollectionsResponseSchema,
  },
} as const;

export type UpdateRecipeCollectionsParams = z.infer<typeof updateRecipeCollectionsParamsSchema>;
export type UpdateRecipeCollectionsBody = z.infer<typeof updateRecipeCollectionsBodySchema>;
export type UpdateRecipeCollectionsCommand = UpdateRecipeCollectionsParams &
  UpdateRecipeCollectionsBody & {
    readonly userId: string;
  };

export type UpdateRecipeCollectionsResult = z.infer<typeof updateRecipeCollectionsResponseSchema>;
