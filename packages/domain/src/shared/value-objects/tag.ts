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
