import { DomainError } from "@/domain/errors/domain.error";

export class CollectionMemberNotFoundError extends DomainError {
  readonly code = "COLLECTION_MEMBER_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Collection member ${id} not found` : "Collection member not found");
  }
}

export class InvalidCollectionMemberDataError extends DomainError {
  readonly code = "INVALID_COLLECTION_MEMBER_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid collection member data") {
    super(message);
  }
}
