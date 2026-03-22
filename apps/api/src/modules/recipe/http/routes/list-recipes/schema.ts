import { defineListQuerySchema } from "@/shared/lib/list-query";
import { listRecipesSortConfig } from "./order-by";
import { selectConfig } from "./select";
import { listRecipesWhereConfigs } from "./where";
import type { z } from "zod";

export const query = defineListQuerySchema({
  where: listRecipesWhereConfigs,
  sort: listRecipesSortConfig,
});

export const response = {
  200: selectConfig.schema,
};

export const schemas = { query, response } as const;

export type ListRecipesQuery = z.infer<typeof query>;
