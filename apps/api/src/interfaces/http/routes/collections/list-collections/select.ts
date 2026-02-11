import { collectionSnapshotSchema } from "@cookmate/domain";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import type { SelectConfig } from "@/shared/types/select-config";

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
  _count: {
    select: {
      recipes: true,
    },
  },
} satisfies Prisma.CollectionSelect;

type SelectResult = Prisma.CollectionGetPayload<{ select: typeof select }>[];

const responseSchema = z.array(
  collectionSnapshotSchema.extend({
    recipeCount: z.number(),
  }),
);

type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => {
  return data.map(({ userId, _count, ...rest }) => ({
    ...rest,
    ownerId: userId,
    recipeCount: _count.recipes,
  }));
};

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};
