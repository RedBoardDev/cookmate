import { DomainError } from "../errors";

export class CollectionNotFoundError extends DomainError {
  readonly code = "COLLECTION_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Collection ${id} not found` : "Collection not found");
  }
}

export class InvalidCollectionDataError extends DomainError {
  readonly code = "INVALID_COLLECTION_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid collection data") {
    super(message);
  }
}

export class NotCollectionOwnerError extends DomainError {
  readonly code = "NOT_COLLECTION_OWNER";
  readonly httpStatus = 403;

  constructor() {
    super("You must be the collection owner to perform this action");
  }
}

export class NotCollectionMemberError extends DomainError {
  readonly code = "NOT_COLLECTION_MEMBER";
  readonly httpStatus = 403;

  constructor() {
    super("You must be a member of this collection to view it");
  }
}

export class CollectionLimitReachedError extends DomainError {
  readonly code = "COLLECTION_LIMIT_REACHED";
  readonly httpStatus = 403;

  constructor(limit = 15) {
    super(`Collection limit reached (${limit} max)`);
  }
}

export class RecipeAlreadyInCollectionError extends DomainError {
  readonly code = "RECIPE_ALREADY_IN_COLLECTION";
  readonly httpStatus = 409;

  constructor() {
    super("Recipe is already in this collection");
  }
}

export class RecipeNotInCollectionError extends DomainError {
  readonly code = "RECIPE_NOT_IN_COLLECTION";
  readonly httpStatus = 404;

  constructor() {
    super("Recipe is not in this collection");
  }
}
