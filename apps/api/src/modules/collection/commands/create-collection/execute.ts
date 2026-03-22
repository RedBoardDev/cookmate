import { UserPolicies } from "@cookmate/domain/user";
import { handleError } from "@/shared/utils/handle-error";
import { collectionReader } from "../../infra/prisma/collection-reader";
import { collectionWriter } from "../../infra/prisma/collection-writer";
import type { CreateCollectionCommand, CreateCollectionResult } from "./contract";

const executeCreateCollectionFn = async (input: CreateCollectionCommand): Promise<CreateCollectionResult> => {
  const totalCollections = await collectionReader.countByOwnerId(input.ownerId);
  UserPolicies.assertReachMaxCollections(totalCollections);

  return collectionWriter.create(input);
};

export const executeCreateCollection = handleError(executeCreateCollectionFn);
