"use client";

import { useGetRecipesShortUrlShorturl } from "@/generated/hooks";

export function useShortUrlRedirect(shortUrl: string) {
  const apiQuery = useGetRecipesShortUrlShorturl(shortUrl, {
    query: {
      retry: false,
      enabled: !!shortUrl
    }
  });

  const recipeId = apiQuery.data?.data?.id;

  return {
    recipeId,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading
  };
}
