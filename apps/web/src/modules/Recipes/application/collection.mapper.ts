import type { GetCollections200 } from "@/generated/types";
import { CollectionEntity } from "@cookmate/domain/collection";

type CollectionApiModel = GetCollections200["data"][number];

export const CollectionMapper = {
  toDomain(data: CollectionApiModel): CollectionEntity {
    return CollectionEntity.create(
      {
        name: data.name,
        emoji: data.emoji,
        description: data.description ?? null,
        ownerId: data.ownerId,
        visibility: data.visibility,
        shortUrl: data.shortUrl ?? null,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt)
      },
      data.id
    );
  }
};
