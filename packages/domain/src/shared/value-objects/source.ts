import { DomainError } from "../../errors";

export const SOURCES = [
  "MANUAL",
  "IMPORT_URL",
  "IMPORT_SOCIAL_NETWORK",
  "IMPORT_IMAGE",
  "IMPORT_TEXT",
  "FORK_DISCOVER",
] as const;
export type SourceValue = (typeof SOURCES)[number];

export class InvalidSourceError extends DomainError {
  readonly code = "INVALID_SOURCE";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid source value: ${value}. Must be one of: ${SOURCES.join(", ")}`);
  }
}
