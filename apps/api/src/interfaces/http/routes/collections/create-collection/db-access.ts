import { CollectionEntity } from "@cookmate/domain/collection";
import type { z } from "zod";
import { CollectionVisibility } from "@/generated/prisma/enums";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { body as collectionBodySchema } from "./schema";
import { generateUniqueCollectionShortUrl } from "./short-url";

type CreateCollectionInput = z.infer<typeof collectionBodySchema> & {
  ownerId: string;
};

const createCollectionFn = async (input: CreateCollectionInput) => {
  const shortUrl = await generateUniqueCollectionShortUrl();
  const now = new Date();

  const collection = CollectionEntity.create({
    name: input.name,
    emoji: input.emoji,
    description: input.description ?? null,
    ownerId: input.ownerId,
    visibility: CollectionVisibility.PRIVATE,
    shortUrl,
    createdAt: now,
    updatedAt: now,
  });

  const result = await getPrisma().$transaction(async (tx) => {
    return await tx.collection.create({
      data: {
        name: collection.name,
        emoji: collection.emoji,
        description: collection.description ?? null,
        visibility: collection.visibility,
        shortUrl: collection.shortUrl ?? null,
        userId: collection.ownerId,
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt,
      },
      select: {
        id: true,
      },
    });
  });

  return { id: result.id };
};

export const createCollection = handleError(createCollectionFn);
