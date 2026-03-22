import type { Ingredient } from "@cookmate/domain/ingredient";
import type { RecipeIngredient as DomainRecipeIngredient } from "@cookmate/domain/recipe-ingredient";
import { ValueObject } from "@cookmate/domain-driven-design";

interface RecipeIngredientProps {
  name: Ingredient["name"];
  amount: string | null;
  quantity?: number | null;
  unit?: string | null;
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

function normalizeUnit(value: string | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const normalizedValue = value.trim();

  return normalizedValue.length > 0 ? normalizedValue : null;
}

function normalizeQuantity(value: number | null | undefined): number | null {
  if (value === null || value === undefined) {
    return null;
  }

  return Number.isFinite(value) ? value : null;
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
      quantity: normalizeQuantity(props.quantity),
      unit: normalizeUnit(props.unit),
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
      quantity: normalizeQuantity(props.quantity),
      unit: normalizeUnit(props.unit),
    });
  }

  get name(): string {
    return this.props.name;
  }

  get amount(): string | null {
    return this.props.amount;
  }

  get quantity(): number | null {
    return this.props.quantity ?? null;
  }

  get unit(): string | null {
    return this.props.unit ?? null;
  }

  get note(): string | null | undefined {
    return this.props.note;
  }

  scaleQuantity(currentServings: number, originalServings: number): number | null {
    if (this.quantity === null) {
      return null;
    }

    if (!Number.isFinite(currentServings) || !Number.isFinite(originalServings) || originalServings <= 0) {
      return this.quantity;
    }

    return this.quantity * (currentServings / originalServings);
  }
}
