import type { Prisma } from "@/generated/prisma/client";
import type { SelectConfig } from "@/shared/types/select-config";
import { collectionMemberSnapshotSchema } from "@cookmate/domain";
import { z } from "zod";

const select = {
  id: true,
  joinedAt: true,
  user: {
    select: {
      id: true,
      email: true,
      avatar: true,
    },
  },
} satisfies Prisma.CollectionMemberSelect;

type SelectResult = Prisma.CollectionMemberGetPayload<{ select: typeof select }>[];

const responseSchema = z.array(collectionMemberSnapshotSchema);

type ResponseDto = z.infer<typeof responseSchema>;

const transform = (data: SelectResult): ResponseDto =>
  data.map((member) => ({
    id: member.id,
    userId: member.user.id,
    email: member.user.email,
    avatar: member.user.avatar,
    joinedAt: member.joinedAt,
  }));

export const selectConfig: SelectConfig<typeof select, SelectResult, ResponseDto> = {
  select,
  schema: responseSchema,
  transform,
};

export type { SelectResult, ResponseDto };
