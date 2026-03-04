import { recipeFields } from "@cookmate/domain/recipe";
import { z } from "zod";
import { body as createRecipeBody } from "../create-recipe/schema";

export const params = z.object({
  recipeId: z.uuid(),
});

export const body = createRecipeBody.omit({
  images: true,
});

export const response = {
  200: z.object({
    id: z.uuid(),
    ...recipeFields.shortUrl,
  }),
};

export const schemas = { params, body, response } as const;
