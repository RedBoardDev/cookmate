import { DomainError } from "@/domain/errors/domain.error";

export class EquipmentNotFoundError extends DomainError {
  readonly code = "EQUIPMENT_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Equipment ${id} not found` : "Equipment not found");
  }
}

export class InvalidEquipmentDataError extends DomainError {
  readonly code = "INVALID_EQUIPMENT_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid equipment data") {
    super(message);
  }
}
