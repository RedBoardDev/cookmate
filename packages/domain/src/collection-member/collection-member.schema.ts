import { z } from "zod";

export const collectionMemberPropsSchema = z.object({
  id: z.uuid(),
  collectionId: z.uuid(),
  userId: z.uuid(),
  joinedAt: z.date(),
});

export type CollectionMemberProps = z.infer<typeof collectionMemberPropsSchema>;

export const collectionMemberCreateSchema = collectionMemberPropsSchema.pick({
  collectionId: true,
  userId: true,
});

export type CollectionMemberCreateInput = z.infer<typeof collectionMemberCreateSchema>;
