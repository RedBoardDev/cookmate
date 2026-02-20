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

export class NotRecipeImageOwnerError extends DomainError {
  readonly code = "NOT_RECIPE_IMAGE_OWNER";
  readonly httpStatus = 403;

  constructor() {
    super("You must be the recipe owner to perform this action on this image");
  }
}
