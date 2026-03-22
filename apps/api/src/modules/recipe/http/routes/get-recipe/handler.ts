import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeGetRecipe } from "../../../queries/get-recipe/execute";
import type { schemas } from "./schema";

export const getRecipeHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeGetRecipe({
    ...ctx.params,
    userId: ctx.user.id,
  });

  return {
    status: HttpStatus.OK,
    data: result,
  };
};
