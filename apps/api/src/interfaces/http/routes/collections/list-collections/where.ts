import { collectionVisibilitySchema } from "@cookmate/domain/collection";
import type { Prisma } from "@/generated/prisma/client";
import {
  defineWhereConfigs,
  whereDateRange,
  whereEnumValue,
  whereString,
  whereUuidArray,
} from "@/shared/lib/list-query";

type WhereInput = Prisma.CollectionWhereInput;

export const listCollectionsWhereConfigs = defineWhereConfigs<WhereInput>([
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
]);
