import { z } from "zod";

export const params = z.object({
  shortUrl: z.string(),
});

export const response = {
  200: z.object({
    id: z.uuid(),
  }),
};

export const schemas = { params, response } as const;
