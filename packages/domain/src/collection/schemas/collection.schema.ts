import { z } from "zod";

const COLLECTION_NAME_MAX_LENGTH = 100;
const COLLECTION_DESCRIPTION_MAX_LENGTH = 500;
const COLLECTION_EMOJI_MAX_LENGTH = 32;

const emojiRegex = /^(?:\p{Extended_Pictographic}|\p{Emoji_Component}|\u200D|\uFE0F)+$/u;

export const collectionVisibilitySchema = z.enum(["PRIVATE", "PUBLIC"]);
export type CollectionVisibility = z.infer<typeof collectionVisibilitySchema>;

export const collectionField = {
  name: z.string().min(1).max(COLLECTION_NAME_MAX_LENGTH),
  emoji: z
    .string()
    .min(1)
    .max(COLLECTION_EMOJI_MAX_LENGTH)
    .refine((value) => emojiRegex.test(value)),
  description: z
    .string()
    .min(1)
    .max(COLLECTION_DESCRIPTION_MAX_LENGTH)
    .nullable(),
};

export const collectionSystemField = {
  ownerId: z.uuid(),
  visibility: collectionVisibilitySchema,
  shortUrl: z
    .string()
    .nullable(),
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

export const collectionSnapshotSchema = collectionPropsSchema.extend({
  id: z.uuid(),
});

export type CollectionSnapshot = z.infer<typeof collectionSnapshotSchema>;
