import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { CollectionMemberEntity } from "@cookmate/domain/collection";

interface CreateMemberInput {
  collectionId: string;
  userId: string;
}

const createCollectionMemberFn = async (input: CreateMemberInput) => {
  const joinedAt = new Date();

  const member = CollectionMemberEntity.create(
    {
      collectionId: input.collectionId,
      userId: input.userId,
      joinedAt
    },
  );

  await getPrisma().collectionMember.create({
    data: {
      collectionId: member.collectionId,
      userId: member.userId,
      joinedAt: member.joinedAt,
    },
  });

  return member;
};

export const createCollectionMember = handleError(createCollectionMemberFn);
