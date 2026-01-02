import { getPrisma } from "@/infra/db/prisma";
import { findFirstCollectionMember } from "@/infra/db/repositories/collection-member/get-collection-member";
import { handleError } from "@/shared/utils/handle-error";
import { MemberNotFoundError } from "@cookmate/domain/collection";

interface DeleteMemberInput {
  collectionId: string;
  userId: string;
}

const deleteCollectionMemberFn = async (input: DeleteMemberInput) => {
  const member = await findFirstCollectionMember(
    { collectionId: input.collectionId, userId: input.userId },
    { id: true },
  );

  if (!member) throw new MemberNotFoundError();

  await getPrisma().collectionMember.delete({
    where: { id: member.id },
  });
};

export const deleteCollectionMember = handleError(deleteCollectionMemberFn);
