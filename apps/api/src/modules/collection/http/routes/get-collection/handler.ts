import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeGetCollection } from "../../../queries/get-collection/execute";
import type { schemas } from "./schema";

export const getCollectionHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeGetCollection({
    collectionId: ctx.params.collectionId,
    userId: ctx.user.id,
  });

  return {
    status: HttpStatus.OK,
    data: result,
  };
};
