import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeListCollections } from "../../../queries/list-collections/execute";
import type { schemas } from "./schema";

export const listCollectionsHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeListCollections({
    userId: ctx.user.id,
    query: ctx.query,
  });

  return {
    status: HttpStatus.OK,
    data: result.data,
    metadata: result.metadata,
  };
};
