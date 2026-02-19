import type { GetCollections200 } from "@/generated/types";
import { CollectionEntity } from "@/modules/Recipes/domain/entity/collection.entity";

type CollectionData = GetCollections200["data"][number];

export const CollectionMapper = {
  toDomain(data: CollectionData): CollectionEntity {
    return CollectionEntity.create({
      collection: {
        id: data.id,
        name: data.name,
        emoji: data.emoji,
        description: data.description,
        ownerId: data.ownerId,
        visibility: data.visibility,
        shortUrl: data.shortUrl,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      },
      recipeCount: data.recipeCount,
    });
  },
};
