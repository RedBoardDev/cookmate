import { defineListQuerySchema } from "@/shared/lib/list-query";
import { selectConfig } from "./select";
import { listRecipesSortConfig } from "./order-by";
import { listRecipesWhereConfigs } from "./where";

export const query = defineListQuerySchema({
  where: listRecipesWhereConfigs,
  sort: listRecipesSortConfig,
});

export const response = {
  200: selectConfig.schema,
};

export const schemas = { query, response } as const;
