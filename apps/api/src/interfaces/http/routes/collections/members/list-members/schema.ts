import { z } from "zod";
import { defineListQuerySchema } from "@/shared/lib/list-query";
import { selectConfig } from "./select";
import { listMembersSortConfig } from "./order-by";
import { listMembersWhereConfigs } from "./where";

export const params = z.object({
  collectionId: z.uuid(),
});

export const query = defineListQuerySchema({
  where: listMembersWhereConfigs,
  sort: listMembersSortConfig,
});

export const response = {
  200: selectConfig.schema,
};

export const schemas = { params, query, response } as const;
