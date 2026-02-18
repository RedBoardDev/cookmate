"use client";

import { CreateCollectionScreen } from "@/modules/Collections/ui/create/CreateCollectionScreen";
import { useCollectionsManageModal } from "@/modules/Collections/ui/hooks/useCollectionsManageModal";
import { CollectionsListView } from "@/modules/Collections/ui/list/CollectionsListView";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent } from "@/shared/ui/primitives/dialog";

interface CollectionsManageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CollectionsManageModal({ open, onOpenChange }: CollectionsManageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden p-0",
          "rounded-3xl border-border/70 bg-background",
          "shadow-[0_12px_24px_-20px_rgba(0,0,0,0.24)]",
        )}
      >
        {open && <CollectionsManageModalContent />}
      </DialogContent>
    </Dialog>
  );
}

function CollectionsManageModalContent() {
  const { screen, collections, isLoading, handleDelete, isDeleting, handleBack, handleCreate } =
    useCollectionsManageModal();

  return (
    <>
      {screen === "list" && (
        <CollectionsListView
          collections={collections}
          isLoading={isLoading}
          onCreate={handleCreate}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}

      {screen === "create" && <CreateCollectionScreen onBack={handleBack} />}
    </>
  );
}
