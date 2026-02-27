import { Entity, UniqueEntityID } from "@cookmate/core";
import type { CollectionProps } from "@cookmate/domain/collection";
import type { EmojiVO } from "@/shared/domain/value-objects/emoji.vo";

interface CollectionEntityProps {
  id: string;
  name: CollectionProps["name"];
  emoji: EmojiVO;
  description: CollectionProps["description"];
  recipeCount: number;
}

export class CollectionEntity extends Entity<CollectionEntityProps> {
  private constructor(props: CollectionEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: CollectionEntityProps): CollectionEntity {
    return new CollectionEntity(props, new UniqueEntityID(props.id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get emoji(): EmojiVO {
    return this.props.emoji;
  }

  get description(): string | null {
    return this.props.description;
  }

  get recipeCount(): number {
    return this.props.recipeCount;
  }
}
