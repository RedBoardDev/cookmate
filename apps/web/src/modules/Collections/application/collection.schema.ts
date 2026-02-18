import { collectionField } from "@cookmate/domain/collection";
import { z } from "zod";

export const createCollectionSchema = z.object({
  name: collectionField.name,
  emoji: collectionField.emoji,
  description: collectionField.description,
});

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>;
