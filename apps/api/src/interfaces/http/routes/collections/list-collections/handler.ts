import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { listCollectionsEntity } from "@/infra/db/repositories/collection/list-collections";
import { schemas } from "./schema";

export const listCollectionsHandler: RouteHandler<typeof schemas> = async (
  ctx
) => {
  const { id: userId } = ctx.user;

  const collections = await listCollectionsEntity({
    OR: [{ userId }, { members: { some: { userId } } }],
  });

  return {
    status: HttpStatus.OK,
    data: collections.map((collection) => collection.toSnapshot()),
  };
};
