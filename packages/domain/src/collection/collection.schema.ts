import { z } from "zod";

export const COLLECTION_NAME_MAX_LENGTH = 100;
export const COLLECTION_DESCRIPTION_MAX_LENGTH = 500;

export const collectionSchema = z.object({
  // User-editable fields
  name: z.string().min(1).max(COLLECTION_NAME_MAX_LENGTH),
  emoji: z.emoji(),
  description: z.string().min(1).max(COLLECTION_DESCRIPTION_MAX_LENGTH).nullable(),

  // System-managed fields
  id: z.uuidv7(),
  ownerId: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const collectionValueSchemas = collectionSchema.shape;
export type CollectionProps = z.infer<typeof collectionSchema>;

export const collectionInsertSchema = collectionSchema.pick({
  name: true,
  emoji: true,
  description: true,
  ownerId: true,
});

export type CollectionInsert = z.infer<typeof collectionInsertSchema>;

export const collectionSystemFieldSchema = collectionSchema.pick({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CollectionSystemField = z.infer<typeof collectionSystemFieldSchema>;
