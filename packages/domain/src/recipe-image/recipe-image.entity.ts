import { Entity, UniqueEntityID } from "@cookmate/core";
import { InvalidRecipeImageDataError } from "./errors";
import type { RecipeImageProps, RecipeImageSnapshot } from "./recipe-image.schema";
import { recipeImagePropsSchema } from "./recipe-image.schema";

export class RecipeImageEntity extends Entity<RecipeImageProps> {
  private constructor(props: RecipeImageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeImageProps, id?: string): RecipeImageEntity {
    const result = recipeImagePropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidRecipeImageDataError();
    }

    return new RecipeImageEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get s3Url(): string {
    return this.props.s3Url;
  }

  get name(): string {
    return this.props.name;
  }

  get mimeType(): string {
    return this.props.mimeType;
  }

  get size(): number {
    return this.props.size;
  }

  get order(): number {
    return this.props.order;
  }

  get recipeId(): string | null {
    return this.props.recipeId;
  }

  get discoverRecipeId(): string | null {
    return this.props.discoverRecipeId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  toSnapshot(): RecipeImageSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
