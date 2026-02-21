import { useMemo, useRef } from "react";
import type { GetRecipesQueryParams } from "@/generated/types";
import {
  buildRecipesInfiniteBaseParams,
  buildRecipesInfiniteFiltersSignature,
  normalizeStringArray,
  toIsoDateOrNull,
} from "@/modules/Recipes/application/recipes-infinite-query";
import { toRecipesQueryParams, type RecipesQueryFilters } from "@/modules/Recipes/application/recipes-query.schema";

interface UseRecipesInfiniteParamsInput {
  whereCollectionIds?: RecipesQueryFilters["whereCollectionIds"];
  whereCategories?: RecipesQueryFilters["whereCategories"];
}

interface RecipesSnapshotState {
  signature: string;
  createdAtUpperBound: string;
}

const INITIAL_SNAPSHOT_SIGNATURE = "{}";

export function useRecipesInfiniteParams({
  whereCollectionIds,
  whereCategories,
}: UseRecipesInfiniteParamsInput): GetRecipesQueryParams {
  const normalizedCollectionIds = useMemo(() => normalizeStringArray(whereCollectionIds), [whereCollectionIds]);
  const normalizedCategories = useMemo(() => normalizeStringArray(whereCategories), [whereCategories]);

  const filters = useMemo(
    () =>
      toRecipesQueryParams({
        whereCollectionIds: normalizedCollectionIds,
        whereCategories: normalizedCategories,
      }),
    [normalizedCollectionIds, normalizedCategories],
  );

  const filtersSignature = useMemo(() => buildRecipesInfiniteFiltersSignature(filters), [filters]);
  const snapshotRef = useRef<RecipesSnapshotState>({
    signature: INITIAL_SNAPSHOT_SIGNATURE,
    createdAtUpperBound: new Date().toISOString(),
  });

  const createdAtUpperBound = useMemo(() => {
    const explicitUpperBound = toIsoDateOrNull(filters?.whereCreatedAtLte);
    if (explicitUpperBound) {
      snapshotRef.current = {
        signature: filtersSignature,
        createdAtUpperBound: explicitUpperBound,
      };
      return explicitUpperBound;
    }

    if (snapshotRef.current.signature !== filtersSignature) {
      snapshotRef.current = {
        signature: filtersSignature,
        createdAtUpperBound: new Date().toISOString(),
      };
    }

    return snapshotRef.current.createdAtUpperBound;
  }, [filters?.whereCreatedAtLte, filtersSignature]);

  return useMemo(() => buildRecipesInfiniteBaseParams(filters, createdAtUpperBound), [createdAtUpperBound, filters]);
}
