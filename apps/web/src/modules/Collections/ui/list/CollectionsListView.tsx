"use client";

import { Trans } from "@lingui/react/macro";
import { Plus } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import type { CollectionEntity } from "@/modules/Collections/domain/entity/collection.entity";
import { CollectionListItem } from "@/modules/Collections/ui/list/CollectionListItem";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";
import { DialogDescription, DialogHeader, DialogTitle } from "@/shared/ui/primitives/dialog";

interface CollectionsListViewProps {
  collections: CollectionEntity[];
  isLoading: boolean;
  onCreate: () => void;
  onDelete: (collectionId: string) => void;
  isDeleting?: boolean;
}

export function CollectionsListView({
  collections,
  isLoading,
  onCreate,
  onDelete,
  isDeleting,
}: CollectionsListViewProps) {
  const skeletonWidths = [
    { title: 180, description: 240, meta: 72 },
    { title: 160, description: 220, meta: 64 },
    { title: 200, description: 260, meta: 88 },
    { title: 140, description: 200, meta: 56 },
  ];

  const renderSkeletonItems = () => (
    <div className="space-y-3">
      {skeletonWidths.map((widths, index) => (
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
                <Skeleton width={widths.title} height={16} />
                <Skeleton width={48} height={16} borderRadius={999} />
              </div>
              <Skeleton width={widths.description} height={14} />
              <Skeleton width={widths.meta} height={12} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton circle width={32} height={32} />
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-6">
      <DialogHeader className="text-left">
        <DialogTitle className="text-2xl font-display tracking-tight">
          <Trans>Manage Collections</Trans>
        </DialogTitle>
        <DialogDescription>
          <Trans>Organize your recipes into collections.</Trans>
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span>
              <Trans>My Collections</Trans>
            </span>
            {isLoading ? (
              <Skeleton width={24} height={12} />
            ) : (
              <span className="text-muted-foreground">({collections.length})</span>
            )}
          </div>

          <Button size="sm" onClick={onCreate} className="gap-2 rounded-full">
            <Plus className="h-4 w-4" />
            <Trans>Create</Trans>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto pb-2">
          {isLoading ? (
            renderSkeletonItems()
          ) : collections.length === 0 ? (
            <Card variant="subtle" border="dashed" shadow="flat" radius="2xl" padding="md" className="text-center">
              <p className="text-sm text-muted-foreground">
                <Trans>You don&apos;t have any collections yet. Create one to get started!</Trans>
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {collections.map((collection) => (
                <CollectionListItem
                  key={collection.id}
                  collection={collection}
                  recipeCount={collection.recipeCount}
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
