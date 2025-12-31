import type { FastifyInstance } from "fastify";
import { openapiRoute } from "./openapi";

export async function docsRoutes(app: FastifyInstance) {
  await app.register(openapiRoute);
}
