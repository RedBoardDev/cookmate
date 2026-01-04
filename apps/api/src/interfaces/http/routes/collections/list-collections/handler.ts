import { listCollectionsSelect } from "@/infra/db/repositories/collection/list-collections";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import {
  combineWhere,
  parsePagination,
  parseSortParams,
  parseWhereParams,
} from "@/shared/lib/list-query";
import type { RouteHandler } from "@/shared/lib/route";
import { listCollectionsSortConfig } from "./order-by";
import { schemas } from "./schema";
import { selectConfig } from "./select";
import { listCollectionsWhereConfigs } from "./where";
import { countCollections } from "@/infra/db/repositories/collection/count-collections";

export const listCollectionsHandler: RouteHandler<typeof schemas> = async (
  ctx
) => {
  const { id: userId } = ctx.user;
  const pagination = parsePagination(ctx.query);
  const filters = parseWhereParams(ctx.query, listCollectionsWhereConfigs);
  const orderBy = parseSortParams(ctx.query, listCollectionsSortConfig);
  const where = combineWhere(
    { OR: [{ userId }, { members: { some: { userId } } }] },
    filters
  );

  const [collections, total] = await Promise.all([
    listCollectionsSelect(
      where,
      selectConfig.select,
      orderBy,
      pagination
    ),
    countCollections(where)
  ]);

  return {
    status: HttpStatus.OK,
    data: selectConfig.transform(collections),
    metadata: {
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: total,
      },
    },
  };
};
