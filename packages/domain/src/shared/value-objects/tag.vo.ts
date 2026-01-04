import { ValueObject } from "@cookmate/core";
import { DomainError } from "../../errors";

export const TAGS = [
  "VEGETARIAN",
  "VEGAN",
  "GLUTEN_FREE",
  "DAIRY_FREE",
  "LOW_CARB",
  "BREAKFAST",
  "LUNCH",
  "DINNER",
  "DESSERT",
  "APPETIZER",
  "SNACK",
  "BRUNCH",
  "FRENCH",
  "ITALIAN",
  "ASIAN",
  "MEXICAN",
  "INDIAN",
  "MEDITERRANEAN",
  "AMERICAN",
  "JAPANESE",
  "CHINESE",
  "THAI",
  "GREEK",
  "SPANISH",
  "MOROCCAN",
  "LEBANESE",
  "QUICK",
  "EASY",
  "HEALTHY",
  "COMFORT_FOOD",
  "BUDGET_FRIENDLY",
  "GOURMET",
  "FAMILY_FRIENDLY",
  "BATCH_COOKING",
  "SUMMER",
  "WINTER",
  "FALL",
  "SPRING",
] as const;
export type TagValue = (typeof TAGS)[number];

export class InvalidTagError extends DomainError {
  readonly code = "INVALID_TAG";
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid tag value: ${value}`);
  }
}

interface TagProps {
  value: TagValue;
}

export class Tag extends ValueObject<TagProps> {
  private constructor(props: TagProps) {
    super(props);
  }

  static fromString(value: string): Tag {
    if (!TAGS.includes(value as TagValue)) {
      throw new InvalidTagError(value);
    }
    return new Tag({ value: value as TagValue });
  }

  static fromStrings(values: string[]): Tag[] {
    return values.map((v) => Tag.fromString(v));
  }

  static values(): readonly TagValue[] {
    return TAGS;
  }

  get value(): TagValue {
    return this.props.value;
  }

  toString(): string {
    return this.props.value;
  }

  isDietaryRestriction(): boolean {
    return ["VEGETARIAN", "VEGAN", "GLUTEN_FREE", "DAIRY_FREE", "LOW_CARB"].includes(this.props.value);
  }

  isMealType(): boolean {
    return ["BREAKFAST", "LUNCH", "DINNER", "DESSERT", "APPETIZER", "SNACK", "BRUNCH"].includes(this.props.value);
  }

  isCuisine(): boolean {
    return [
      "FRENCH",
      "ITALIAN",
      "ASIAN",
      "MEXICAN",
      "INDIAN",
      "MEDITERRANEAN",
      "AMERICAN",
      "JAPANESE",
      "CHINESE",
      "THAI",
      "GREEK",
      "SPANISH",
      "MOROCCAN",
      "LEBANESE",
    ].includes(this.props.value);
  }

  isSeason(): boolean {
    return ["SUMMER", "WINTER", "FALL", "SPRING"].includes(this.props.value);
  }
}
