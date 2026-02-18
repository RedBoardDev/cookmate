import { DomainError } from "../errors";
import { DEFAULT_MAX_OWNED_COLLECTIONS } from "./user.constants";

export class UserNotFoundError extends DomainError {
  readonly code = "USER_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `User ${id} not found` : "User not found");
  }
}

export class InvalidUserDataError extends DomainError {
  readonly code = "INVALID_USER_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid user data") {
    super(message);
  }
}

export class EmailNotVerifiedError extends DomainError {
  readonly code = "EMAIL_NOT_VERIFIED";
  readonly httpStatus = 403;

  constructor() {
    super("Email must be verified to perform this action");
  }
}

export class MaxCollectionsReachedError extends DomainError {
  readonly code = "MAX_COLLECTIONS_REACHED";
  readonly httpStatus = 403;

  constructor() {
    super(`Maximum collections limit reached (${DEFAULT_MAX_OWNED_COLLECTIONS} max)`);
  }
}
