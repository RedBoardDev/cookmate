import { collectionValueSchemas } from "@cookmate/domain/collection";
import { z } from "zod";

export const createCollectionBodySchema = z.object({
  name: collectionValueSchemas.name,
  emoji: collectionValueSchemas.emoji,
  description: collectionValueSchemas.description,
});

export const createCollectionResponseSchema = z.object({
  id: z.uuid(),
});

export const createCollectionSchemas = {
  body: createCollectionBodySchema,
  response: {
    201: createCollectionResponseSchema,
  },
} as const;

export type CreateCollectionBody = z.infer<typeof createCollectionBodySchema>;
export type CreateCollectionCommand = CreateCollectionBody & {
  readonly ownerId: string;
};
export type CreateCollectionResult = z.infer<typeof createCollectionResponseSchema>;
