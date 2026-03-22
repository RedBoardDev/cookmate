import { combineWhere, parsePagination, parseSortParams, parseWhereParams } from "@/shared/lib/list-query";
import { handleError } from "@/shared/utils/handle-error";
import { countRecipes, listRecipesSelect } from "../../infra/prisma/recipe-reader";
import { listRecipesSortConfig } from "../../http/routes/list-recipes/order-by";
import { selectConfig } from "../../http/routes/list-recipes/select";
import { listRecipesWhereConfigs } from "../../http/routes/list-recipes/where";
import type { ListRecipesQuery } from "../../http/routes/list-recipes/schema";

export interface ListRecipesQueryInput {
  userId: string;
  query: ListRecipesQuery;
}

export type ListRecipesResult = {
  data: ReturnType<typeof selectConfig.transform>;
  metadata: {
    pagination: {
      page: number;
      pageSize: number;
      totalItems: number;
    };
  };
};

const executeListRecipesFn = async (input: ListRecipesQueryInput): Promise<ListRecipesResult> => {
  const pagination = parsePagination(input.query);
  const filters = parseWhereParams(input.query, listRecipesWhereConfigs);
  const orderBy = parseSortParams(input.query, listRecipesSortConfig);
  const where = combineWhere({ userId: input.userId }, filters);

  const [recipes, total] = await Promise.all([
    listRecipesSelect(where, selectConfig.select, orderBy, pagination),
    countRecipes(where),
  ]);

  return {
    data: selectConfig.transform(recipes),
    metadata: {
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: total,
      },
    },
  };
};

export const executeListRecipes = handleError(executeListRecipesFn);
