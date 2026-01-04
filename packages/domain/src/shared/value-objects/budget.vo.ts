import { ValueObject } from "@cookmate/core";
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

interface BudgetProps {
  value: BudgetValue;
}

export class Budget extends ValueObject<BudgetProps> {
  static readonly LOW = new Budget({ value: "LOW" });
  static readonly MEDIUM = new Budget({ value: "MEDIUM" });
  static readonly HIGH = new Budget({ value: "HIGH" });

  private constructor(props: BudgetProps) {
    super(props);
  }

  static fromString(value: string): Budget {
    if (!BUDGETS.includes(value as BudgetValue)) {
      throw new InvalidBudgetError(value);
    }
    return new Budget({ value: value as BudgetValue });
  }

  static fromStringOrNull(value: string | null | undefined): Budget | null {
    if (value === null || value === undefined) return null;
    return Budget.fromString(value);
  }

  get value(): BudgetValue {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }
}
