import { collectionVisibilitySchema } from "@cookmate/domain/collection";
import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import {
  defineWhereConfigs,
  whereCustom,
  whereDateRange,
  whereEnumValue,
  whereString,
  whereUuidArray,
} from "@/shared/lib/list-query";

type WhereInput = Prisma.CollectionWhereInput;

export type ListCollectionsContext = { userId: string };

export const collectionRoleSchema = z.enum(["OWNER", "MEMBER", "ALL"]);

export const listCollectionsWhereConfigs = defineWhereConfigs<WhereInput, ListCollectionsContext>([
  whereString("whereName", {
    field: "name",
    description: "Filter by name (contains)",
    contains: true,
    insensitive: true,
  }),
  whereString("whereDescription", {
    field: "description",
    description: "Filter by description (contains)",
    contains: true,
    insensitive: true,
  }),
  whereEnumValue("whereVisibility", {
    field: "visibility",
    description: "Filter by visibility",
    schema: collectionVisibilitySchema,
  }),
  whereUuidArray("whereIds", {
    field: "id",
    description: "Filter by collection IDs",
    op: "in",
  }),
  whereDateRange("whereCreatedAt", {
    field: "createdAt",
    description: "Filter by createdAt range",
  }),
  whereDateRange("whereUpdatedAt", {
    field: "updatedAt",
    description: "Filter by updatedAt range",
  }),
  whereCustom<WhereInput, ListCollectionsContext>("whereRole", {
    description: "Filter by user role in collection (OWNER, MEMBER, ALL)",
    schema: collectionRoleSchema,
    toWhere: (value, ctx) => {
      switch (value) {
        case "OWNER":
          return { userId: ctx.userId };
        case "MEMBER":
          return { members: { some: { userId: ctx.userId } } };
        case "ALL":
          return {
            OR: [{ userId: ctx.userId }, { members: { some: { userId: ctx.userId } } }],
          };
      }
    },
  }),
]);
