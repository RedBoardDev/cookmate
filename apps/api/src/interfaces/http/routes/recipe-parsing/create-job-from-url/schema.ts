import { z } from "zod";

export const body = z.object({
  url: z.url(),
});

export const response = {
  201: z.object({
    jobId: z.uuid(),
    status: z.literal("QUEUED"),
    createdAt: z.string().datetime(),
  }),
};

export const schemas = { body, response } as const;
