import type { PrismaClient } from "../../../src/generated/prisma/client";
import { logger } from "./logger";

const TABLES_TO_TRUNCATE = [
  "_CollectionToRecipe",
  "collections",
  "recipe_instructions",
  "recipe_ingredients",
  "recipe_images",
  "recipes",
  "accounts",
  "sessions",
  "verifications",
  "users",
];

export async function cleanDatabase(prisma: PrismaClient): Promise<void> {
  logger.info("Cleaning database...");

  for (const table of TABLES_TO_TRUNCATE) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
      logger.debug(`  Truncated ${table}`);
    } catch (error) {
      logger.warn(`  Could not truncate ${table}: ${error}`);
    }
  }

  logger.success("Database cleaned");
}
