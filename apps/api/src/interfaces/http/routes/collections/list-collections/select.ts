import type { Prisma } from "@/generated/prisma/client";
import type { SelectConfig } from "@/shared/types/select-config";
import { collectionSnapshotSchema } from "@cookmate/domain";
import { z } from "zod";

const select = {
  id: true,
  name: true,
  emoji: true,
  description: true,
  visibility: true,
  shortUrl: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.CollectionSelect;

type SelectResult = Prisma.CollectionGetPayload<{ select: typeof select }>[];

const responseSchema = z.array(collectionSnapshotSchema);

type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => {
  return data.map(({ userId, ...rest }) => ({ ...rest, ownerId: userId }));
};

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};
