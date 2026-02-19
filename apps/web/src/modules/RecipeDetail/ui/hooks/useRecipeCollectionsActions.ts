"use client";

import { useLingui } from "@lingui/react/macro";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useRecipeDetailCollections } from "@/modules/RecipeDetail/api/useRecipeDetailCollections";
import { useUpdateRecipeCollections } from "@/modules/RecipeDetail/api/useUpdateRecipeCollections";
import type { ApiError } from "@/shared/lib/api-error";
import { getUserFacingErrorMessage } from "@/shared/lib/api-error";

type UseRecipeCollectionsActionsOptions = {
  recipeId: string;
  initialCollectionIds?: readonly string[];
};

export function useRecipeCollectionsActions(options: UseRecipeCollectionsActionsOptions) {
  const { recipeId, initialCollectionIds = [] } = options;
  const { t } = useLingui();
  const { collections, isLoading: isLoadingCollections } = useRecipeDetailCollections();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([...initialCollectionIds]);

  const handleOpenModal = useCallback(() => {
    if (!recipeId) {
      return;
    }

    setSelectedCollectionIds([...initialCollectionIds]);
    setIsModalOpen(true);
  }, [initialCollectionIds, recipeId]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const updateCollections = useUpdateRecipeCollections({
    recipeId,
    onSuccess: () => {
      toast.success(t`Collections updated`);
      setIsModalOpen(false);
    },
    onError: (error: ApiError) => {
      toast.error(getUserFacingErrorMessage(t, error));
    },
  });

  const handleConfirm = useCallback(() => {
    if (!recipeId) {
      return;
    }

    updateCollections.mutate(selectedCollectionIds);
  }, [recipeId, selectedCollectionIds, updateCollections]);

  const handleToggleCollection = useCallback((collectionId: string) => {
    setSelectedCollectionIds((previousIds) => {
      if (previousIds.includes(collectionId)) {
        return previousIds.filter((id) => id !== collectionId);
      }

      return [...previousIds, collectionId];
    });
  }, []);

  return {
    availableCollections: collections,
    isLoadingCollections,
    isModalOpen,
    isUpdating: updateCollections.isPending,
    selectedCollectionIds,
    handleToggleCollection,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
  };
}
