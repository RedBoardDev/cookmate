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

export class MemberAlreadyExistsError extends DomainError {
  readonly code = "MEMBER_ALREADY_EXISTS";
  readonly httpStatus = 409;

  constructor() {
    super("User is already a member of this collection");
  }
}

export class MemberNotFoundError extends DomainError {
  readonly code = "MEMBER_NOT_FOUND";
  readonly httpStatus = 404;

  constructor() {
    super("Member not found in this collection");
  }
}

export class CannotRemoveOwnerError extends DomainError {
  readonly code = "CANNOT_REMOVE_OWNER";
  readonly httpStatus = 400;

  constructor() {
    super("Cannot remove the owner from the collection");
  }
}
