import type { OpenAPIPaths, OpenAPISchema } from "./types";

export function transformAuthPaths(
  paths: OpenAPIPaths,
  prefix: string
): OpenAPIPaths {
  const transformed: OpenAPIPaths = {};

  for (const [path, methods] of Object.entries(paths)) {
    const transformedMethods: Record<string, unknown> = {};

    for (const [method, operation] of Object.entries(
      methods as Record<string, unknown>
    )) {
      if (typeof operation === "object" && operation !== null) {
        const op = operation as Record<string, unknown>;
        // Replace "Default" tag with "Auth"
        if (Array.isArray(op.tags)) {
          op.tags = op.tags.map((tag: string) =>
            tag === "Default" ? "Auth" : tag
          );
        }
        transformedMethods[method] = op;
      } else {
        transformedMethods[method] = operation;
      }
    }

    transformed[`${prefix}${path}`] = transformedMethods;
  }

  return transformed;
}

/**
 * Merge Better Auth OpenAPI schema into the main schema.
 */
export function mergeOpenAPISchemas(
  base: OpenAPISchema,
  auth: OpenAPISchema
): OpenAPISchema {
  const merged = { ...base };

  // Merge paths with /api/auth prefix and transform tags
  if (auth.paths) {
    merged.paths = {
      ...merged.paths,
      ...transformAuthPaths(auth.paths, "/api/auth"),
    };
  }

  // Merge component schemas
  if (auth.components?.schemas) {
    merged.components = merged.components || {};
    merged.components.schemas = {
      ...merged.components.schemas,
      ...auth.components.schemas,
    };
  }

  // Add Auth tag definition if not present
  merged.tags = merged.tags || [];
  if (!merged.tags.some((t) => t.name === "Auth")) {
    merged.tags.push({ name: "Auth", description: "Authentication endpoints" });
  }

  return merged;
}
