"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { useState } from "react";
import { toast } from "sonner";
import { useCollections } from "@/modules/Collections/api/useCollections";
import { useDeleteCollection } from "@/modules/Collections/api/useDeleteCollection";
import { getUserFacingErrorMessage } from "@/shared/lib/api-error";
import { useDevSkeleton } from "@/shared/ui/hooks/useDevSkeleton";

export type Screen = "list" | "create";

export function useCollectionsManageModal() {
  const forceLoading = useDevSkeleton();
  const { t } = useLingui();
  const [screen, setScreen] = useState<Screen>("list");

  const { collections, isLoading } = useCollections({ whereRole: "OWNER" });
  const deleteCollection = useDeleteCollection({
    onSuccess: () => {
      toast.success(t(msg`Collection deleted`));
    },
    onError: (error) => {
      toast.error(getUserFacingErrorMessage(t, error));
    },
  });

  const handleDelete = (collectionId: string) => {
    deleteCollection.mutate(collectionId);
  };

  const handleBack = () => {
    setScreen("list");
  };

  const handleCreate = () => {
    setScreen("create");
  };

  return {
    screen,
    collections,
    isLoading: isLoading || forceLoading,
    handleDelete,
    isDeleting: deleteCollection.isPending,
    handleBack,
    handleCreate,
  };
}
