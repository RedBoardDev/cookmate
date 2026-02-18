import type { PrismaClient } from "../../../src/generated/prisma/client";
import type { AuthService } from "../../../src/infra/services/auth-service";
import type { SeedConfig } from "../config";
import { logger } from "../lib/logger";
import { seedCollections } from "./collection.seeder";
import { seedContent } from "./content.seeder";
import { seedRecipes } from "./recipe.seeder";
import { seedReferenceData } from "./reference.seeder";
import { seedUsers } from "./user.seeder";

export type SeedContext = {
  prisma: PrismaClient;
  auth: AuthService;
  config: SeedConfig;
};

export const seedDatabase = async ({ prisma, auth, config }: SeedContext) => {
  logger.phase(1, "Reference data");
  const references = await seedReferenceData(prisma);

  logger.phase(2, "Users");
  const users = await seedUsers(prisma, auth, config);

  logger.phase(3, "Recipes");
  const { recipes, discoverRecipes, recipesByUser } = await seedRecipes(
    prisma,
    users,
    references.ingredients,
    references.equipments,
    config,
  );

  logger.phase(4, "Recipe content");
  await seedContent(prisma, {
    recipes,
    discoverRecipes,
    ingredients: references.ingredients,
    units: references.units,
    config,
  });

  logger.phase(5, "Collections");
  await seedCollections(prisma, users, recipesByUser, config);
};
