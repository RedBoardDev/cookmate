import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";
import { CannotAddMemberError, MemberAlreadyExistsError } from "@cookmate/domain/collection";
import type { CollectionSelectResult } from "@/infra/db/repositories/collection/types";
import type { Prisma } from "@/generated/prisma/client";

export const selectError = {
  id: true, userId: true
} satisfies Prisma.CollectionSelect;
export type SelectError = CollectionSelectResult<typeof selectError>;

export const addMemberErrors = async (
  collection: SelectError,
  userToAddId: string
): Promise<void> => {
  if (collection.userId === userToAddId) throw new CannotAddMemberError();
  const existingMember = await findFirstCollectionMember(
    { collectionId: collection.id, userId: userToAddId },
    { id: true }
  );
  if (existingMember) throw new MemberAlreadyExistsError();
};
