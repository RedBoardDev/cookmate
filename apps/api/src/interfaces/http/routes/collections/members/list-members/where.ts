import type { Prisma } from "@/generated/prisma/client";
import { defineWhereConfigs, whereDateRange, whereUuidArray } from "@/shared/lib/list-query";

type WhereInput = Prisma.CollectionMemberWhereInput;

export const listMembersWhereConfigs = defineWhereConfigs<WhereInput>([
  whereUuidArray("whereIds", {
    field: "id",
    description: "Filter by membership IDs",
    op: "in",
  }),
  whereUuidArray("whereUserIds", {
    field: "userId",
    description: "Filter by user IDs",
    op: "in",
  }),
  whereDateRange("whereJoinedAt", {
    field: "joinedAt",
    description: "Filter by joinedAt range",
  }),
]);
