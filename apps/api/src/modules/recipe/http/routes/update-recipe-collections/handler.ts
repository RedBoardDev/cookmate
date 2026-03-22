import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeUpdateRecipeCollections } from "../../../commands/update-recipe-collections/execute";
import type { schemas } from "./schema";

export const updateRecipeCollectionsHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeUpdateRecipeCollections({
    ...ctx.params,
    ...ctx.body,
    userId: ctx.user.id,
  });

  return {
    status: HttpStatus.OK,
    data: result,
  };
};
