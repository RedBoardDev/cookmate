import type { FastifyInstance } from "fastify";
import { createCollectionRoute } from "./create-collection";
import { deleteCollectionRoute } from "./delete-collection";
import { getCollectionRoute } from "./get-collection";
import { listCollectionsRoute } from "./list-collections";
import { membersRoutes } from "./members";

export async function collectionsRoutes(app: FastifyInstance) {
  await app.register(listCollectionsRoute);
  await app.register(getCollectionRoute);
  await app.register(createCollectionRoute);
  await app.register(deleteCollectionRoute);
  await app.register(membersRoutes, { prefix: "/:collectionId/members" });
}
