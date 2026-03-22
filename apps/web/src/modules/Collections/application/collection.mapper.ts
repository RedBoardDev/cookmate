import { CollectionEntity } from "@/modules/Collections/domain/entity/collection.entity";
import { EmojiVO } from "@/shared/domain/value-objects/emoji.vo";
import type { CollectionApiData } from "./collection.schema";

export const CollectionMapper = {
  toDomain(data: CollectionApiData): CollectionEntity {
    return CollectionEntity.create({
      id: data.id,
      name: data.name,
      emoji: EmojiVO.from(data.emoji),
      description: data.description,
      recipeCount: data.recipeCount,
    });
  },
};
