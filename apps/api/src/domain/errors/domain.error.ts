/**
 * Base class for all domain errors.
 * Domain errors represent business rule violations.
 * Each domain defines its own error classes extending this.
 */
export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly httpStatus: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
