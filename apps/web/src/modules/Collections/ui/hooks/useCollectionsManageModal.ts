"use client";

import { useMemo, useState } from "react";
import { useCollections } from "@/modules/Collections/api/useCollections";
import { useDeleteCollection } from "@/modules/Collections/api/useDeleteCollection";
import { useDevSkeleton } from "@/shared/ui/hooks/useDevSkeleton";
import { useSession } from "@/modules/Auth/api/useSession";

export type Screen = "list" | "create";

export function useCollectionsManageModal() {
  const forceLoading = useDevSkeleton();
  const { user } = useSession();
  const [screen, setScreen] = useState<Screen>("list");

  const { collections, isLoading } = useCollections();
  const deleteCollection = useDeleteCollection();

  const ownedCollections = useMemo(() => {
    const userId = user?.id;
    if (!userId) {
      return [];
    }

    return collections.filter((collection) => collection.isOwner(userId));
  }, [collections, user?.id]);

  const handleDelete = (collection: { id: string }) => {
    deleteCollection.mutate(collection.id);
  };

  const handleBack = () => {
    setScreen("list");
  };

  const handleCreate = () => {
    setScreen("create");
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setScreen("list");
    }
  };

  return {
    screen,
    collections: ownedCollections,
    isLoading: isLoading || forceLoading,
    handleDelete,
    isDeleting: deleteCollection.isPending,
    handleBack,
    handleCreate,
    handleClose
  };
}
