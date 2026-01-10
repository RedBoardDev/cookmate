import type { PrismaClient } from "../../../src/generated/prisma/client";
import { logger } from "./logger";

// Tables in reverse dependency order (children first)
const TABLES_TO_TRUNCATE = [
  // Phase 5: Collections
  "collection_members",
  "collections",
  // Phase 4: Recipe content
  "instructions",
  "recipe_ingredients",
  "recipe_images",
  // Phase 3: Recipes
  "recipes",
  "discover_recipes",
  // Phase 2: Auth (keep users for now, but clear sessions/accounts)
  "accounts",
  "sessions",
  "verifications",
  "users",
  // Phase 1: Reference tables
  "equipments",
  "units",
  "ingredients",
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
