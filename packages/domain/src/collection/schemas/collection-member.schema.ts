import { z } from "zod";

export const collectionMemberSystemField = {
  collectionId: z.uuid(),
  userId: z.string().min(1),
  email: z.email(),
  avatar: z.string().min(1),
  joinedAt: z.date(),
};

export const collectionMemberFields = {
  collectionId: { collectionId: collectionMemberSystemField.collectionId },
  userId: { userId: collectionMemberSystemField.userId },
  email: { email: collectionMemberSystemField.email },
  avatar: { avatar: collectionMemberSystemField.avatar },
  joinedAt: { joinedAt: collectionMemberSystemField.joinedAt },
};

export const collectionMemberPropsSchema = z.object({
  ...collectionMemberSystemField,
});

export type CollectionMemberProps = z.infer<typeof collectionMemberPropsSchema>;

export const collectionMemberSnapshotSchema = z.object({
  id: z.uuid(),
  userId: collectionMemberSystemField.userId,
  email: collectionMemberSystemField.email,
  avatar: collectionMemberSystemField.avatar,
  joinedAt: collectionMemberSystemField.joinedAt,
});

export type CollectionMemberSnapshot = z.infer<typeof collectionMemberSnapshotSchema>;
