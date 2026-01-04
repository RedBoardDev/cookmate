import { listRecipesSelect } from "@/infra/db/repositories/recipe/list-recipes";
import { countRecipes } from "@/infra/db/repositories/recipe/count-recipes";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import {
  combineWhere,
  parsePagination,
  parseSortParams,
  parseWhereParams,
} from "@/shared/lib/list-query";
import type { RouteHandler } from "@/shared/lib/route";
import { listRecipesSortConfig } from "./order-by";
import { schemas } from "./schema";
import { selectConfig } from "./select";
import { listRecipesWhereConfigs } from "./where";

export const listRecipesHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { id: userId } = ctx.user;
  const pagination = parsePagination(ctx.query);
  const filters = parseWhereParams(ctx.query, listRecipesWhereConfigs);
  const orderBy = parseSortParams(ctx.query, listRecipesSortConfig);
  const where = combineWhere({ userId }, filters);

  const [recipes, total] = await Promise.all([
    listRecipesSelect(where, selectConfig.select, orderBy, pagination),
    countRecipes(where),
  ]);

  return {
    status: HttpStatus.OK,
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
