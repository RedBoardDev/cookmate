import "dotenv/config";
import { buildApp } from "@/app";
import { loadEnv } from "@/config/env";

async function main() {
  const env = loadEnv();
  const app = buildApp(env);

  await app.listen({ port: env.PORT, host: env.HOST });
  app.log.info({ port: env.PORT, host: env.HOST }, "API server running");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
