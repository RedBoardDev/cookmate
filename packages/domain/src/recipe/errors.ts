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

export class NotRecipeOwnerError extends DomainError {
  readonly code = "NOT_RECIPE_OWNER";
  readonly httpStatus = 403;

  constructor() {
    super("You must be the recipe owner to perform this action");
  }
}
