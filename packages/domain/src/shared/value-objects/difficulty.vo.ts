import { ValueObject } from "@cookmate/core";
import { DomainError } from "../../errors";

export const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;
export type DifficultyValue = (typeof DIFFICULTIES)[number];

export class InvalidDifficultyError extends DomainError {
  readonly code = "INVALID_DIFFICULTY";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid difficulty value: ${value}. Must be one of: ${DIFFICULTIES.join(", ")}`);
  }
}

interface DifficultyProps {
  value: DifficultyValue;
}

export class Difficulty extends ValueObject<DifficultyProps> {
  static readonly EASY = new Difficulty({ value: "EASY" });
  static readonly MEDIUM = new Difficulty({ value: "MEDIUM" });
  static readonly HARD = new Difficulty({ value: "HARD" });

  private constructor(props: DifficultyProps) {
    super(props);
  }

  static fromString(value: string): Difficulty {
    if (!DIFFICULTIES.includes(value as DifficultyValue)) {
      throw new InvalidDifficultyError(value);
    }
    return new Difficulty({ value: value as DifficultyValue });
  }

  static fromStringOrNull(value: string | null | undefined): Difficulty | null {
    if (value === null || value === undefined) return null;
    return Difficulty.fromString(value);
  }

  get value(): DifficultyValue {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }
}
