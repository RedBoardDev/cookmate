import type { FastifyRequest } from "fastify";
import {
  mergeOpenAPISchemas,
  type OpenAPISchema,
} from "@/interfaces/http/plugins/openapi";

export async function openapiHandler(request: FastifyRequest) {
  const app = request.server;
  const baseSchema = app.swagger() as OpenAPISchema;

  try {
    const authSchema = await app.auth.api.generateOpenAPISchema();
    return mergeOpenAPISchemas(
      baseSchema,
      authSchema as unknown as OpenAPISchema
    );
  } catch (error) {
    app.log.warn(error, "Failed to merge Better Auth OpenAPI schema");
    return baseSchema;
  }
}
