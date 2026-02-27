import "dotenv/config";
import { buildApp } from "@/app";
import { loadEnv } from "@/config/env";
import { S3Service } from "@/infra/services/s3-service";

async function main() {
  const env = loadEnv();

  const app = buildApp(env);

  const s3Service = S3Service.getInstance(env);
  try {
    await s3Service.checkConnection();
    app.log.info("S3 bucket connection OK");
  } catch (err) {
    app.log.error({ err }, "S3 connection check failed");
    process.exit(1);
  }

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
