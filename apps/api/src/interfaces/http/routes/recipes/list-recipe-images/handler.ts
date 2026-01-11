import { listRecipeImagesSelect } from "@/infra/db/repositories/recipe-image/list-recipe-images";
import { countRecipeImages } from "@/infra/db/repositories/recipe-image/count-recipe-images";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import {
  combineWhere,
  parsePagination,
  parseSortParams,
  parseWhereParams,
} from "@/shared/lib/list-query";
import type { RouteHandler } from "@/shared/lib/route";
import { listRecipeImagesSortConfig } from "./order-by";
import { schemas } from "./schema";
import { selectConfig } from "./select";
import { listRecipeImagesWhereConfigs } from "./where";
import { listRecipeImagesErrors } from "./errors";

export const listRecipeImagesHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { recipeId } = ctx.params;
  const { id: userId } = ctx.user;
  const pagination = parsePagination(ctx.query);
  const filters = parseWhereParams(ctx.query, listRecipeImagesWhereConfigs);
  const orderBy = parseSortParams(ctx.query, listRecipeImagesSortConfig);
  const where = combineWhere({ recipeId }, filters);

  await listRecipeImagesErrors(recipeId, userId);

  const [images, total] = await Promise.all([
    listRecipeImagesSelect(where, selectConfig.select, orderBy, pagination),
    countRecipeImages(where),
  ]);

  return {
    status: HttpStatus.OK,
    data: selectConfig.transform(images),
    metadata: {
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: total,
      },
    },
  };
};
