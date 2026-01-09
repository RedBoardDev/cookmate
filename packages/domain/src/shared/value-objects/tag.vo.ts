import { ValueObject } from "@cookmate/core";
import { DomainError } from "../../errors";

export const TAGS = [
  "MAIN_COURSE",
  "APPETIZER",
  "SIDE_DISH",
  "DESSERT",
  "DRINK",
  "QUICK",
  "EASY",
  "HEALTHY",
  "VEGETARIAN",
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
    return ["VEGETARIAN"].includes(this.props.value);
  }

  isMealType(): boolean {
    return ["MAIN_COURSE", "APPETIZER", "SIDE_DISH", "DESSERT", "DRINK"].includes(
      this.props.value
    );
  }

  isCuisine(): boolean {
    return false;
  }

  isSeason(): boolean {
    return false;
  }
}
