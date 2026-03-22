import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { executeListRecipes } from "../../../queries/list-recipes/execute";
import type { schemas } from "./schema";

export const listRecipesHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const result = await executeListRecipes({ query: ctx.query, userId: ctx.user.id });

  return {
    status: HttpStatus.OK,
    data: result.data,
    metadata: result.metadata,
  };
};
