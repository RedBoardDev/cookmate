"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Trash2 } from "lucide-react";
import type { CollectionEntity } from "@/modules/Collections/domain/entity/collection.entity";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/primitives/badge";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";
import { PopConfirm } from "@/shared/ui/primitives/popconfirm";

interface CollectionListItemProps {
  collection: CollectionEntity;
  recipeCount: number;
  onDelete?: (collectionId: string) => void;
  isDeleting?: boolean;
}

export function CollectionListItem({ collection, recipeCount, onDelete, isDeleting }: CollectionListItemProps) {
  const { t } = useLingui();

  return (
    <Card
      variant="solid"
      border="soft"
      shadow="flat"
      radius="xl"
      padding="sm"
      interactive="border"
      className={cn("group flex items-center gap-4", "bg-card/95 transition-colors", "hover:border-primary/20")}
    >
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/60 text-2xl">
          {collection.emoji}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">{collection.name}</h3>
            {collection.isPublic && (
              <Badge variant="outline" className="shrink-0 text-xs">
                <Trans>Public</Trans>
              </Badge>
            )}
          </div>

          {collection.description && <p className="truncate text-sm text-muted-foreground">{collection.description}</p>}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              <Trans>{recipeCount} recipes</Trans>
            </span>
          </div>
        </div>
      </div>

      {onDelete && (
        <PopConfirm
          title={t`Delete "${collection.name}"?`}
          description={t`This action cannot be undone. All recipes in this collection will be removed.`}
          onConfirm={() => onDelete(collection.id)}
          variant="destructive"
          confirmLabel={t`Delete`}
          disabled={isDeleting}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full text-destructive hover:text-destructive"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">
              <Trans>Delete collection</Trans>
            </span>
          </Button>
        </PopConfirm>
      )}
    </Card>
  );
}
