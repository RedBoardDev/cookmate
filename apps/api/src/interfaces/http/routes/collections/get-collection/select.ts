import type { Prisma } from "@/generated/prisma/client";
import {
  collectionSnapshotSchema,
  collectionMemberSnapshotSchema,
} from "@cookmate/domain";
import { z } from "zod";

const select = {
  id: true,
  name: true,
  emoji: true,
  description: true,
  visibility: true,
  shortUrl: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  members: {
    select: {
      id: true,
      userId: true,
      joinedAt: true,
    },
  },
} satisfies Prisma.CollectionSelect;

export type SelectResult = Prisma.CollectionGetPayload<{ select: typeof select }>;


export const responseSchema = collectionSnapshotSchema.extend({
  members: z
    .array(collectionMemberSnapshotSchema.omit({ collectionId: true }))
    .nullable(),
});

export type ResponseDto = z.infer<typeof responseSchema>;

type TransformOptions = {
  isOwner: boolean;
};

const transform = (data: SelectResult, options: TransformOptions): ResponseDto => {
  const { userId, members, ...rest } = data;
  return {
    ...rest,
    ownerId: userId,
    members: options.isOwner ? members : null,
  };
};

export const selectConfig = {
  select,
  schema: responseSchema,
  transform,
};
