import { z } from "zod";
import { defineListQuerySchema } from "@/shared/lib/list-query";
import { listRecipeImagesSortConfig } from "./order-by";
import { selectConfig } from "./select";
import { listRecipeImagesWhereConfigs } from "./where";

export const params = z.object({
  recipeId: z.uuid(),
});

export const query = defineListQuerySchema({
  where: listRecipeImagesWhereConfigs,
  sort: listRecipeImagesSortConfig,
});

export const response = {
  200: selectConfig.schema,
};

export const schemas = { params, query, response } as const;
