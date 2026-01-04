import { z } from "zod";

export const collectionMemberSystemField = {
  collectionId: z.uuid(),
  userId: z.uuid(),
  joinedAt: z.date(),
};

export const collectionMemberFields = {
  collectionId: { collectionId: collectionMemberSystemField.collectionId },
  userId: { userId: collectionMemberSystemField.userId },
  joinedAt: { joinedAt: collectionMemberSystemField.joinedAt },
};

export const collectionMemberPropsSchema = z.object({
  ...collectionMemberSystemField,
});

export type CollectionMemberProps = z.infer<typeof collectionMemberPropsSchema>;

export const collectionMemberSnapshotSchema = collectionMemberPropsSchema.extend({
  id: z.uuid(),
});

export type CollectionMemberSnapshot = z.infer<typeof collectionMemberSnapshotSchema>;
