import { DomainError } from "@/domain/errors/domain.error";

export class DiscoverRecipeNotFoundError extends DomainError {
  readonly code = "DISCOVER_RECIPE_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Discover recipe ${id} not found` : "Discover recipe not found");
  }
}

export class InvalidDiscoverRecipeDataError extends DomainError {
  readonly code = "INVALID_DISCOVER_RECIPE_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid discover recipe data") {
    super(message);
  }
}
