import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeCreateCollection } from "../../../commands/create-collection/execute";
import type { schemas } from "./schema";

export const createCollectionHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeCreateCollection({
    ...ctx.body,
    ownerId: ctx.user.id,
  });

  return {
    status: HttpStatus.Created,
    data: result,
  };
};
