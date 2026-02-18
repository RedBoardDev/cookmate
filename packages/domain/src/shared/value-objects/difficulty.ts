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
