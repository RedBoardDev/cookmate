import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import type { AppEnv } from "@/config/env";
import {
  buildLogger,
  registerHelmet,
  registerCors,
  registerRateLimit,
  registerSwagger,
  registerAuth,
} from "@/interfaces/http/plugins/index";
import { registerRoutes } from "@/interfaces/http/routes/index";
import { closePrisma } from "@/infra/db/prisma";
import { errorHandler } from "@/interfaces/http/errors/error-handler";
import { createAuthService } from "@/infra/services/auth-service";

export function buildApp(env: AppEnv) {
  const app = Fastify({
    logger: buildLogger(env),
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  void app.register(registerHelmet);
  void app.register(registerCors, { origins: env.CORS_ORIGINS });
  void app.register(registerRateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW,
  });

  // before swagger, as swagger depends on auth for OpenAPI merge
  const auth = createAuthService(env);
  void app.register(registerAuth, { auth });

  void app.register(registerSwagger, { enabled: env.SWAGGER_ENABLED });

  void app.register(registerRoutes);

  app.setErrorHandler(errorHandler);

  app.addHook("onClose", async () => {
    await closePrisma();
  });

  return app;
}
