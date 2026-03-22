import { CollectionPolicies } from "@cookmate/domain/collection";
import { handleError } from "@/shared/utils/handle-error";
import { selectConfig } from "../../http/routes/get-collection/select";
import { collectionReader } from "../../infra/prisma/collection-reader";

export interface GetCollectionQueryInput {
  collectionId: string;
  userId: string;
}

const executeGetCollectionFn = async (input: GetCollectionQueryInput) => {
  const collection = await collectionReader.getById({ id: input.collectionId }, selectConfig.select);

  CollectionPolicies.assertOwner(collection.ownerId, input.userId);

  return selectConfig.transform(collection);
};

export const executeGetCollection = handleError(executeGetCollectionFn);
