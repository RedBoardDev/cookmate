import { faker } from "@faker-js/faker";
import { Budget, Difficulty, RecipeAttribute, RecipeCategory } from "../../../src/generated/prisma/client";
import { createShortUrl } from "../lib/short-url";

const RECIPE_CATEGORIES = [
  RecipeCategory.MAIN_COURSE,
  RecipeCategory.APPETIZER,
  RecipeCategory.SIDE_DISH,
  RecipeCategory.DESSERT,
  RecipeCategory.DRINK,
  RecipeCategory.BREAKFAST,
  RecipeCategory.SNACK,
  RecipeCategory.SOUP,
  RecipeCategory.SALAD,
  RecipeCategory.SAUCE,
];

const RECIPE_ATTRIBUTES = [
  RecipeAttribute.QUICK,
  RecipeAttribute.EASY,
  RecipeAttribute.HEALTHY,
  RecipeAttribute.VEGETARIAN,
];

const TITLE_PREFIXES = [
  "Gratin de",
  "Salade de",
  "Tarte a",
  "Poelee de",
  "Soupe de",
  "Ragout de",
  "Curry de",
  "Wok de",
  "Risotto aux",
  "Quiche aux",
];

const TITLE_SUFFIXES = ["express", "maison", "rustique", "gourmande", "legere", "cremeuse", "epicee", "croustillante"];

const maybe = (chance: number): boolean => Math.random() < chance;

const pickOne = <T>(values: T[]): T => faker.helpers.arrayElement(values);

const buildTitle = (ingredientNames: string[]): string => {
  const ingredient = ingredientNames.length > 0 ? pickOne(ingredientNames) : "Legumes";
  const prefix = pickOne(TITLE_PREFIXES);
  if (maybe(0.5)) {
    return `${prefix} ${ingredient}`;
  }
  const suffix = pickOne(TITLE_SUFFIXES);
  return `${ingredient} ${suffix}`;
};

const buildCategories = (): RecipeCategory[] => {
  const categories = new Set<RecipeCategory>();
  categories.add(pickOne(RECIPE_CATEGORIES));
  if (maybe(0.2)) {
    categories.add(pickOne(RECIPE_CATEGORIES));
  }
  return Array.from(categories);
};

const buildAttributes = (): RecipeAttribute[] => {
  const attributes = new Set<RecipeAttribute>();
  if (maybe(0.6)) {
    attributes.add(pickOne(RECIPE_ATTRIBUTES));
  }
  if (maybe(0.25)) {
    attributes.add(pickOne(RECIPE_ATTRIBUTES));
  }
  return Array.from(attributes);
};

const buildTimes = () => {
  const prepTimeMin = faker.number.int({ min: 5, max: 30 });
  const cookTimeMin = faker.number.int({ min: 10, max: 90 });
  const totalTimeMin = prepTimeMin + cookTimeMin;

  return {
    prepTimeMin,
    cookTimeMin,
    totalTimeMin,
  };
};

export type RecipeBaseSeed = {
  name: string;
  description: string | null;
  servings: number;
  yieldUnitLabel: string | null;
  prepTimeMin: number;
  cookTimeMin: number;
  totalTimeMin: number;
  difficulty: Difficulty | null;
  budget: Budget | null;
  categories: RecipeCategory[];
  attributes: RecipeAttribute[];
  shortUrl: string;
};

export const buildRecipeBase = (ingredientNames: string[]): RecipeBaseSeed => {
  const times = buildTimes();
  const description = faker.lorem.sentences(faker.number.int({ min: 1, max: 2 }));

  return {
    name: buildTitle(ingredientNames),
    description,
    servings: faker.number.int({ min: 1, max: 6 }),
    yieldUnitLabel: maybe(0.7) ? pickOne(["portions", "personnes", "parts"]) : null,
    ...times,
    difficulty: maybe(0.8) ? pickOne(Object.values(Difficulty)) : null,
    budget: maybe(0.7) ? pickOne(Object.values(Budget)) : null,
    categories: buildCategories(),
    attributes: buildAttributes(),
    shortUrl: createShortUrl(),
  };
};
