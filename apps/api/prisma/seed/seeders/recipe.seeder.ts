import { faker } from "@faker-js/faker";
import type { PrismaClient, Recipe } from "../../../src/generated/prisma/client";
import {
  Budget,
  Difficulty,
  RecipeAttribute,
  RecipeCategory,
  RecipeSource,
} from "../../../src/generated/prisma/client";
import type { SeedConfig } from "../config";
import { buildRecipeBase, type RecipeBaseSeed } from "../factories/recipe.factory";
import { createShortUrl } from "../lib/short-url";
import { logger } from "../lib/logger";
import type { SeededUser } from "./user.seeder";

export type RecipeContentProfile =
  | "minimal"
  | "normal"
  | "rich"
  | "no_images"
  | "image_heavy"
  | "fractional_quantities"
  | "mostly_optional";

export type RecipeSeedResult = {
  recipes: Recipe[];
  recipesByUser: Map<string, Recipe[]>;
  contentProfilesByRecipeId: Map<string, RecipeContentProfile>;
};

type RecipeSeedOverrides = Partial<RecipeBaseSeed> & {
  source?: RecipeSource;
  sourceUrl?: string | null;
};

const pickCount = (min: number, max: number): number => faker.number.int({ min, max });

const createRecipeData = (
  ingredientNames: string[],
  overrides: RecipeSeedOverrides = {},
): RecipeBaseSeed & { source: RecipeSource; sourceUrl: string | null } => {
  const base = buildRecipeBase(ingredientNames);
  const sourceUrl = overrides.sourceUrl ?? (Math.random() < 0.45 ? faker.internet.url() : null);

  return {
    ...base,
    ...overrides,
    source: overrides.source ?? (sourceUrl ? RecipeSource.IMPORT_URL : RecipeSource.MANUAL),
    sourceUrl,
    totalTimeMin: (overrides.prepTimeMin ?? base.prepTimeMin) + (overrides.cookTimeMin ?? base.cookTimeMin),
  };
};

type ScenarioDefinition = {
  data: RecipeSeedOverrides;
  profile: RecipeContentProfile;
};

const buildDevScenarios = (): ScenarioDefinition[] => [
  {
    data: {
      name: "Pates beurre ultra simples",
      description: null,
      servings: 1,
      yieldUnitLabel: "portion",
      prepTimeMin: 0,
      cookTimeMin: 8,
      difficulty: Difficulty.EASY,
      budget: Budget.LOW,
      categories: [RecipeCategory.MAIN_COURSE],
      attributes: [RecipeAttribute.EASY, RecipeAttribute.QUICK],
      source: RecipeSource.MANUAL,
      sourceUrl: null,
      shortUrl: createShortUrl(),
    },
    profile: "minimal",
  },
  {
    data: {
      name: "Chili batch 20 portions",
      servings: 20,
      yieldUnitLabel: "portions",
      prepTimeMin: 35,
      cookTimeMin: 140,
      difficulty: Difficulty.MEDIUM,
      budget: Budget.MEDIUM,
      categories: [RecipeCategory.MAIN_COURSE],
      attributes: [RecipeAttribute.HEALTHY],
      source: RecipeSource.IMPORT_TEXT,
      sourceUrl: null,
      shortUrl: createShortUrl(),
    },
    profile: "rich",
  },
  {
    data: {
      name: "Salade import URL sans photo",
      servings: 2,
      yieldUnitLabel: "personnes",
      prepTimeMin: 10,
      cookTimeMin: 0,
      difficulty: null,
      budget: Budget.LOW,
      categories: [RecipeCategory.SALAD],
      attributes: [RecipeAttribute.HEALTHY],
      source: RecipeSource.IMPORT_URL,
      sourceUrl: faker.internet.url(),
      shortUrl: createShortUrl(),
    },
    profile: "no_images",
  },
  {
    data: {
      name: "Soupe test fractions",
      servings: 3,
      yieldUnitLabel: "bols",
      prepTimeMin: 12,
      cookTimeMin: 28,
      difficulty: Difficulty.EASY,
      budget: Budget.LOW,
      categories: [RecipeCategory.SOUP],
      attributes: [RecipeAttribute.EASY],
      source: RecipeSource.MANUAL,
      sourceUrl: null,
      shortUrl: createShortUrl(),
    },
    profile: "fractional_quantities",
  },
  {
    data: {
      name: "Menu photo social",
      servings: 4,
      yieldUnitLabel: "parts",
      prepTimeMin: 20,
      cookTimeMin: 45,
      difficulty: Difficulty.HARD,
      budget: Budget.HIGH,
      categories: [RecipeCategory.MAIN_COURSE],
      attributes: [],
      source: RecipeSource.IMPORT_SOCIAL_NETWORK,
      sourceUrl: faker.internet.url(),
      shortUrl: createShortUrl(),
    },
    profile: "image_heavy",
  },
  {
    data: {
      name: "Recette image OCR",
      servings: 6,
      yieldUnitLabel: "parts",
      prepTimeMin: 18,
      cookTimeMin: 55,
      difficulty: null,
      budget: null,
      categories: [RecipeCategory.DESSERT],
      attributes: [],
      source: RecipeSource.IMPORT_IMAGE,
      sourceUrl: null,
      shortUrl: createShortUrl(),
    },
    profile: "mostly_optional",
  },
  {
    data: {
      name: "Recette dupliquée UI test",
      servings: 4,
      prepTimeMin: 15,
      cookTimeMin: 25,
      categories: [RecipeCategory.MAIN_COURSE],
      attributes: [RecipeAttribute.EASY],
      source: RecipeSource.MANUAL,
      sourceUrl: null,
      shortUrl: createShortUrl(),
    },
    profile: "normal",
  },
  {
    data: {
      name: "Recette dupliquée UI test",
      servings: 2,
      prepTimeMin: 7,
      cookTimeMin: 12,
      categories: [RecipeCategory.SNACK],
      attributes: [RecipeAttribute.QUICK],
      source: RecipeSource.MANUAL,
      sourceUrl: null,
      shortUrl: createShortUrl(),
    },
    profile: "normal",
  },
];

export const seedRecipes = async (
  prisma: PrismaClient,
  users: SeededUser[],
  ingredientNames: string[],
  config: SeedConfig,
): Promise<RecipeSeedResult> => {
  logger.info("Seeding recipes...");

  const recipes: Recipe[] = [];
  const recipesByUser = new Map<string, Recipe[]>();
  const contentProfilesByRecipeId = new Map<string, RecipeContentProfile>();

  for (const user of users) {
    const count = pickCount(config.recipesPerUser.min, config.recipesPerUser.max);
    const userRecipes: Recipe[] = [];

    for (let i = 0; i < count; i += 1) {
      const data = createRecipeData(ingredientNames);
      const created = await prisma.recipe.create({
        data: {
          ...data,
          userId: user.id,
        },
      });

      userRecipes.push(created);
      recipes.push(created);
      contentProfilesByRecipeId.set(created.id, "normal");
    }

    if (user.isFixed) {
      for (const scenario of buildDevScenarios()) {
        const data = createRecipeData(ingredientNames, scenario.data);
        const created = await prisma.recipe.create({
          data: {
            ...data,
            userId: user.id,
          },
        });
        userRecipes.push(created);
        recipes.push(created);
        contentProfilesByRecipeId.set(created.id, scenario.profile);
      }
    }

    recipesByUser.set(user.id, userRecipes);
  }

  logger.success(`Recipes seeded (${recipes.length})`);

  return {
    recipes,
    recipesByUser,
    contentProfilesByRecipeId,
  };
};
