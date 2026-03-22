import { collectionSchema } from "@cookmate/domain";
import type { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";

const select = {
  id: true,
  name: true,
  emoji: true,
  description: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CollectionSelect;

export type SelectResult = Prisma.CollectionGetPayload<{ select: typeof select }>;

export const responseSchema = collectionSchema;

export type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => data;

export const selectConfig = {
  select,
  schema: responseSchema,
  transform,
};
