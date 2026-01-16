"use client";

import { Dialog, DialogContent } from "@/shared/ui/primitives/dialog";
import { CollectionsListScreen } from "@/modules/Collections/ui/list/CollectionsListScreen";
import { CreateCollectionScreen } from "@/modules/Collections/ui/create/CreateCollectionScreen";
import { useCollectionsManageModal } from "@/modules/Collections/ui/hooks/useCollectionsManageModal";
import { cn } from "@/shared/lib/utils";

interface CollectionsManageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollectionsManageModal({
  open,
  onOpenChange
}: CollectionsManageModalProps) {
  const {
    screen,
    collections,
    isLoading,
    handleDelete,
    isDeleting,
    handleBack,
    handleCreate,
    handleClose
  } = useCollectionsManageModal();

  const handleOpenChange = (isOpen: boolean) => {
    handleClose(isOpen);
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden p-0",
          "rounded-3xl border-border/70 bg-background",
          "shadow-[0_12px_24px_-20px_rgba(0,0,0,0.24)]"
        )}
      >
        {screen === "list" && (
          <CollectionsListScreen
            collections={collections}
            isLoading={isLoading}
            onCreate={handleCreate}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}

        {screen === "create" && <CreateCollectionScreen onBack={handleBack} />}
      </DialogContent>
    </Dialog>
  );
}
