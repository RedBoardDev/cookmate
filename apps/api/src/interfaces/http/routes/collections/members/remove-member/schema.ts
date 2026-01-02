import { z } from "zod";

export const params = z.object({
  collectionId: z.uuid(),
  userId: z.string(),
});

export const response = {
  204: z.null(),
};

export const schemas = { params, response } as const;
