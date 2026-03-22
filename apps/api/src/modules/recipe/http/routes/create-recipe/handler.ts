import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeCreateRecipe } from "../../../commands/create-recipe/execute";
import type { schemas } from "./schema";

export const createRecipeHandler: RouteHandler<typeof schemas> = async (ctx) => {
  return {
    status: HttpStatus.Created,
    data: await executeCreateRecipe({
      ...ctx.body,
      userId: ctx.user.id,
    }),
  };
};
