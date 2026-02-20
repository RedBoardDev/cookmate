import { DomainError } from "../../errors";

export const RECIPE_ATTRIBUTES = ["QUICK", "EASY", "HEALTHY", "VEGETARIAN"] as const;

export type RecipeAttributeValue = (typeof RECIPE_ATTRIBUTES)[number];

export class InvalidRecipeAttributeError extends DomainError {
  readonly code = "INVALID_RECIPE_ATTRIBUTE";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid recipe attribute value: ${value}`);
  }
}
