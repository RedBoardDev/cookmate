import { DomainError } from "../../errors";

export const PARSING_STATUSES = ["QUEUED", "PROCESSING", "COMPLETED", "FAILED", "CANCELLED"] as const;
export type ParsingStatusValue = (typeof PARSING_STATUSES)[number];

export class InvalidParsingStatusError extends DomainError {
  readonly code = "INVALID_PARSING_STATUS";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid parsing status: ${value}. Must be one of: ${PARSING_STATUSES.join(", ")}`);
  }
}
