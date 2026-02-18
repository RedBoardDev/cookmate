import { z } from "zod";

const COLLECTION_NAME_MAX_LENGTH = 100;
const COLLECTION_DESCRIPTION_MAX_LENGTH = 500;

export const collectionVisibilitySchema = z.enum(["PRIVATE", "PUBLIC"]);
export type CollectionVisibility = z.infer<typeof collectionVisibilitySchema>;

export const collectionField = {
  name: z.string().min(1).max(COLLECTION_NAME_MAX_LENGTH),
  emoji: z.emoji(),
  description: z.string().min(1).max(COLLECTION_DESCRIPTION_MAX_LENGTH).nullable(),
};

export const collectionSystemField = {
  ownerId: z.string().min(1),
  visibility: collectionVisibilitySchema,
  shortUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
};

export const collectionFields = {
  name: { name: collectionField.name },
  emoji: { emoji: collectionField.emoji },
  description: { description: collectionField.description },
  ownerId: { ownerId: collectionSystemField.ownerId },
  visibility: { visibility: collectionSystemField.visibility },
  shortUrl: { shortUrl: collectionSystemField.shortUrl },
  createdAt: { createdAt: collectionSystemField.createdAt },
  updatedAt: { updatedAt: collectionSystemField.updatedAt },
};

export const collectionPropsSchema = z.object({
  ...collectionField,
  ...collectionSystemField,
});

export type CollectionProps = z.infer<typeof collectionPropsSchema>;

export const collectionSchema = collectionPropsSchema.extend({
  id: z.uuid(),
});

export type Collection = z.infer<typeof collectionSchema>;
