import { ValueObject } from "@cookmate/core";
import type { RecipeDifficulty as DomainRecipeDifficulty } from "@cookmate/domain/recipe";
import { DIFFICULTIES } from "@cookmate/domain/shared/value-objects";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";

interface RecipeDifficultyProps {
  value: DomainRecipeDifficulty;
}

export type RecipeDifficultyType = DomainRecipeDifficulty;

const RECIPE_DIFFICULTY_LABELS: Record<DomainRecipeDifficulty, MessageDescriptor> = {
  EASY: msg`Easy`,
  MEDIUM: msg`Medium`,
  HARD: msg`Hard`,
};

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

  get value(): DomainRecipeDifficulty {
    return this.props.value;
  }

  get translationKey(): MessageDescriptor {
    return RECIPE_DIFFICULTY_LABELS[this.props.value];
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
