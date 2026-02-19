import { ValueObject } from "@cookmate/core";
import type { Instruction } from "@cookmate/domain/instruction";

interface RecipeDurationProps {
  value: NonNullable<Instruction["durationMin"]>;
}

function isValidDuration(value: number) {
  return Number.isFinite(value) && value >= 0;
}

export class RecipeDuration extends ValueObject<RecipeDurationProps> {
  private constructor(props: RecipeDurationProps) {
    super(props);
  }

  public static create(value: NonNullable<Instruction["durationMin"]>): RecipeDuration {
    if (!isValidDuration(value)) {
      throw new Error("RecipeDuration must be a non-negative number.");
    }
    return new RecipeDuration({ value });
  }

  public static fromValue(value?: number | null): RecipeDuration | null {
    if (value === null || value === undefined) return null;
    if (!isValidDuration(value)) return null;

    return new RecipeDuration({ value });
  }

  get value(): NonNullable<Instruction["durationMin"]> {
    return this.props.value;
  }

  /** Full hours component (e.g. 90 min → 1). */
  get hours(): number {
    return Math.floor(this.props.value / 60);
  }

  /** Remaining minutes after full hours (e.g. 90 min → 30). */
  get remainingMinutes(): number {
    return this.props.value % 60;
  }

  /** Whether the duration is less than one hour. */
  get isShort(): boolean {
    return this.props.value < 60;
  }
}
