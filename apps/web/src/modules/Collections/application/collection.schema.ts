import { collectionValueSchemas } from "@cookmate/domain/collection";
import { z } from "zod";

export const createCollectionSchema = z.object({
  id: collectionValueSchemas.id,
  name: collectionValueSchemas.name,
  emoji: collectionValueSchemas.emoji,
  description: collectionValueSchemas.description,
  recipeCount: z.number(),
});

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>;
