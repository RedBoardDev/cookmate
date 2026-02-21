import { collectionSchema, InvalidCollectionDataError } from "@cookmate/domain/collection";
import type { z } from "zod";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { body as collectionBodySchema } from "./schema";

type CreateCollectionInput = z.infer<typeof collectionBodySchema> & {
  ownerId: string;
};

const createCollectionFn = async (input: CreateCollectionInput) => {
  const now = new Date();

  const result = collectionSchema.safeParse({
    name: input.name,
    emoji: input.emoji,
    description: input.description ?? null,
    ownerId: input.ownerId,
    createdAt: now,
    updatedAt: now,
  });
  if (!result.success) throw new InvalidCollectionDataError();
  const collection = result.data;

  const dbResult = await getPrisma().collection.create({
    data: {
      name: collection.name,
      emoji: collection.emoji,
      description: collection.description,
      ownerId: collection.ownerId,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    },
    select: {
      id: true,
    },
  });

  return { id: dbResult.id };
};

export const createCollection = handleError(createCollectionFn);
