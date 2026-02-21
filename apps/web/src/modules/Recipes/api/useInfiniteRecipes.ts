"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getRecipes } from "@/generated/clients/RecipesClient/getRecipes";
import type { GetRecipesQueryParams } from "@/generated/types";
import {
  DEFAULT_RECIPES_PAGE_SIZE,
  getRecipesInfiniteQueryKey,
  getRecipesNextPageParam,
} from "@/modules/Recipes/application/recipes-infinite-query";
import {
  getRecipesTotalItemsFromPages,
  mapUniqueRecipesFromPages,
} from "@/modules/Recipes/application/recipes-infinite-transform";

export function useInfiniteRecipes(params?: GetRecipesQueryParams) {
  const baseQueryParams = useMemo(
    () => ({
      pageSize: params?.pageSize ?? DEFAULT_RECIPES_PAGE_SIZE,
      ...params,
    }),
    [params],
  );

  const apiQuery = useInfiniteQuery({
    queryKey: getRecipesInfiniteQueryKey(baseQueryParams),
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      getRecipes(
        {
          ...baseQueryParams,
          page: pageParam,
        },
        { signal },
      ),
    getNextPageParam: (lastPage, allPages, lastPageParam) => getRecipesNextPageParam(lastPage, allPages, lastPageParam),
    placeholderData: (previousData) => previousData,
    retry: false,
  });

  const pages = apiQuery.data?.pages ?? [];
  const recipes = useMemo(() => mapUniqueRecipesFromPages(pages), [pages]);

  const totalItems = useMemo(() => {
    const totalFromPages = getRecipesTotalItemsFromPages(pages);
    return totalFromPages > 0 ? totalFromPages : recipes.length;
  }, [pages, recipes.length]);

  const error = recipes.length > 0 ? null : apiQuery.error;
  const loadMoreError = apiQuery.isFetchNextPageError ? apiQuery.error : null;
  const isInitialLoading = apiQuery.isPending && pages.length === 0;
  const isRefreshing = apiQuery.isFetching && !isInitialLoading && !apiQuery.isFetchingNextPage;

  return {
    recipes,
    totalItems,
    hasNextPage: Boolean(apiQuery.hasNextPage),
    isLoading: isInitialLoading,
    isRefreshing,
    isFetchingNextPage: apiQuery.isFetchingNextPage,
    error,
    loadMoreError,
    fetchNextPage: apiQuery.fetchNextPage,
    refetch: apiQuery.refetch,
  };
}
