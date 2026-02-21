import { getCollectionSelect } from "@/infra/db/repositories/collection/get-collection";
import { HttpStatus } from "@/shared/enums/http-status.enum";
import type { RouteHandler } from "@/shared/lib/route";
import { getCollectionErrors } from "./errors";
import type { schemas } from "./schema";
import { selectConfig } from "./select";

export const getCollectionHandler: RouteHandler<typeof schemas> = async (ctx) => {
  const { collectionId } = ctx.params;
  const { id: userId } = ctx.user;

  const collection = await getCollectionSelect({ id: collectionId }, selectConfig.select);

  getCollectionErrors(collection, userId);

  return {
    status: HttpStatus.OK,
    data: selectConfig.transform(collection),
  };
};
