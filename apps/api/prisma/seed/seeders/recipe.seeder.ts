import { faker } from "@faker-js/faker";
import type { DiscoverRecipe, Equipment, Ingredient, PrismaClient, Recipe } from "../../../src/generated/prisma/client";
import { DiscoverRecipeSource, RecipeSource } from "../../../src/generated/prisma/client";
import type { SeedConfig } from "../config";
import { buildRecipeBase } from "../factories/recipe.factory";
import { logger } from "../lib/logger";
import type { SeededUser } from "./user.seeder";

export type RecipeSeedResult = {
  recipes: Recipe[];
  discoverRecipes: DiscoverRecipe[];
  recipesByUser: Map<string, Recipe[]>;
};

const pickCount = (min: number, max: number): number => faker.number.int({ min, max });

const pickEquipments = (equipmentIds: string[], min: number, max: number) => {
  if (equipmentIds.length === 0) {
    return [];
  }
  const count = Math.min(pickCount(min, max), equipmentIds.length);
  return faker.helpers.arrayElements(equipmentIds, count).map((id) => ({ id }));
};

const pickDiscoverSource = (): DiscoverRecipeSource =>
  faker.helpers.arrayElement([
    DiscoverRecipeSource.API,
    DiscoverRecipeSource.SCRAPE_WEB,
    DiscoverRecipeSource.SCRAPE_SOCIAL_NETWORK,
  ]);

export const seedRecipes = async (
  prisma: PrismaClient,
  users: SeededUser[],
  ingredients: Ingredient[],
  equipments: Equipment[],
  config: SeedConfig,
): Promise<RecipeSeedResult> => {
  logger.info("Seeding recipes...");

  const ingredientNames = ingredients.map((ingredient) => ingredient.name);
  const equipmentIds = equipments.map((equipment) => equipment.id);

  const discoverRecipes: DiscoverRecipe[] = [];
  for (let i = 0; i < config.discoverRecipes.count; i += 1) {
    const base = buildRecipeBase(ingredientNames);
    const sourceUrl = faker.internet.url();

    const created = await prisma.discoverRecipe.create({
      data: {
        ...base,
        source: pickDiscoverSource(),
        sourceUrl,
        equipments: {
          connect: pickEquipments(
            equipmentIds,
            config.content.equipmentsPerRecipe.min,
            config.content.equipmentsPerRecipe.max,
          ),
        },
      },
    });
    discoverRecipes.push(created);
  }

  const recipes: Recipe[] = [];
  const recipesByUser = new Map<string, Recipe[]>();

  for (const user of users) {
    const count = pickCount(config.recipesPerUser.min, config.recipesPerUser.max);
    const userRecipes: Recipe[] = [];

    for (let i = 0; i < count; i += 1) {
      const base = buildRecipeBase(ingredientNames);
      const shouldFork = discoverRecipes.length > 0 && Math.random() < config.forkedRecipeRatio;
      const forked = shouldFork ? faker.helpers.arrayElement(discoverRecipes) : null;

      const created = await prisma.recipe.create({
        data: {
          ...base,
          userId: user.id,
          source: shouldFork ? RecipeSource.FORK_DISCOVER : RecipeSource.MANUAL,
          forkedFromDiscoverId: forked?.id ?? null,
          equipments: {
            connect: pickEquipments(
              equipmentIds,
              config.content.equipmentsPerRecipe.min,
              config.content.equipmentsPerRecipe.max,
            ),
          },
        },
      });

      userRecipes.push(created);
      recipes.push(created);
    }

    recipesByUser.set(user.id, userRecipes);
  }

  logger.success(`Recipes seeded (${recipes.length} user recipes, ` + `${discoverRecipes.length} discover recipes)`);

  return {
    recipes,
    discoverRecipes,
    recipesByUser,
  };
};
