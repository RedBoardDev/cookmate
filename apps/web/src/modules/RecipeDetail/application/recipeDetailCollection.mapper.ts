import type { GetCollections200 } from "@/generated/types";
import { RecipeDetailCollectionEntity } from "@/modules/RecipeDetail/domain/entity/recipeDetailCollection.entity";

type CollectionData = GetCollections200["data"][number];

export const RecipeDetailCollectionMapper = {
  toDomain(data: CollectionData): RecipeDetailCollectionEntity {
    return RecipeDetailCollectionEntity.create({
      id: data.id,
      name: data.name,
      emoji: data.emoji,
      description: data.description,
      ownerId: data.ownerId,
      recipeCount: data.recipeCount,
    });
  },
};
