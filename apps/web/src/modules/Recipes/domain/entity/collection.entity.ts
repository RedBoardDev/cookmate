import { Entity, UniqueEntityID } from "@cookmate/core";
import { type Collection, CollectionPolicies } from "@cookmate/domain/collection";

interface CollectionEntityProps {
  collection: Collection;
  recipeCount: number;
}

export class CollectionEntity extends Entity<CollectionEntityProps> {
  private constructor(props: CollectionEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: CollectionEntityProps): CollectionEntity {
    return new CollectionEntity(props, new UniqueEntityID(props.collection.id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.collection.name;
  }

  get emoji(): string {
    return this.props.collection.emoji;
  }

  get description(): string | null {
    return this.props.collection.description;
  }

  get ownerId(): string {
    return this.props.collection.ownerId;
  }

  get createdAt(): Date {
    return this.props.collection.createdAt;
  }

  get updatedAt(): Date {
    return this.props.collection.updatedAt;
  }

  get recipeCount(): number {
    return this.props.recipeCount;
  }

  get isEmpty(): boolean {
    return this.props.recipeCount === 0;
  }

  isOwned(userId: string): boolean {
    return CollectionPolicies.isOwner(this.props.collection.ownerId, userId);
  }

  matches(searchTerm: string): boolean {
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
      return true;
    }

    const nameMatch = this.props.collection.name.toLowerCase().includes(term);

    if (nameMatch) {
      return true;
    }

    const description = this.props.collection.description;

    if (description) {
      return description.toLowerCase().includes(term);
    }

    return false;
  }
}
