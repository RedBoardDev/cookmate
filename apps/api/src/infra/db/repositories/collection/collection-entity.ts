import type { Prisma } from "@/generated/prisma/client";
import { CollectionEntity } from "@cookmate/domain/collection";
import type { CollectionSelectResult } from "./types";

export const collectionEntitySelect = {
  id: true,
  name: true,
  emoji: true,
  description: true,
  visibility: true,
  shortUrl: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CollectionSelect;

type CollectionEntityRecord = CollectionSelectResult<typeof collectionEntitySelect>;

export const toCollectionEntity = (data: CollectionEntityRecord): CollectionEntity =>
  CollectionEntity.create(
    {
      name: data.name,
      emoji: data.emoji,
      description: data.description,
      visibility: data.visibility,
      shortUrl: data.shortUrl,
      ownerId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    },
    data.id
  );
