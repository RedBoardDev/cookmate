"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import Skeleton from "react-loading-skeleton";
import type { RecipeDetailCollectionEntity } from "@/modules/RecipeDetail/domain/entity/recipeDetailCollection.entity";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/primitives/dialog";

interface AddToCollectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collections: RecipeDetailCollectionEntity[];
  isLoading: boolean;
  isUpdating: boolean;
  selectedCollectionIds: string[];
  onToggleCollection: (collectionId: string) => void;
  onConfirm: () => void;
}

export function AddToCollectionModal({
  open,
  onOpenChange,
  collections,
  isLoading,
  isUpdating,
  selectedCollectionIds,
  onToggleCollection,
  onConfirm,
}: AddToCollectionModalProps) {
  const { t } = useLingui();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            <Trans>Choose collections</Trans>
          </DialogTitle>
          <DialogDescription>
            <Trans>Add this recipe to one or more collections.</Trans>
          </DialogDescription>
        </DialogHeader>

        <fieldset className="mt-4 max-h-[50vh] space-y-2 overflow-y-auto pr-1">
          <legend className="sr-only">
            <Trans>Select collections</Trans>
          </legend>
          {isLoading ? (
            <>
              <Skeleton height={48} borderRadius={8} />
              <Skeleton height={48} borderRadius={8} />
              <Skeleton height={48} borderRadius={8} />
            </>
          ) : collections.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              <Trans>No collections available. Create one first.</Trans>
            </p>
          ) : (
            collections.map((collection) => {
              const isSelected = selectedCollectionIds.includes(collection.id);

              return (
                <label
                  key={collection.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                    "hover:bg-accent focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                    isSelected ? "border-primary bg-accent" : "border-border",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleCollection(collection.id)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                    disabled={isUpdating}
                  />
                  <div className="flex flex-1 items-center gap-2">
                    <span className="text-base leading-none" aria-hidden="true">
                      {collection.emoji}
                    </span>
                    <span className="flex-1 cursor-pointer text-sm font-normal text-foreground">{collection.name}</span>
                  </div>
                </label>
              );
            })
          )}
        </fieldset>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUpdating}>
            <Trans>Cancel</Trans>
          </Button>
          <Button onClick={onConfirm} disabled={isUpdating}>
            {isUpdating ? t`Updating...` : t`Confirm`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
