import { z } from "zod";

export const params = z.object({
  collectionId: z.uuid(),
});

export const body = z.object({
  email: z.email(),
});

export const response = {
  201: z.object({
    id: z.uuid(),
  }),
};

export const schemas = { params, body, response } as const;
