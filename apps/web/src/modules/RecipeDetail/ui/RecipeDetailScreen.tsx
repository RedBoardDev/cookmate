"use client";

import { AddToCollectionModal } from "@/modules/RecipeDetail/ui/components/AddToCollectionModal";
import { useRecipeDetailScreen } from "@/modules/RecipeDetail/ui/hooks/useRecipeDetailScreen";
import { RecipeDetailView } from "@/modules/RecipeDetail/ui/RecipeDetailView";
import { RecipeDetailEmptyState } from "@/modules/RecipeDetail/ui/states/RecipeDetailEmptyState";
import { RecipeDetailErrorState } from "@/modules/RecipeDetail/ui/states/RecipeDetailErrorState";
import { useDevSkeleton } from "@/shared/ui/hooks/useDevSkeleton";

interface RecipeDetailScreenProps {
  recipeId: string;
}

export function RecipeDetailScreen({ recipeId }: RecipeDetailScreenProps) {
  const forceLoading = useDevSkeleton();
  const effectiveRecipeId = forceLoading ? "" : recipeId;

  const { detail, error, isLoading, retry, collectionsActions, onShare } = useRecipeDetailScreen(effectiveRecipeId);
  const loading = forceLoading || isLoading;

  if (loading) {
    return <RecipeDetailView isLoading />;
  }

  if (error) {
    return <RecipeDetailErrorState onRetry={retry} />;
  }

  if (!detail) {
    return <RecipeDetailEmptyState />;
  }

  return (
    <RecipeDetailView
      detail={detail}
      onOpenCollections={collectionsActions.handleOpenModal}
      onShare={onShare}
      disableCollections={!detail.id}
      disableShare={!detail.id}
      collectionsModal={
        <AddToCollectionModal
          open={collectionsActions.isModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              collectionsActions.handleCloseModal();
            }
          }}
          collections={collectionsActions.availableCollections}
          isLoading={collectionsActions.isLoadingCollections}
          isUpdating={collectionsActions.isUpdating}
          selectedCollectionIds={collectionsActions.selectedCollectionIds}
          onToggleCollection={collectionsActions.handleToggleCollection}
          onConfirm={collectionsActions.handleConfirm}
        />
      }
    />
  );
}
