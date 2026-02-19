import { ValueObject } from "@cookmate/core";
import type { Recipe } from "@cookmate/domain/recipe";

interface RecipeServingsProps {
  value: Recipe["servings"];
}

function isValidServings(value: number) {
  return Number.isInteger(value) && value > 0;
}

export class RecipeServings extends ValueObject<RecipeServingsProps> {
  private constructor(props: RecipeServingsProps) {
    super(props);
  }

  public static create(value: Recipe["servings"]): RecipeServings {
    if (!isValidServings(value)) {
      throw new Error("RecipeServings must be a positive integer.");
    }
    return new RecipeServings({ value });
  }

  public static fromValue(value?: number | null): RecipeServings | null {
    if (value === null || value === undefined) return null;
    if (!isValidServings(value)) return null;

    return new RecipeServings({ value });
  }

  get value(): Recipe["servings"] {
    return this.props.value;
  }

  /** Returns a new RecipeServings incremented by 1. */
  increment(): RecipeServings {
    return new RecipeServings({ value: this.props.value + 1 });
  }

  /** Returns a new RecipeServings decremented by 1 (minimum 1). */
  decrement(): RecipeServings {
    const next = Math.max(1, this.props.value - 1);
    return new RecipeServings({ value: next });
  }

  /** Returns the ratio between this serving count and the original. Useful for ingredient scaling. */
  scalingRatio(original: RecipeServings): number {
    return this.props.value / original.value;
  }
}
