"use client";

import { useMemo } from "react";
import { useGetRecipesShortUrlShorturl } from "@/generated/hooks";
import { ShortUrlRedirectMapper } from "@/modules/ShortUrlRedirect/application/shortUrlRedirect.mapper";
import { toShortUrlParam } from "@/modules/ShortUrlRedirect/application/shortUrlRedirect.schema";

export function useShortUrlRedirect(shortUrl: string) {
  const normalizedShortUrl = useMemo(() => toShortUrlParam(shortUrl), [shortUrl]);

  const apiQuery = useGetRecipesShortUrlShorturl(normalizedShortUrl!, {
    query: {
      retry: false,
      enabled: normalizedShortUrl !== null,
    },
  });

  const redirect = useMemo(() => {
    if (!normalizedShortUrl) {
      return null;
    }

    return ShortUrlRedirectMapper.toDomain(normalizedShortUrl, apiQuery.data);
  }, [apiQuery.data, normalizedShortUrl]);

  return {
    redirect,
    isInvalidShortUrl: normalizedShortUrl === null,
    error: apiQuery.error,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}
