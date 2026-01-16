"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { PopConfirm } from "@/shared/ui/primitives/popconfirm";
import { Badge } from "@/shared/ui/primitives/badge";
import { Card } from "@/shared/ui/primitives/card";
import { cn } from "@/shared/lib/utils";
import type { CollectionEntity } from "@cookmate/domain/collection";

interface CollectionListItemProps {
  collection: CollectionEntity;
  recipeCount?: number;
  onDelete?: (collection: CollectionEntity) => void;
  isDeleting?: boolean;
}

export function CollectionListItem({
  collection,
  recipeCount = 0,
  onDelete,
  isDeleting
}: CollectionListItemProps) {
  return (
    <Card
      variant="solid"
      border="soft"
      shadow="flat"
      radius="xl"
      padding="sm"
      interactive="border"
      className={cn(
        "group flex items-center gap-4",
        "bg-card/95 transition-colors",
        "hover:border-primary/20"
      )}
    >
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/60 text-2xl">
          {collection.emoji}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">
              {collection.name}
            </h3>
            {collection.visibility === "PUBLIC" && (
              <Badge
                variant="outline"
                className="shrink-0 text-xs"
              >
                Public
              </Badge>
            )}
          </div>

          {collection.description && (
            <p className="truncate text-sm text-muted-foreground">
              {collection.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{recipeCount} recipes</span>
          </div>
        </div>
      </div>

      {onDelete && (
        <PopConfirm
          title={`Delete "${collection.name}"?`}
          description="This action cannot be undone. All recipes in this collection will be removed."
          onConfirm={() => onDelete(collection)}
          variant="destructive"
          confirmLabel="Delete"
          disabled={isDeleting}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full text-destructive hover:text-destructive"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete collection</span>
          </Button>
        </PopConfirm>
      )}
    </Card>
  );
}
