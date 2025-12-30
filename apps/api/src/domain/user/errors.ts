import { DomainError } from "@/domain/errors/domain.error";

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
