import { DomainError } from "../errors";

export class InstructionNotFoundError extends DomainError {
  readonly code = "INSTRUCTION_NOT_FOUND";
  readonly httpStatus = 404;

  constructor(id?: string) {
    super(id ? `Instruction ${id} not found` : "Instruction not found");
  }
}

export class InvalidInstructionDataError extends DomainError {
  readonly code = "INVALID_INSTRUCTION_DATA";
  readonly httpStatus = 400;

  constructor(message = "Invalid instruction data") {
    super(message);
  }
}
