import { DomainError } from "../../errors";

export const PARSING_TYPES = ["URL", "IMAGE", "TEXT", "PDF", "VIDEO", "INSTAGRAM", "TIKTOK", "PINTEREST"] as const;
export type ParsingTypeValue = (typeof PARSING_TYPES)[number];

export class InvalidParsingTypeError extends DomainError {
  readonly code = "INVALID_PARSING_TYPE";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid parsing type: ${value}. Must be one of: ${PARSING_TYPES.join(", ")}`);
  }
}
