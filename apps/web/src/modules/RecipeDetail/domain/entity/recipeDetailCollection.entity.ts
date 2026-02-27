import { Entity, UniqueEntityID } from "@cookmate/core";

interface RecipeDetailCollectionEntityProps {
  id: string;
  name: string;
  emoji: string;
  description: string | null;
  ownerId: string;
  recipeCount: number;
}

export class RecipeDetailCollectionEntity extends Entity<RecipeDetailCollectionEntityProps> {
  private constructor(props: RecipeDetailCollectionEntityProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeDetailCollectionEntityProps): RecipeDetailCollectionEntity {
    return new RecipeDetailCollectionEntity(props, new UniqueEntityID(props.id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get emoji(): string {
    return this.props.emoji;
  }

  get description(): string | null {
    return this.props.description;
  }

  get ownerId(): string {
    return this.props.ownerId;
  }

  get recipeCount(): number {
    return this.props.recipeCount;
  }

  isOwned(userId: string): boolean {
    return this.props.ownerId === userId;
  }
}
