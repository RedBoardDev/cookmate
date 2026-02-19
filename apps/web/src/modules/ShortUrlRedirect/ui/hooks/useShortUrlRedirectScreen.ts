import { useCallback } from "react";
import { useShortUrlRedirect } from "@/modules/ShortUrlRedirect/api/useShortUrlRedirect";

export function useShortUrlRedirectScreen(shortUrl: string) {
  const { redirect, isInvalidShortUrl, error, isLoading, refetch } = useShortUrlRedirect(shortUrl);

  const retry = useCallback(() => {
    void refetch();
  }, [refetch]);

  const hasError = Boolean(error) || isInvalidShortUrl || (!isLoading && redirect === null);

  return {
    redirect,
    hasError,
    isLoading,
    retry,
  };
}
