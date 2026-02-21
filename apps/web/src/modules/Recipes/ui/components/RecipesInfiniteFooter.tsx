"use client";

import { Button } from "@heroui/react";
import { useLingui } from "@lingui/react/macro";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useInfiniteScrollTrigger } from "@/modules/Recipes/ui/hooks/useInfiniteScrollTrigger";

interface RecipesInfiniteFooterProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  hasLoadMoreError: boolean;
  onLoadMore?: () => void;
  onRetryLoadMore?: () => void;
}

export function RecipesInfiniteFooter({
  hasNextPage,
  isFetchingNextPage,
  hasLoadMoreError,
  onLoadMore,
  onRetryLoadMore,
}: RecipesInfiniteFooterProps) {
  const { t } = useLingui();
  const handleIntersect = useCallback(() => {
    onLoadMore?.();
  }, [onLoadMore]);

  const sentinelRef = useInfiniteScrollTrigger({
    enabled: hasNextPage && !isFetchingNextPage && !hasLoadMoreError && onLoadMore !== undefined,
    onIntersect: handleIntersect,
  });

  if (!hasNextPage && !isFetchingNextPage && !hasLoadMoreError) {
    return null;
  }

  return (
    <>
      {isFetchingNextPage ? (
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{t`Loading more recipes...`}</span>
        </div>
      ) : null}

      {hasLoadMoreError && onRetryLoadMore ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground">{t`Unable to load more recipes.`}</p>
          <Button size="sm" variant="secondary" className="rounded-full" onPress={onRetryLoadMore}>
            {t`Retry`}
          </Button>
        </div>
      ) : null}

      {hasNextPage ? <div ref={sentinelRef} aria-hidden className="h-2 w-full" /> : null}
    </>
  );
}
