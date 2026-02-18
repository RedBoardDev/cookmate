import { DomainError } from "../../errors";

export const BUDGETS = ["LOW", "MEDIUM", "HIGH"] as const;
export type BudgetValue = (typeof BUDGETS)[number];

export class InvalidBudgetError extends DomainError {
  readonly code = "INVALID_BUDGET";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid budget value: ${value}. Must be one of: ${BUDGETS.join(", ")}`);
  }
}
