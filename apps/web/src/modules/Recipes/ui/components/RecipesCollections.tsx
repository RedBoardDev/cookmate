"use client";

import { useMemo, useState } from "react";
import { BookOpen, Settings2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/shared/ui/primitives/button";
import { cn } from "@/shared/lib/utils";
import type { CollectionAggregate } from "@/modules/Recipes/domain/collection.aggregate";
import { CollectionsManageModal } from "@/modules/Collections/ui";

interface RecipesCollectionsProps {
  collections: CollectionAggregate[];
  totalRecipes: number;
  selectedIds: string[];
  onToggle: (collectionId: string) => void;
  isLoading?: boolean;
}

export function RecipesCollections({
  collections,
  totalRecipes,
  selectedIds,
  onToggle,
  isLoading = false
}: RecipesCollectionsProps) {
  const [isManageOpen, setIsManageOpen] = useState(false);

  // * Build collection options for UI (includes "All" option)
  const collectionOptions = useMemo(() => {
    return [
      { id: "all", label: "All", count: totalRecipes, emoji: null },
      ...collections.map((aggregate) => ({
        id: aggregate.collection.id,
        label: aggregate.collection.name,
        count: aggregate.recipeCount,
        emoji: aggregate.collection.emoji
      }))
    ];
  }, [collections, totalRecipes]);

  const allCollection = collectionOptions.find((c) => c.id === "all");
  const otherCollections = collectionOptions.filter((c) => c.id !== "all");
  const skeletonWidths = [96, 84, 72, 110, 64, 88];

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        "md:flex-row md:items-center md:justify-between"
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {isLoading ? (
          <Skeleton height={36} width={96} borderRadius={999} />
        ) : allCollection ? (
          <Button
            size="sm"
            variant={selectedIds.includes(allCollection.id) ? "secondary" : "outline"}
            className={cn(
              "shrink-0 rounded-full px-4",
              "flex items-center gap-2"
            )}
            aria-pressed={selectedIds.includes(allCollection.id)}
            onClick={() => onToggle(allCollection.id)}
          >
            <BookOpen className="h-4 w-4" />
            <span>{allCollection.label}</span>
            <span className={cn(
              "rounded-full px-2 py-0.5 text-xs",
              selectedIds.includes(allCollection.id)
                ? "bg-background/20 text-secondary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {allCollection.count}
            </span>
          </Button>
        ) : null}
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2",
            "overflow-x-auto pb-2 md:pb-0",
            "no-scrollbar"
          )}
        >
          {isLoading
            ? skeletonWidths.map((width, index) => (
                <Skeleton
                  key={`${width}-${index}`}
                  height={36}
                  width={width}
                  borderRadius={999}
                />
              ))
            : otherCollections.map((collection) => {
                const isActive = selectedIds.includes(collection.id);

                return (
                  <Button
                    key={collection.id}
                    size="sm"
                    variant={isActive ? "secondary" : "outline"}
                    className={cn(
                      "shrink-0 rounded-full px-4",
                      "flex items-center gap-2"
                    )}
                    aria-pressed={isActive}
                    onClick={() => onToggle(collection.id)}
                  >
                    {collection.emoji ? (
                      <span className="text-base leading-none">{collection.emoji}</span>
                    ) : (
                      <BookOpen className="h-4 w-4" />
                    )}
                    <span>{collection.label}</span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-xs",
                      isActive
                        ? "bg-background/20 text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {collection.count}
                    </span>
                  </Button>
                );
              })}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          className="gap-2"
          onClick={() => setIsManageOpen(true)}
        >
          <Settings2 className="h-4 w-4" />
          Manage
        </Button>
        <CollectionsManageModal
          open={isManageOpen}
          onOpenChange={setIsManageOpen}
        />
      </div>
    </div>
  );
}
