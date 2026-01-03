import { DomainError } from "../errors";

export class RecipeNotFoundError extends DomainError {
  readonly code = "RECIPE_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Recipe ${id} not found` : "Recipe not found");
  }
}

export class InvalidRecipeDataError extends DomainError {
  readonly code = "INVALID_RECIPE_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid recipe data") {
    super(message);
  }
}
