import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeListRecipeImages } from "../../../queries/list-recipe-images/execute";
import type { schemas } from "./schema";

export const listRecipeImagesHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeListRecipeImages({
    params: ctx.params,
    query: ctx.query,
    userId: ctx.user.id,
  });

  return {
    status: HttpStatus.OK,
    data: result.data,
    metadata: result.metadata,
  };
};
