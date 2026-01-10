import "dotenv/config";
import { loadEnv } from "../../src/config/env";
import { getPrisma, closePrisma } from "../../src/infra/db/prisma";
import { createAuthService } from "../../src/infra/services/auth-service";
import { getSeedHelp, parseSeedConfig } from "./config";
import { cleanDatabase } from "./lib/cleaner";
import { logger } from "./lib/logger";
import { seedDatabase } from "./seeders";

async function main() {
  const { config, showHelp } = parseSeedConfig(process.argv.slice(2));
  if (showHelp) {
    console.log(getSeedHelp());
    return;
  }

  const env = loadEnv();
  const prisma = getPrisma();
  const auth = createAuthService(env);

  try {
    if (config.clean) {
      await cleanDatabase(prisma);
    }

    await seedDatabase({ prisma, auth, config });
    logger.success("Seeding complete");
  } finally {
    await closePrisma();
  }
}

main().catch((error) => {
  logger.error(
    `Seed failed: ${error instanceof Error ? error.message : error}`
  );
  process.exit(1);
});
