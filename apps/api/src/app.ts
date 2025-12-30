import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import type { AppEnv } from "@/config/env";
import {
  buildLogger,
  registerSensible,
  registerHelmet,
  registerCors,
  registerRateLimit,
  registerSwagger,
  // registerAuth,
} from "@/interfaces/http/plugins/index";
import { registerRoutes } from "@/interfaces/http/routes/index";
import { errorHandler } from "@/interfaces/http/errors/index";
import { closePrisma } from "@/infra/db/prisma";
// import { createAuthService } from "@/infra/services/auth-service";

export function buildApp(env: AppEnv) {
  const app = Fastify({
    logger: buildLogger(env),
  }).withTypeProvider<ZodTypeProvider>();

  // Set Zod validators
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Core plugins
  void app.register(registerSensible);
  void app.register(registerHelmet);
  void app.register(registerCors, { origins: env.CORS_ORIGINS });
  void app.register(registerRateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
  });
  void app.register(registerSwagger, { enabled: env.SWAGGER_ENABLED });

  // Authentication
  // const auth = createAuthService(env);
  // void app.register(registerAuth, { auth });

  // Routes
  void app.register(registerRoutes);

  // Global error handler
  app.setErrorHandler(errorHandler);

  // Graceful shutdown - close database connections
  app.addHook("onClose", async () => {
    await closePrisma();
  });

  return app;
}
