import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { createCollection } from "./db-access";
import { createCollectionErrors } from "./errors";
import { schemas } from "./schema";

export const createCollectionHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { id: userId } = ctx.user;

  await createCollectionErrors(userId);

  const collection = await createCollection({
    ...ctx.body,
    ownerId: userId,
  });

  return {
    status: HttpStatus.Created,
    data: collection.toSnapshot(),
  };
};
