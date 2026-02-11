import swagger from "@fastify/swagger";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

export interface SwaggerOptions {
  enabled?: boolean;
}

const swaggerPlugin: FastifyPluginAsync<SwaggerOptions> = async (app, opts) => {
  if (opts.enabled === false) return;

  await app.register(swagger, {
    openapi: {
      openapi: "3.1.1",
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
};

export const registerSwagger = fp(swaggerPlugin, {
  name: "swagger",
  dependencies: ["auth"],
});
