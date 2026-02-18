import { collectionMemberPropsSchema, InvalidCollectionMemberDataError } from "@cookmate/domain/collection";
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

  const result = collectionMemberPropsSchema.safeParse({
    collectionId: input.collectionId,
    userId: input.userId,
    email: input.email,
    avatar: input.avatar,
    joinedAt,
  });
  if (!result.success) throw new InvalidCollectionMemberDataError();
  const member = result.data;

  const dbResult = await getPrisma().collectionMember.create({
    data: {
      collectionId: member.collectionId,
      userId: member.userId,
      joinedAt: member.joinedAt,
    },
    select: {
      id: true,
    },
  });

  return { id: dbResult.id };
};

export const addCollectionMember = handleError(addCollectionMemberFn);
