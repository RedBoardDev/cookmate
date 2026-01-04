import type { Prisma } from "@/generated/prisma/client";
import type { SelectConfig } from "@/shared/types/select-config";
import { collectionMemberSnapshotSchema } from "@cookmate/domain";
import { z } from "zod";

const select = {
  id: true,
  collectionId: true,
  userId: true,
  joinedAt: true,
} satisfies Prisma.CollectionMemberSelect;

type SelectResult = Prisma.CollectionMemberGetPayload<{ select: typeof select }>[];

const responseSchema = z.array(collectionMemberSnapshotSchema);

type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto => data;

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};

export type { SelectResult, ResponseDto };
