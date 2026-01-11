import type { FastifyRequest } from "fastify";
import {
  mergeOpenAPISchemas,
  type OpenAPISchema,
} from "@/interfaces/http/plugins/openapi";

const normalizeNullableTypes = (schema: unknown): void => {
  if (!schema || typeof schema !== "object") {
    return;
  }

  if (Array.isArray(schema)) {
    schema.forEach(normalizeNullableTypes);
    return;
  }

  const record = schema as Record<string, unknown>;
  const type = record.type;

  if (Array.isArray(type) && type.includes("null")) {
    const nonNullTypes = type.filter((item) => item !== "null");
    if (nonNullTypes.length === 1) {
      record.type = nonNullTypes[0];
      record.nullable = true;
    }
  }

  Object.values(record).forEach(normalizeNullableTypes);
};

export async function openapiHandler(request: FastifyRequest) {
  const app = request.server;
  const baseSchema = app.swagger() as OpenAPISchema;

  try {
    const authSchema = await app.auth.api.generateOpenAPISchema();
    const merged = mergeOpenAPISchemas(
      baseSchema,
      authSchema as unknown as OpenAPISchema
    );
    // Normalize nullable unions for Kubb compatibility.
    normalizeNullableTypes(merged);
    return merged;
  } catch (error) {
    app.log.warn(error, "Failed to merge Better Auth OpenAPI schema");
    normalizeNullableTypes(baseSchema);
    return baseSchema;
  }
}
