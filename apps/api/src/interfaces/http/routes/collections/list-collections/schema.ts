import { defineListQuerySchema } from "@/shared/lib/list-query";
import { selectConfig } from "./select";
import { listCollectionsSortConfig } from "./order-by";
import { listCollectionsWhereConfigs } from "./where";

export const query = defineListQuerySchema({
  where: listCollectionsWhereConfigs,
  sort: listCollectionsSortConfig,
});

export const response = {
  200: selectConfig.schema,
};

export const schemas = { query, response } as const;
