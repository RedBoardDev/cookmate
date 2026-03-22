import { RecipePolicies } from "@cookmate/domain/recipe";
import { combineWhere, parsePagination, parseSortParams, parseWhereParams } from "@/shared/lib/list-query";
import { handleError } from "@/shared/utils/handle-error";
import { listRecipeImagesSortConfig } from "../../http/routes/list-recipe-images/order-by";
import type {
  ListRecipeImagesParams,
  ListRecipeImagesQuery,
  ListRecipeImagesResult,
} from "../../http/routes/list-recipe-images/schema";
import { selectConfig } from "../../http/routes/list-recipe-images/select";
import { listRecipeImagesWhereConfigs } from "../../http/routes/list-recipe-images/where";
import { recipeImageReader } from "../../infra/prisma/recipe-image-reader";
import { recipeReader } from "../../infra/prisma/recipe-reader";

export interface ListRecipeImagesInput {
  readonly params: ListRecipeImagesParams;
  readonly query: ListRecipeImagesQuery;
  readonly userId: string;
}

type ListRecipeImagesQueryResult = {
  readonly data: ListRecipeImagesResult;
  readonly metadata: {
    readonly pagination: {
      readonly page: number;
      readonly pageSize: number;
      readonly totalItems: number;
    };
  };
};

const executeListRecipeImagesFn = async (input: ListRecipeImagesInput): Promise<ListRecipeImagesQueryResult> => {
  const recipe = await recipeReader.getById({ id: input.params.recipeId }, { id: true, userId: true });
  RecipePolicies.assertCanView(recipe.userId, input.userId);

  const pagination = parsePagination(input.query);
  const filters = parseWhereParams(input.query, listRecipeImagesWhereConfigs);
  const orderBy = parseSortParams(input.query, listRecipeImagesSortConfig);
  const where = combineWhere({ recipeId: input.params.recipeId }, filters);

  const [images, total] = await Promise.all([
    recipeImageReader.list(where, selectConfig.select, orderBy, pagination),
    recipeImageReader.count(where),
  ]);

  return {
    data: await selectConfig.transform(images),
    metadata: {
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: total,
      },
    },
  };
};

export const executeListRecipeImages = handleError(executeListRecipeImagesFn);
