import { ValueObject } from "@cookmate/core";
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

interface SourceProps {
  value: SourceValue;
}

export class Source extends ValueObject<SourceProps> {
  static readonly MANUAL = new Source({ value: "MANUAL" });
  static readonly IMPORT_URL = new Source({ value: "IMPORT_URL" });
  static readonly IMPORT_SOCIAL_NETWORK = new Source({ value: "IMPORT_SOCIAL_NETWORK" });
  static readonly IMPORT_IMAGE = new Source({ value: "IMPORT_IMAGE" });
  static readonly IMPORT_TEXT = new Source({ value: "IMPORT_TEXT" });
  static readonly FORK_DISCOVER = new Source({ value: "FORK_DISCOVER" });

  private constructor(props: SourceProps) {
    super(props);
  }

  static fromString(value: string): Source {
    if (!SOURCES.includes(value as SourceValue)) {
      throw new InvalidSourceError(value);
    }
    return new Source({ value: value as SourceValue });
  }

  get value(): SourceValue {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }

  isImported(): boolean {
    return this.props.value !== "MANUAL";
  }

  isForked(): boolean {
    return this.props.value === "FORK_DISCOVER";
  }
}
