import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";

export type RecipeImageSeed = {
  s3Url: string;
  name: string;
  mimeType: string;
  size: number;
  order: number;
};

export type RecipeIngredientSeed = {
  ingredientId: string;
  unitId: string | null;
  quantity: number | null;
  preparation: string | null;
  optional: boolean;
  order: number;
};

export type InstructionSeed = {
  text: string;
  durationMin: number | null;
  order: number;
};

const PREPARATIONS = ["emince", "hache", "rondelles", "cubes", "rape", "ecrase", "melange", "reserve"];

const ACTIONS = ["Couper", "Melanger", "Ajouter", "Cuire", "Laisser mijoter", "Remuer", "Assaisonner", "Incorporer"];

const maybe = (chance: number): boolean => Math.random() < chance;

export const buildRecipeImages = (count: number): RecipeImageSeed[] =>
  Array.from({ length: count }, (_, index) => ({
    s3Url: `https://s3.cookmate.app/recipes/${randomUUID()}.jpg`,
    name: `image-${index + 1}.jpg`,
    mimeType: "image/jpeg",
    size: faker.number.int({ min: 40_000, max: 350_000 }),
    order: index + 1,
  }));

export const buildRecipeIngredients = (
  ingredientIds: string[],
  unitIds: string[],
  count: number,
): RecipeIngredientSeed[] => {
  const selected = faker.helpers.arrayElements(ingredientIds, count);

  return selected.map((ingredientId, index) => {
    const unitId = maybe(0.75) ? faker.helpers.arrayElement(unitIds) : null;
    const quantity = unitId ? Number((faker.number.int({ min: 1, max: 500 }) / 10).toFixed(1)) : null;
    return {
      ingredientId,
      unitId,
      quantity,
      preparation: maybe(0.35) ? faker.helpers.arrayElement(PREPARATIONS) : null,
      optional: maybe(0.1),
      order: index + 1,
    };
  });
};

export const buildInstructions = (count: number): InstructionSeed[] =>
  Array.from({ length: count }, (_, index) => {
    const action = faker.helpers.arrayElement(ACTIONS);
    const text = `${action} ${faker.lorem.words(faker.number.int({ min: 4, max: 8 }))}.`;

    return {
      text,
      durationMin: maybe(0.5) ? faker.number.int({ min: 2, max: 20 }) : null,
      order: index + 1,
    };
  });
