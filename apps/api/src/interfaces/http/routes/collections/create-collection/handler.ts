import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { createCollection } from "./db-access";
import { createCollectionErrors } from "./errors";
import type { schemas } from "./schema";

export const createCollectionHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { id: userId } = ctx.user;

  await createCollectionErrors(userId);

  const result = await createCollection({
    name: ctx.body.name,
    emoji: ctx.body.emoji,
    description: ctx.body.description ?? null,
    ownerId: userId,
  });

  return {
    status: HttpStatus.Created,
    data: result,
  };
};
