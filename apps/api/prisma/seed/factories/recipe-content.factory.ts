import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

export type RecipeImageSeed = {
  storageKey: string;
  name: string;
  mimeType: string;
  size: number;
  order: number;
};

export type RecipeIngredientSeed = {
  name: string;
  unit: string | null;
  quantity: number | null;
  note: string | null;
  optional: boolean;
  order: number;
};

export type RecipeInstructionSeed = {
  text: string;
  durationMin: number | null;
  order: number;
};

type IngredientOptions = {
  quantityMode?: "mixed" | "all_with_quantity" | "mostly_without_quantity" | "fractional_heavy";
  optionalChance?: number;
};

type InstructionOptions = {
  durationMode?: "mixed" | "all_with_duration" | "without_duration";
};

const PREPARATIONS = ["emince", "hache", "rondelles", "cubes", "rape", "ecrase", "melange", "reserve"];
const UNIT_LABELS = ["g", "kg", "ml", "cl", "l", "c. a soupe", "c. a cafe", "piece"];

const ACTIONS = ["Couper", "Melanger", "Ajouter", "Cuire", "Laisser mijoter", "Remuer", "Assaisonner", "Incorporer"];

const maybe = (chance: number): boolean => Math.random() < chance;

export const buildRecipeImages = (count: number): RecipeImageSeed[] =>
  Array.from({ length: count }, (_, index) => ({
    storageKey: `recipes/${randomUUID()}.jpg`,
    name: `image-${index + 1}.jpg`,
    mimeType: "image/jpeg",
    size: faker.number.int({ min: 40_000, max: 350_000 }),
    order: index + 1,
  }));

export const buildRecipeIngredients = (
  ingredientNames: string[],
  count: number,
  options: IngredientOptions = {},
): RecipeIngredientSeed[] => {
  const quantityMode = options.quantityMode ?? "mixed";
  const optionalChance = options.optionalChance ?? 0.1;
  const selected = faker.helpers.arrayElements(ingredientNames, count);

  return selected.map((name, index) => {
    const shouldHaveUnit = quantityMode === "mostly_without_quantity" ? maybe(0.2) : maybe(0.75);
    const unit = shouldHaveUnit ? faker.helpers.arrayElement(UNIT_LABELS) : null;
    const shouldHaveQuantity =
      quantityMode === "all_with_quantity"
        ? true
        : quantityMode === "mostly_without_quantity"
          ? maybe(0.2)
          : quantityMode === "fractional_heavy"
            ? maybe(0.9)
            : Boolean(unit);

    let quantity: number | null = null;
    if (shouldHaveQuantity) {
      if (quantityMode === "fractional_heavy") {
        quantity = Number((faker.number.int({ min: 1, max: 40 }) / 4).toFixed(2));
      } else {
        quantity = Number((faker.number.int({ min: 1, max: 500 }) / 10).toFixed(1));
      }
    }

    return {
      name,
      unit,
      quantity,
      note: maybe(0.35) ? faker.helpers.arrayElement(PREPARATIONS) : null,
      optional: maybe(optionalChance),
      order: index + 1,
    };
  });
};

export const buildRecipeInstructions = (count: number, options: InstructionOptions = {}): RecipeInstructionSeed[] =>
  Array.from({ length: count }, (_, index) => {
    const durationMode = options.durationMode ?? "mixed";
    const action = faker.helpers.arrayElement(ACTIONS);
    const text = `${action} ${faker.lorem.words(faker.number.int({ min: 4, max: 8 }))}.`;

    return {
      text,
      durationMin:
        durationMode === "without_duration"
          ? null
          : durationMode === "all_with_duration"
            ? faker.number.int({ min: 1, max: 45 })
            : maybe(0.5)
              ? faker.number.int({ min: 2, max: 20 })
              : null,
      order: index + 1,
    };
  });
