import { getRecipeImageSelect } from "@/infra/db/repositories/recipe-image/get-recipe-image";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { schemas } from "./schema";
import { selectConfig } from "./select";
import { getRecipeImageErrors } from "./errors";

export const getRecipeImageHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { imageId } = ctx.params;
  const { id: userId } = ctx.user;

  const recipeImage = await getRecipeImageSelect({ id: imageId }, selectConfig.select);

  await getRecipeImageErrors(recipeImage, userId, imageId);

  return {
    status: HttpStatus.OK,
    data: selectConfig.transform(recipeImage),
  };
};
