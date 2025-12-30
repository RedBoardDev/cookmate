import { DomainError } from "@/domain/errors/domain.error";

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
