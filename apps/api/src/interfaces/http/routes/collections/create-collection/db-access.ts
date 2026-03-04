import { collectionInsertSchema, InvalidCollectionDataError } from "@cookmate/domain/collection";
import type { z } from "zod";
import { getPrisma } from "@/infra/db/prisma";
import { handleError } from "@/shared/utils/handle-error";
import type { body as bodySchema } from "./schema";

type CreateCollectionInput = z.infer<typeof bodySchema> & {
  ownerId: string;
};

const createCollectionFn = async (input: CreateCollectionInput) => {
  const parsed = collectionInsertSchema.safeParse({
    name: input.name,
    emoji: input.emoji,
    description: input.description ?? null,
    ownerId: input.ownerId,
  });

  if (!parsed.success) {
    throw new InvalidCollectionDataError();
  }

  const data = parsed.data;

  const row = await getPrisma().collection.create({
    data: {
      name: data.name,
      emoji: data.emoji,
      description: data.description,
      ownerId: data.ownerId,
    },
    select: { id: true },
  });

  return { id: row.id };
};

export const createCollection = handleError(createCollectionFn);
