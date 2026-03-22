import { createRecipeBodySchema, createRecipeResponseSchema } from "../../../commands/create-recipe/contract";

export const body = createRecipeBodySchema;

export const response = {
  201: createRecipeResponseSchema,
};

export const schemas = { body, response } as const;
