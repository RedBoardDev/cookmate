import { DomainError } from "@/domain/errors/domain.error";

export class RecipeIngredientNotFoundError extends DomainError {
  readonly code = "RECIPE_INGREDIENT_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Recipe ingredient ${id} not found` : "Recipe ingredient not found");
  }
}

export class InvalidRecipeIngredientDataError extends DomainError {
  readonly code = "INVALID_RECIPE_INGREDIENT_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid recipe ingredient data") {
    super(message);
  }
}
