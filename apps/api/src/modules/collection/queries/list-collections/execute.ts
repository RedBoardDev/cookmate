import { HttpStatus } from "@/shared/enums/http-status.enum";
import { combineWhere, parsePagination, parseSortParams, parseWhereParams } from "@/shared/lib/list-query";
import { handleError } from "@/shared/utils/handle-error";
import { listCollectionsSortConfig } from "../../http/routes/list-collections/order-by";
import type { ListCollectionsQuery } from "../../http/routes/list-collections/schema";
import { selectConfig } from "../../http/routes/list-collections/select";
import { listCollectionsWhereConfigs } from "../../http/routes/list-collections/where";
import { collectionReader } from "../../infra/prisma/collection-reader";

export interface ListCollectionsQueryInput {
  userId: string;
  query: ListCollectionsQuery;
}

const executeListCollectionsFn = async (input: ListCollectionsQueryInput) => {
  const pagination = parsePagination(input.query);
  const filters = parseWhereParams(input.query, listCollectionsWhereConfigs);
  const orderBy = parseSortParams(input.query, listCollectionsSortConfig);
  const where = combineWhere({ ownerId: input.userId }, filters);

  const [collections, total] = await Promise.all([
    collectionReader.list(where, selectConfig.select, orderBy, pagination),
    collectionReader.count(where),
  ]);

  return {
    status: HttpStatus.OK as const,
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

export const executeListCollections = handleError(executeListCollectionsFn);
