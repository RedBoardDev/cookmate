import { Entity, UniqueEntityID } from "@cookmate/core";
import { type Collection, CollectionPolicies } from "@cookmate/domain/collection";

interface RecipeDetailCollectionEntityProps {
  collection: Collection;
  recipeCount: number;
}

export class RecipeDetailCollectionEntity extends Entity<RecipeDetailCollectionEntityProps> {
  private constructor(props: RecipeDetailCollectionEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeDetailCollectionEntityProps): RecipeDetailCollectionEntity {
    return new RecipeDetailCollectionEntity(props, new UniqueEntityID(props.collection.id));
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

  get recipeCount(): number {
    return this.props.recipeCount;
  }

  isOwned(userId: string): boolean {
    return CollectionPolicies.isOwner(this.props.collection.ownerId, userId);
  }
}
