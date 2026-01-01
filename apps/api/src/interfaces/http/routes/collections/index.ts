import type { FastifyInstance } from "fastify";
import { membersRoutes } from "./members";

export async function collectionsRoutes(app: FastifyInstance) {
  await app.register(membersRoutes, { prefix: "/:collectionId/members" });
}
