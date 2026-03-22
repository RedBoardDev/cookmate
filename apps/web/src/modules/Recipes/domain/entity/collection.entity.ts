import { CollectionPolicies, type CollectionProps } from "@cookmate/domain/collection";
import { Entity, UniqueEntityID } from "@cookmate/domain-driven-design";
import type { EmojiVO } from "@/shared/domain/value-objects/emoji.vo";

interface CollectionEntityProps {
  id: string;
  name: CollectionProps["name"];
  emoji: EmojiVO;
  description: CollectionProps["description"];
  ownerId: CollectionProps["ownerId"];
  updatedAt: CollectionProps["updatedAt"];
  createdAt: CollectionProps["createdAt"];
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

  get ownerId(): string {
    return this.props.ownerId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get recipeCount(): number {
    return this.props.recipeCount;
  }

  get isEmpty(): boolean {
    return this.props.recipeCount === 0;
  }

  isOwned(userId: string): boolean {
    return CollectionPolicies.isOwner(this.props.ownerId, userId);
  }

  matches(searchTerm: string): boolean {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      return true;
    }

    const nameMatch = this.props.name.toLowerCase().includes(term);

    if (nameMatch) {
      return true;
    }

    const description = this.props.description;

    if (description) {
      return description.toLowerCase().includes(term);
    }

    return false;
  }
}
