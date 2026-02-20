import { faker } from "@faker-js/faker";

const EMOJIS = [
  "\u{1F35D}",
  "\u{1F957}",
  "\u{1F372}",
  "\u{1F958}",
  "\u{1F373}",
  "\u{1F370}",
  "\u{1F963}",
  "\u{1F9C0}",
  "\u{1F95E}",
  "\u{1F96A}",
];

const NAME_PREFIXES = [
  "Recettes",
  "Favoris",
  "Semaine",
  "Idees",
  "Batch",
  "Maison",
  "Desserts",
  "Brunch",
  "Rapides",
  "Convivial",
];

const NAME_SUFFIXES = [
  "de la semaine",
  "du soir",
  "du weekend",
  "express",
  "familial",
  "leger",
  "gourmand",
  "a partager",
  "a refaire",
];

const maybe = (chance: number): boolean => Math.random() < chance;

export type CollectionSeed = {
  name: string;
  description: string | null;
  emoji: string;
};

const buildCollectionName = (): string => {
  const prefix = faker.helpers.arrayElement(NAME_PREFIXES);
  if (maybe(0.6)) {
    return `${prefix} ${faker.helpers.arrayElement(NAME_SUFFIXES)}`;
  }
  return `${prefix} ${faker.word.adjective()}`;
};

export const buildCollectionSeed = (): CollectionSeed => ({
  name: buildCollectionName(),
  description: faker.lorem.sentence(),
  emoji: faker.helpers.arrayElement(EMOJIS),
});
