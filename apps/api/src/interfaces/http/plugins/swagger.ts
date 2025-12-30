import swagger from "@fastify/swagger";
import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export interface SwaggerOptions {
  enabled?: boolean;
}

const swaggerPlugin: FastifyPluginAsync<SwaggerOptions> = async (app, opts) => {
  if (opts.enabled === false) return;

  await app.register(swagger, {
    openapi: {
      info: {
        title: "Cookmate API",
        version: "0.1.0",
        description: "Recipe management API",
      },
      servers: [
        {
          url: "http://localhost:3001",
          description: "Development server",
        },
      ],
    },
    transform: jsonSchemaTransform,
  });

  // Expose OpenAPI JSON at /docs/json
  app.get("/docs/json", { schema: { hide: true } }, () => {
    return app.swagger();
  });
};

export const registerSwagger = fp(swaggerPlugin, { name: "swagger" });
