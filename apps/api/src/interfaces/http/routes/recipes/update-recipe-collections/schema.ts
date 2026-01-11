import { z } from "zod";

export const params = z.object({
  recipeId: z.uuid(),
});

export const body = z.object({
  collectionIds: z.array(z.uuid()),
});

export const response = {
  200: z.object({
    success: z.boolean(),
  }),
};

export const schemas = { params, body, response } as const;
