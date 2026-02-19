import { ValueObject } from "@cookmate/core";
import type { RecipeDifficulty as DomainRecipeDifficulty } from "@cookmate/domain/recipe";
import { DIFFICULTIES } from "@cookmate/domain/shared/value-objects";

interface RecipeDifficultyProps {
  value: DomainRecipeDifficulty;
}

export type RecipeDifficultyType = DomainRecipeDifficulty;

export class RecipeDifficulty extends ValueObject<RecipeDifficultyProps> {
  private constructor(props: RecipeDifficultyProps) {
    super(props);
  }

  private static isValidRecipeDifficulty(value: DomainRecipeDifficulty): boolean {
    return DIFFICULTIES.includes(value);
  }

  public static create(value: DomainRecipeDifficulty): RecipeDifficulty {
    if (!RecipeDifficulty.isValidRecipeDifficulty(value)) {
      throw new Error("RecipeDifficulty must be a valid difficulty.");
    }

    return new RecipeDifficulty({ value });
  }

  public static fromValue(value?: DomainRecipeDifficulty | null): RecipeDifficulty | null {
    if (!value) {
      return null;
    }

    if (!RecipeDifficulty.isValidRecipeDifficulty(value)) {
      return null;
    }

    return new RecipeDifficulty({ value });
  }

  get value(): DomainRecipeDifficulty {
    return this.props.value;
  }

  get ordinal(): number {
    return DIFFICULTIES.indexOf(this.props.value);
  }

  get isEasy(): boolean {
    return this.props.value === "EASY";
  }

  get isMedium(): boolean {
    return this.props.value === "MEDIUM";
  }

  get isHard(): boolean {
    return this.props.value === "HARD";
  }
}
