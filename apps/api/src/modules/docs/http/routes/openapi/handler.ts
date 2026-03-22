import type { FastifyRequest } from "fastify";
import { mergeOpenAPISchemas, type OpenAPISchema } from "@/interfaces/http/plugins/openapi";
import { normalizeNullableTypes } from "./normalize-nullable-types";

export async function openapiHandler(request: FastifyRequest) {
  const app = request.server;
  const baseSchema = app.swagger() as OpenAPISchema;

  try {
    const authSchema = await app.auth.api.generateOpenAPISchema();
    const merged = mergeOpenAPISchemas(baseSchema, authSchema as unknown as OpenAPISchema);
    normalizeNullableTypes(merged);
    return merged;
  } catch (error) {
    app.log.warn(error, "Failed to merge Better Auth OpenAPI schema");
    normalizeNullableTypes(baseSchema);
    return baseSchema;
  }
}
