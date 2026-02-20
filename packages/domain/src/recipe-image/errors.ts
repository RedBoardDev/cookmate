import { DomainError } from "../errors";

export class RecipeImageNotFoundError extends DomainError {
  readonly code = "RECIPE_IMAGE_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Recipe image ${id} not found` : "Recipe image not found");
  }
}

export class InvalidRecipeImageDataError extends DomainError {
  readonly code = "INVALID_RECIPE_IMAGE_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid recipe image data") {
    super(message);
  }
}
