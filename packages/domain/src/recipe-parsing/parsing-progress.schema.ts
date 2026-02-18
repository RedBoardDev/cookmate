import { z } from "zod";

export const ParsingProgressSchema = z.object({
  step: z.string(),
  percent: z.number().int().min(0).max(100),
});

export type ParsingProgress = z.infer<typeof ParsingProgressSchema>;
