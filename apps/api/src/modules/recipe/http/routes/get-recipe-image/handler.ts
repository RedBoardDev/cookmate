import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeGetRecipeImage } from "../../../queries/get-recipe-image/execute";
import type { schemas } from "./schema";

export const getRecipeImageHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeGetRecipeImage({
    ...ctx.params,
    userId: ctx.user.id,
  });

  return {
    status: HttpStatus.OK,
    data: result,
  };
};
