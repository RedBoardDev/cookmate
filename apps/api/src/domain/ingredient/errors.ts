import { DomainError } from "@/domain/errors/domain.error";

export class IngredientNotFoundError extends DomainError {
  readonly code = "INGREDIENT_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Ingredient ${id} not found` : "Ingredient not found");
  }
}

export class InvalidIngredientDataError extends DomainError {
  readonly code = "INVALID_INGREDIENT_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid ingredient data") {
    super(message);
  }
}
