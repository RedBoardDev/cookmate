import { Entity, UniqueEntityID } from "@cookmate/core";
import { InvalidRecipeIngredientDataError, RecipeIngredientNotBelongsToRecipeError } from "./errors";
import type { RecipeIngredientProps, RecipeIngredientSnapshot } from "./recipe-ingredient.schema";
import { recipeIngredientPropsSchema } from "./recipe-ingredient.schema";

export class RecipeIngredientEntity extends Entity<RecipeIngredientProps> {
  private constructor(props: RecipeIngredientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: RecipeIngredientProps, id?: string): RecipeIngredientEntity {
    const result = recipeIngredientPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidRecipeIngredientDataError();
    }

    return new RecipeIngredientEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get quantity(): number | null {
    return this.props.quantity;
  }

  get preparation(): string | null {
    return this.props.preparation;
  }

  get optional(): boolean {
    return this.props.optional;
  }

  get order(): number {
    return this.props.order;
  }

  get ingredientId(): string {
    return this.props.ingredientId;
  }

  get unitId(): string | null {
    return this.props.unitId;
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

  // Policies
  belongsToRecipe(recipeId: string): boolean {
    return this.recipeId === recipeId;
  }

  assertBelongsToRecipe(recipeId: string): void {
    if (!this.belongsToRecipe(recipeId)) {
      throw new RecipeIngredientNotBelongsToRecipeError();
    }
  }

  toSnapshot(): RecipeIngredientSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
