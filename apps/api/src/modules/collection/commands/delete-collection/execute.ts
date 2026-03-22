import { CollectionPolicies } from "@cookmate/domain/collection";
import { handleError } from "@/shared/utils/handle-error";
import { collectionReader } from "../../infra/prisma/collection-reader";
import { collectionWriter } from "../../infra/prisma/collection-writer";
import type { DeleteCollectionCommand } from "./contract";

const deleteCollectionExecuteFn = async (input: DeleteCollectionCommand): Promise<void> => {
  const collection = await collectionReader.getById({ id: input.collectionId }, { ownerId: true });

  CollectionPolicies.assertOwner(collection.ownerId, input.userId);

  await collectionWriter.delete(input.collectionId);
};

export const executeDeleteCollection = handleError(deleteCollectionExecuteFn);
