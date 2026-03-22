import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeGetRecipeIdByShortUrl } from "../../../queries/get-recipe-id-by-short-url/execute";
import type { schemas } from "./schema";

export const getRecipeIdByShortUrlHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeGetRecipeIdByShortUrl({
    ...ctx.params,
    userId: ctx.user.id,
  });

  return {
    status: HttpStatus.OK,
    data: result,
  };
};
