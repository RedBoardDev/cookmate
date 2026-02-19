import { TAGS } from "@cookmate/domain/shared/value-objects";
import { z } from "zod";
import type { GetRecipesQueryParams } from "@/generated/types";

const recipesQueryFiltersSchema = z.object({
  whereTags: z.array(z.enum(TAGS)).min(1).optional(),
  whereCollectionIds: z.array(z.string().min(1)).min(1).optional(),
});

export type RecipesQueryFilters = z.infer<typeof recipesQueryFiltersSchema>;

export function toRecipesQueryParams(filters: RecipesQueryFilters): GetRecipesQueryParams | undefined {
  const parsedFilters = recipesQueryFiltersSchema.safeParse(filters);

  if (!parsedFilters.success) {
    return undefined;
  }

  const queryParams: GetRecipesQueryParams = {};

  if (parsedFilters.data.whereTags) {
    queryParams.whereTags = parsedFilters.data.whereTags;
  }

  if (parsedFilters.data.whereCollectionIds) {
    queryParams.whereCollectionIds = parsedFilters.data.whereCollectionIds;
  }

  return Object.keys(queryParams).length > 0 ? queryParams : undefined;
}
