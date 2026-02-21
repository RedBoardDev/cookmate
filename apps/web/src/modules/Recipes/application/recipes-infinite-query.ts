import type { GetRecipesQueryParams, GetRecipesQueryResponse } from "@/generated/types";

const SORT_PARAM_KEY = "sort";

export const DEFAULT_RECIPES_PAGE_SIZE = 20;

export type RecipesPage = GetRecipesQueryResponse;
export type InfiniteRecipesQueryKey = readonly [
  "cookmate",
  { readonly url: "/recipes" },
  "infinite",
  GetRecipesQueryParams,
];

function normalizeArrayParam(key: string, value: readonly unknown[]): unknown[] {
  if (key === SORT_PARAM_KEY) {
    return value.map((item) => String(item));
  }

  return value.map((item) => String(item)).sort();
}

export function normalizeStringArray<TValue extends string>(values?: readonly TValue[]): TValue[] | undefined {
  if (!values || values.length === 0) {
    return undefined;
  }

  return [...values].sort((left, right) => left.localeCompare(right));
}

export function buildRecipesInfiniteFiltersSignature(params?: GetRecipesQueryParams): string {
  if (!params) {
    return "{}";
  }

  const entries = (Object.entries(params) as [string, unknown][])
    .filter(([key]) => key !== "page" && key !== "pageSize" && key !== "findId")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return [key, normalizeArrayParam(key, value)];
      }

      return [key, value];
    });

  return JSON.stringify(entries);
}

export function toIsoDateOrNull(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    const parsedDate = new Date(value);
    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString();
    }
  }

  return null;
}

export function buildRecipesInfiniteBaseParams(
  params: GetRecipesQueryParams | undefined,
  createdAtUpperBound: string,
): GetRecipesQueryParams {
  if (!params) {
    return {
      pageSize: DEFAULT_RECIPES_PAGE_SIZE,
      whereCreatedAtLte: createdAtUpperBound,
    };
  }

  const { page: _page, pageSize: _pageSize, findId: _findId, ...filters } = params;

  return {
    ...filters,
    pageSize: DEFAULT_RECIPES_PAGE_SIZE,
    whereCreatedAtLte: toIsoDateOrNull(filters.whereCreatedAtLte) ?? createdAtUpperBound,
  };
}

export function getRecipesInfiniteQueryKey(baseParams: GetRecipesQueryParams): InfiniteRecipesQueryKey {
  return ["cookmate", { url: "/recipes" }, "infinite", baseParams] as const;
}

export function getRecipesNextPageParam(
  lastPage: RecipesPage,
  allPages: readonly RecipesPage[],
  lastPageParam: number,
): number | undefined {
  const pagination = lastPage.metadata?.pagination;
  if (!pagination) {
    return lastPage.data.length < DEFAULT_RECIPES_PAGE_SIZE ? undefined : lastPageParam + 1;
  }

  const loadedItems = allPages.reduce((total, page) => total + page.data.length, 0);
  return loadedItems >= pagination.totalItems ? undefined : lastPageParam + 1;
}
