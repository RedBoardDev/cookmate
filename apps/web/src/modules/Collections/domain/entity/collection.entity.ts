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

  get visibility(): Collection["visibility"] {
    return this.props.collection.visibility;
  }

  get isPublic(): boolean {
    return this.props.collection.visibility === "PUBLIC";
  }

  get recipeCount(): number {
    return this.props.recipeCount;
  }

  isOwned(userId: string): boolean {
    return CollectionPolicies.isOwner(this.props.collection.ownerId, userId);
  }
}
