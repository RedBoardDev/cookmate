import type { GetCollections200 } from "@/generated/types";
import { CollectionEntity } from "@/modules/Recipes/domain/entity/collection.entity";
import { EmojiVO } from "@/shared/domain/value-objects/emoji.vo";

type CollectionData = GetCollections200["data"][number];

export const CollectionMapper = {
  toDomain(data: CollectionData): CollectionEntity {
    return CollectionEntity.create({
      id: data.id,
      name: data.name,
      emoji: EmojiVO.from(data.emoji),
      description: data.description,
      ownerId: data.ownerId,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      recipeCount: data.recipeCount,
    });
  },
};
