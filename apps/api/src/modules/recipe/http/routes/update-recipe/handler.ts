import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeUpdateRecipe } from "../../../commands/update-recipe/execute";
import type { schemas } from "./schema";

export const updateRecipeHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeUpdateRecipe({
    ...ctx.params,
    ...ctx.body,
    userId: ctx.user.id,
  });

  return {
    status: HttpStatus.OK,
    data: result,
  };
};
