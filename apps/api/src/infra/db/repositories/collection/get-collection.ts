import { CollectionNotFoundError } from "@cookmate/domain/collection";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { CollectionSelectResult } from "./types";

/**
 * GET
 */
const getCollectionSelectFn = async <TSelect extends Prisma.CollectionSelect>(
  where: Prisma.CollectionWhereUniqueInput,
  select: TSelect,
): Promise<CollectionSelectResult<TSelect>> => {
  const collection = await getPrisma().collection.findUnique({ where, select });
  if (!collection) throw new CollectionNotFoundError(where.id);
  return collection;
};

export const getCollectionSelect = handleError(getCollectionSelectFn);

/**
 * FIND FIRST
 */
const findFirstCollectionFn = async <TSelect extends Prisma.CollectionSelect>(
  where: Prisma.CollectionWhereInput,
  select: TSelect,
): Promise<CollectionSelectResult<TSelect> | null> => {
  return getPrisma().collection.findFirst({ where, select });
};

export const findFirstCollection = handleError(findFirstCollectionFn);
