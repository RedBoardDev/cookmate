import { faker } from "@faker-js/faker";
import { Budget, Difficulty, Tag } from "../../../src/generated/prisma/client";
import { createShortUrl } from "../lib/short-url";

const MEAL_TAGS = [
  Tag.MAIN_COURSE,
  Tag.APPETIZER,
  Tag.SIDE_DISH,
  Tag.DESSERT,
  Tag.DRINK,
];

const CHARACTERISTIC_TAGS = [
  Tag.QUICK,
  Tag.EASY,
  Tag.HEALTHY,
  Tag.VEGETARIAN,
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

const TITLE_SUFFIXES = [
  "express",
  "maison",
  "rustique",
  "gourmande",
  "legere",
  "cremeuse",
  "epicee",
  "croustillante",
];

const maybe = (chance: number): boolean => Math.random() < chance;

const pickOne = <T>(values: T[]): T => faker.helpers.arrayElement(values);

const buildTitle = (ingredientNames: string[]): string => {
  const ingredient =
    ingredientNames.length > 0 ? pickOne(ingredientNames) : "Legumes";
  const prefix = pickOne(TITLE_PREFIXES);
  if (maybe(0.5)) {
    return `${prefix} ${ingredient}`;
  }
  const suffix = pickOne(TITLE_SUFFIXES);
  return `${ingredient} ${suffix}`;
};

const buildTags = (): Tag[] => {
  const tags = new Set<Tag>();
  tags.add(pickOne(MEAL_TAGS));
  if (maybe(0.6)) {
    tags.add(pickOne(CHARACTERISTIC_TAGS));
  }
  if (maybe(0.25)) {
    tags.add(pickOne(CHARACTERISTIC_TAGS));
  }
  return Array.from(tags);
};

const buildTimes = () => {
  const prepTimeMin = maybe(0.85) ? faker.number.int({ min: 5, max: 30 }) : null;
  const cookTimeMin = maybe(0.9) ? faker.number.int({ min: 10, max: 90 }) : null;
  const restTimeMin = maybe(0.3) ? faker.number.int({ min: 5, max: 30 }) : null;
  const totalTimeMin =
    (prepTimeMin ?? 0) + (cookTimeMin ?? 0) + (restTimeMin ?? 0);

  return {
    prepTimeMin,
    cookTimeMin,
    restTimeMin,
    totalTimeMin:
      totalTimeMin > 0
        ? totalTimeMin
        : faker.number.int({ min: 10, max: 60 }),
  };
};

export type RecipeBaseSeed = {
  title: string;
  description: string | null;
  servings: number;
  prepTimeMin: number | null;
  cookTimeMin: number | null;
  restTimeMin: number | null;
  totalTimeMin: number;
  difficulty: Difficulty | null;
  budget: Budget | null;
  tags: Tag[];
  shortUrl: string;
};

export const buildRecipeBase = (ingredientNames: string[]): RecipeBaseSeed => {
  const times = buildTimes();
  const description = faker.lorem.sentences(
    faker.number.int({ min: 1, max: 2 })
  );

  return {
    title: buildTitle(ingredientNames),
    description,
    servings: faker.number.int({ min: 1, max: 6 }),
    ...times,
    difficulty: maybe(0.8) ? pickOne(Object.values(Difficulty)) : null,
    budget: maybe(0.7) ? pickOne(Object.values(Budget)) : null,
    tags: buildTags(),
    shortUrl: createShortUrl(),
  };
};
