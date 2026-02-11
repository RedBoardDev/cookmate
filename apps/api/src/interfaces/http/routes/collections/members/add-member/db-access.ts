import { CollectionMemberEntity } from "@cookmate/domain/collection";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";

interface CreateMemberInput {
  collectionId: string;
  userId: string;
  email: string;
  avatar: string;
}

const addCollectionMemberFn = async (input: CreateMemberInput) => {
  const joinedAt = new Date();

  const member = CollectionMemberEntity.create({
    collectionId: input.collectionId,
    userId: input.userId,
    email: input.email,
    avatar: input.avatar,
    joinedAt,
  });

  const result = await getPrisma().collectionMember.create({
    data: {
      collectionId: member.collectionId,
      userId: member.userId,
      joinedAt: member.joinedAt,
    },
    select: {
      id: true,
    },
  });

  return { id: result.id };
};

export const addCollectionMember = handleError(addCollectionMemberFn);
