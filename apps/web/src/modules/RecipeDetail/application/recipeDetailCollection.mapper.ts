import type { GetCollections200 } from "@/generated/types";
import { RecipeDetailCollectionEntity } from "@/modules/RecipeDetail/domain/entity/recipeDetailCollection.entity";

type CollectionData = GetCollections200["data"][number];

export const RecipeDetailCollectionMapper = {
  toDomain(data: CollectionData): RecipeDetailCollectionEntity {
    return RecipeDetailCollectionEntity.create({
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
