import type { PrismaClient } from "../../../src/generated/prisma/client";
import type { AuthService } from "../../../src/infra/services/auth-service";
import type { SeedConfig } from "../config";
import { INGREDIENTS } from "../data/ingredients";
import { logger } from "../lib/logger";
import { seedCollections } from "./collection.seeder";
import { seedContent } from "./content.seeder";
import { seedRecipes } from "./recipe.seeder";
import { seedUsers } from "./user.seeder";

export type SeedContext = {
  prisma: PrismaClient;
  auth: AuthService;
  config: SeedConfig;
};

export const seedDatabase = async ({ prisma, auth, config }: SeedContext) => {
  logger.phase(1, "Users");
  const users = await seedUsers(prisma, auth, config);

  logger.phase(2, "Recipes");
  const { recipes, recipesByUser, contentProfilesByRecipeId } = await seedRecipes(prisma, users, INGREDIENTS, config);

  logger.phase(3, "Recipe content");
  await seedContent(prisma, {
    recipes,
    ingredientNames: INGREDIENTS,
    contentProfilesByRecipeId,
    config,
  });

  logger.phase(4, "Collections");
  await seedCollections(prisma, users, recipesByUser, config);
};
