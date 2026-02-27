"use client";

import { useLingui } from "@lingui/react/macro";
import { useCallback } from "react";
import { toast } from "sonner";
import { useRecipeDetailAggregate } from "@/modules/RecipeDetail/api/useRecipeDetailAggregate";
import { recipeShareService } from "@/modules/RecipeDetail/application/shareUrl.service";
import { useRecipeCollectionsActions } from "@/modules/RecipeDetail/ui/hooks/useRecipeCollectionsActions";

export function useRecipeDetailScreen(recipeId: string) {
  const { t } = useLingui();
  const { detail, error, isLoading, refetch } = useRecipeDetailAggregate(recipeId);

  const collectionsActions = useRecipeCollectionsActions({
    recipeId: detail?.id ?? "",
    initialCollectionIds: detail?.collectionIds ?? [],
  });

  const handleShare = useCallback(async () => {
    if (!detail) {
      return;
    }

    const shareUrl = recipeShareService.buildShareUrl(detail.id, detail.shortUrl);

    if (!shareUrl) {
      return;
    }

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: detail.name || t`Cookmate recipe`,
          url: shareUrl,
        });
        return;
      } catch (errorValue) {
        if (errorValue instanceof DOMException && errorValue.name === "AbortError") {
          return;
        }
      }
    }

    const didCopy = await recipeShareService.copyToClipboard(shareUrl, t`Copy the link`);

    if (didCopy) {
      toast.success(t`Link copied`);
      return;
    }

    toast.error(t`Unable to copy the link`);
  }, [detail, t]);

  const retry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    detail,
    isLoading,
    error,
    retry,
    collectionsActions,
    onShare: handleShare,
  };
}
