import {
  updateRecipeBodySchema,
  updateRecipeParamsSchema,
  updateRecipeResponseSchema,
} from "../../../commands/update-recipe/contract";

export const params = updateRecipeParamsSchema;

export const body = updateRecipeBodySchema;

export const response = {
  200: updateRecipeResponseSchema,
};

export const schemas = { params, body, response } as const;
