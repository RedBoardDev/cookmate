import { DomainError } from "@/domain/errors/domain.error";

export class UnitNotFoundError extends DomainError {
  readonly code = "UNIT_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Unit ${id} not found` : "Unit not found");
  }
}

export class InvalidUnitDataError extends DomainError {
  readonly code = "INVALID_UNIT_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid unit data") {
    super(message);
  }
}
