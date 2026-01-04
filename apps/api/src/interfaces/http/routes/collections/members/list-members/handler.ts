import type { RouteHandler } from "@/shared/lib/route";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import { listCollectionMembersSelect } from "@/infra/db/repositories/collection-member/list-collection-members";
import {
  combineWhere,
  parsePagination,
  parseSortParams,
  parseWhereParams,
} from "@/shared/lib/list-query";
import { schemas } from "./schema";
import { selectConfig } from "./select";
import { listMembersErrors } from "./errors";
import { listMembersWhereConfigs } from "./where";
import { listMembersSortConfig } from "./order-by";
import { countCollectionMembers } from "@/infra/db/repositories/collection-member/count-collection-members";

export const listMembersHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;
  const pagination = parsePagination(ctx.query);
  const filters = parseWhereParams(ctx.query, listMembersWhereConfigs);
  const orderBy = parseSortParams(ctx.query, listMembersSortConfig);
  const where = combineWhere({ collectionId }, filters);

  await listMembersErrors(collectionId, userId);

  const [members, total] = await Promise.all([
    listCollectionMembersSelect(
    where,
    selectConfig.select,
    orderBy,
    pagination
  ),
  countCollectionMembers(where)
  ]);

  return {
    status: HttpStatus.OK,
    data: selectConfig.transform(members),
    metadata: {
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        totalItems: total,
      },
    },
  };
};
