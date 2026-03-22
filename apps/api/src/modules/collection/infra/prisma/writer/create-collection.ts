import { collectionInsertSchema, InvalidCollectionDataError } from "@cookmate/domain/collection";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { CollectionWriteInput } from "./types";

const createFn = async (input: CollectionWriteInput) => {
  const parsed = collectionInsertSchema.safeParse(input);
  if (!parsed.success) {
    throw new InvalidCollectionDataError();
  }

  const row = await getPrisma().collection.create({
    data: {
      name: parsed.data.name,
      emoji: parsed.data.emoji,
      description: parsed.data.description,
      ownerId: parsed.data.ownerId,
    },
    select: { id: true },
  });

  return { id: row.id };
};

export const create = handleError(createFn);
