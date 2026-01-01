import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import { CollectionNotFoundError } from "@cookmate/domain/collection";
import type { CollectionSelectResult } from "./types";
import {
  collectionEntitySelect,
  toCollectionEntity,
} from "./collection-entity";

/**
 * GET
 */
const getCollectionSelectFn = async <TSelect extends Prisma.CollectionSelect>(
  where: Prisma.CollectionWhereUniqueInput,
  select: TSelect
): Promise<CollectionSelectResult<TSelect>> => {
  const collection = await getPrisma().collection.findUnique({ where, select });
  if (!collection) throw new CollectionNotFoundError(where.id);
  return collection;
};

export const getCollectionSelect = handleError(getCollectionSelectFn);

/**
 * GET ENTITY
 */
export const getCollectionEntity = async (
  where: Prisma.CollectionWhereUniqueInput,
) => {
  const collection = await getCollectionSelect(where, collectionEntitySelect);
  return toCollectionEntity(collection);
};

/**
 * FIND FIRST
 */
const findFirstCollectionFn = async <TSelect extends Prisma.CollectionSelect>(
  where: Prisma.CollectionWhereInput,
  select: TSelect
): Promise<CollectionSelectResult<TSelect> | null> => {
  return getPrisma().collection.findFirst({ where, select });
};

export const findFirstCollection = handleError(findFirstCollectionFn);
