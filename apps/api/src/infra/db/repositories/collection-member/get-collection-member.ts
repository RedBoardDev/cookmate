import { MemberNotFoundError } from "@cookmate/domain/collection";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { CollectionMemberSelectResult } from "./types";

/**
 * GET
 */
const getCollectionMemberSelectFn = async <TSelect extends Prisma.CollectionMemberSelect>(
  where: Prisma.CollectionMemberWhereUniqueInput,
  select: TSelect,
): Promise<CollectionMemberSelectResult<TSelect>> => {
  const collectionMember = await getPrisma().collectionMember.findUnique({ where, select });
  if (!collectionMember) throw new MemberNotFoundError();
  return collectionMember;
};

export const getCollectionMemberSelect = handleError(getCollectionMemberSelectFn);

/**
 * FIND FIRST
 */
const findFirstCollectionMemberFn = async <TSelect extends Prisma.CollectionMemberSelect>(
  where: Prisma.CollectionMemberWhereInput,
  select: TSelect,
): Promise<CollectionMemberSelectResult<TSelect> | null> => {
  return getPrisma().collectionMember.findFirst({ where, select });
};

export const findFirstCollectionMember = handleError(findFirstCollectionMemberFn);
