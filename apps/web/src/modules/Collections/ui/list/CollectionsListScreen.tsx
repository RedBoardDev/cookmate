"use client";

import { Plus } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/shared/ui/primitives/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/shared/ui/primitives/dialog";
import { Card } from "@/shared/ui/primitives/card";
import { CollectionListItem } from "@/modules/Collections/ui/list/CollectionListItem";
import type { CollectionEntity } from "@cookmate/domain/collection";

interface CollectionsListScreenProps {
  collections: CollectionEntity[];
  isLoading: boolean;
  onCreate: () => void;
  onDelete: (collection: CollectionEntity) => void;
  isDeleting?: boolean;
}

export function CollectionsListScreen({
  collections,
  isLoading,
  onCreate,
  onDelete,
  isDeleting
}: CollectionsListScreenProps) {
  const skeletonTitleWidths = [180, 160, 200, 140];
  const skeletonDescriptionWidths = [240, 220, 260, 200];
  const skeletonMetaWidths = [72, 64, 88, 56];

  const renderSkeletonItems = (actionCount: 1 | 2) => (
    <div className="space-y-3">
      {skeletonTitleWidths.map((titleWidth, index) => (
        <Card
          key={`collection-skeleton-${index}`}
          variant="solid"
          border="soft"
          shadow="flat"
          radius="xl"
          padding="sm"
          className="flex items-center gap-4 bg-card/95"
        >
          <div className="flex flex-1 items-center gap-3 min-w-0">
            <Skeleton width={48} height={48} borderRadius={12} />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-2">
                <Skeleton width={titleWidth} height={16} />
                <Skeleton width={48} height={16} borderRadius={999} />
              </div>
              <Skeleton
                width={skeletonDescriptionWidths[index]}
                height={14}
              />
              <Skeleton width={skeletonMetaWidths[index]} height={12} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: actionCount }).map((_, actionIndex) => (
              <Skeleton
                key={`collection-skeleton-action-${index}-${actionIndex}`}
                circle
                width={32}
                height={32}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-6">
      <DialogHeader className="text-left">
        <DialogTitle className="text-2xl font-display tracking-tight">
          Manage Collections
        </DialogTitle>
        <DialogDescription>
          Organize your recipes into collections.
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>My Collections</span>
            {isLoading ? (
              <Skeleton width={24} height={12} />
            ) : (
              <span className="text-muted-foreground">
                ({collections.length})
              </span>
            )}
          </div>

          <Button
            size="sm"
            onClick={onCreate}
            className="gap-2 rounded-full"
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pb-2">
          {isLoading ? (
            renderSkeletonItems(1)
          ) : collections.length === 0 ? (
            <Card
              variant="subtle"
              border="dashed"
              shadow="flat"
              radius="2xl"
              padding="md"
              className="text-center"
            >
              <p className="text-sm text-muted-foreground">
                You don&apos;t have any collections yet. Create one to get started!
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {collections.map((collection) => (
                <CollectionListItem
                  key={collection.id}
                  collection={collection}
                  onDelete={onDelete}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
