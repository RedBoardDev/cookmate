"use client";

import { Dialog, DialogContent } from "@/shared/ui/primitives/dialog";
import { CollectionsListScreen } from "@/modules/Collections/ui/list/CollectionsListScreen";
import { CreateCollectionScreen } from "@/modules/Collections/ui/create/CreateCollectionScreen";
import { useCollectionsManageModal } from "@/modules/Collections/ui/hooks/useCollectionsManageModal";

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
      <DialogContent className="max-h-[90vh] w-full max-w-2xl overflow-hidden flex flex-col p-0">
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
