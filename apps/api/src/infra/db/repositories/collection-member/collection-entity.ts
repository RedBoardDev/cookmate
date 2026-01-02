import type { Prisma } from "@/generated/prisma/client";
import { CollectionMemberEntity } from "@cookmate/domain/collection-member";
import type { CollectionMemberSelectResult } from "./types";

export const collectionMemberEntitySelect = {
  id: true,
  collectionId: true,
  userId: true,
  joinedAt: true,
} satisfies Prisma.CollectionMemberSelect;

type CollectionMemberEntityRecord = CollectionMemberSelectResult<typeof collectionMemberEntitySelect>;

export const toCollectionMemberEntity = (data: CollectionMemberEntityRecord): CollectionMemberEntity =>
  CollectionMemberEntity.create(
    {
      collectionId: data.collectionId,
      userId: data.userId,
      joinedAt: data.joinedAt,
    },
    data.id
  );
