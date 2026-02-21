import { ValueObject } from "@cookmate/core";
import type { Ingredient } from "@cookmate/domain/ingredient";
import type { RecipeIngredient as DomainRecipeIngredient } from "@cookmate/domain/recipe-ingredient";

interface RecipeIngredientProps {
  name: Ingredient["name"];
  amount: string | null;
  note?: DomainRecipeIngredient["note"];
}

function normalizeValue(value: string): string {
  return value.trim();
}

function normalizeAmount(value: string | null): string | null {
  if (value === null) {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : null;
}

function isValidName(value: string): boolean {
  return normalizeValue(value).length > 0;
}

export class RecipeIngredient extends ValueObject<RecipeIngredientProps> {
  private constructor(props: RecipeIngredientProps) {
    super(props);
  }

  public static create(props: RecipeIngredientProps): RecipeIngredient {
    if (!isValidName(props.name)) {
      throw new Error("RecipeIngredient requires a valid name.");
    }

    return new RecipeIngredient({
      ...props,
      name: normalizeValue(props.name),
      amount: normalizeAmount(props.amount),
    });
  }

  public static fromValue(props?: RecipeIngredientProps | null): RecipeIngredient | null {
    if (!props) {
      return null;
    }

    if (!isValidName(props.name)) {
      return null;
    }

    return new RecipeIngredient({
      ...props,
      name: normalizeValue(props.name),
      amount: normalizeAmount(props.amount),
    });
  }

  get name(): string {
    return this.props.name;
  }

  get amount(): string | null {
    return this.props.amount;
  }

  get note(): string | null | undefined {
    return this.props.note;
  }
}
