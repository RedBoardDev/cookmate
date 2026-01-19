import "dotenv/config";
import { buildApp } from "@/app";
import { loadEnv } from "@/config/env";
import { parsingQueueService } from "@/infra/queue/parsing-queue.service";
import { parsingOrchestrator } from "@/infra/services/parser/parsing-orchestrator.service";
import { startParsingWorker } from "@/infra/queue/parsing-worker";

async function main() {
  const env = loadEnv();

  await parsingQueueService.initialize(env.DATABASE_URL);

  const boss = parsingQueueService.getBoss();
  startParsingWorker(boss, parsingQueueService.getQueueName(), parsingOrchestrator);

  const app = buildApp(env);

  const shutdown = async (signal: string) => {
    app.log.info({ signal }, "Received shutdown signal, closing server...");
    await app.close();
    await parsingQueueService.stop();
    process.exit(0);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  await app.listen({ port: env.PORT, host: env.HOST });
  app.log.info({ port: env.PORT, host: env.HOST }, "API server running");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
