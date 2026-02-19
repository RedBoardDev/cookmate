import "dotenv/config";
import { buildApp } from "@/app";
import { loadEnv } from "@/config/env";

async function main() {
  const env = loadEnv();

  const app = buildApp(env);

  const shutdown = async (signal: string) => {
    app.log.info({ signal }, "Received shutdown signal, closing server...");
    await app.close();
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
