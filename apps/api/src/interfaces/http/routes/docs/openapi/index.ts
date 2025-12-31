import type { FastifyInstance } from "fastify";
import { openapiHandler } from "./handler";

export async function openapiRoute(app: FastifyInstance) {
  app.get("/openapi", {
    schema: {
      tags: ["Documentation"],
      summary: "OpenAPI specification",
      description: "Get the OpenAPI specification for the API",
      hide: false
    }
  }, openapiHandler);
}
