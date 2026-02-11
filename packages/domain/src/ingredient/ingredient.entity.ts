import { Entity, UniqueEntityID } from "@cookmate/core";
import { InvalidIngredientDataError } from "./errors";
import type { IngredientProps, IngredientSnapshot } from "./ingredient.schema";
import { ingredientPropsSchema } from "./ingredient.schema";

export class IngredientEntity extends Entity<IngredientProps> {
  private constructor(props: IngredientProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: IngredientProps, id?: string): IngredientEntity {
    const result = ingredientPropsSchema.safeParse(props);
    if (!result.success) {
      throw new InvalidIngredientDataError();
    }

    return new IngredientEntity(result.data, new UniqueEntityID(id));
  }

  get id(): string {
    return this._id.toString();
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toSnapshot(): IngredientSnapshot {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
