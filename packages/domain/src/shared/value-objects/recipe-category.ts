import { DomainError } from "../../errors";

export const RECIPE_CATEGORIES = [
  "MAIN_COURSE",
  "APPETIZER",
  "SIDE_DISH",
  "DESSERT",
  "DRINK",
  "BREAKFAST",
  "SNACK",
  "SOUP",
  "SALAD",
  "SAUCE",
] as const;

export type RecipeCategoryValue = (typeof RECIPE_CATEGORIES)[number];

export class InvalidRecipeCategoryError extends DomainError {
  readonly code = "INVALID_RECIPE_CATEGORY";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid recipe category value: ${value}`);
  }
}
