"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { BookOpen, Settings2 } from "lucide-react";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import type { CollectionEntity } from "@/modules/Recipes/domain/entity/collection.entity";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";

interface RecipesCollectionsProps {
  collections: CollectionEntity[];
  totalRecipes: number;
  selectedIds: string[];
  onToggle: (collectionId: string) => void;
  isLoading?: boolean;
  onManageClick?: () => void;
}

export function RecipesCollections({
  collections,
  totalRecipes,
  selectedIds,
  onToggle,
  isLoading = false,
  onManageClick,
}: RecipesCollectionsProps) {
  const { i18n } = useLingui();

  const collectionOptions = useMemo(() => {
    return [
      { id: "all", label: i18n._("All"), count: totalRecipes, emoji: null },
      ...collections.map((collection) => ({
        id: collection.id,
        label: collection.name,
        count: collection.recipeCount,
        emoji: collection.emoji,
      })),
    ];
  }, [collections, i18n, totalRecipes]);

  const allCollection = collectionOptions.find((collection) => collection.id === "all");
  const otherCollections = collectionOptions.filter((collection) => collection.id !== "all");
  const skeletonWidths = [96, 84, 72, 110, 64, 88];

  const manageButton = (
    <Button
      size="sm"
      variant="outline"
      className="gap-2 rounded-full px-4 shadow-sm hover:shadow-md"
      onClick={onManageClick}
    >
      <Settings2 className="h-4 w-4" />
      <Trans>Manage</Trans>
    </Button>
  );

  return (
    <div className={cn("flex flex-col gap-3", "md:flex-row md:items-center md:justify-between")}>
      <div className={cn("flex min-w-0 flex-1 flex-col gap-3", "md:flex-row md:items-center md:gap-2")}>
        <div className="flex items-center justify-between gap-2 md:justify-start">
          {isLoading ? (
            <Skeleton height={36} width={96} borderRadius={999} />
          ) : allCollection ? (
            <Button
              size="sm"
              variant={selectedIds.includes(allCollection.id) ? "secondary" : "outline"}
              className={cn(
                "shrink-0 rounded-full px-4",
                "flex items-center gap-2 transition-shadow",
                selectedIds.includes(allCollection.id) ? "shadow-sm" : "hover:shadow-sm",
              )}
              aria-pressed={selectedIds.includes(allCollection.id)}
              onClick={() => onToggle(allCollection.id)}
            >
              <BookOpen className="h-4 w-4" />
              <span>{allCollection.label}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs",
                  selectedIds.includes(allCollection.id)
                    ? "bg-background/30 text-secondary-foreground"
                    : "bg-muted/70 text-muted-foreground",
                )}
              >
                {allCollection.count}
              </span>
            </Button>
          ) : null}
          <div className="md:hidden">{manageButton}</div>
        </div>
        <div
          className={cn(
            "flex w-full min-w-0 items-center gap-2",
            "overflow-x-auto pb-2 md:pb-0",
            "no-scrollbar",
            "md:flex-1",
          )}
        >
          {isLoading
            ? skeletonWidths.map((width, index) => (
                <Skeleton key={`${width}-${index}`} height={36} width={width} borderRadius={999} />
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
                      "flex items-center gap-2 transition-shadow",
                      isActive ? "shadow-sm" : "hover:shadow-sm",
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
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs",
                        isActive ? "bg-background/30 text-secondary-foreground" : "bg-muted/70 text-muted-foreground",
                      )}
                    >
                      {collection.count}
                    </span>
                  </Button>
                );
              })}
        </div>
      </div>
      <div className="hidden justify-end md:flex">{manageButton}</div>
    </div>
  );
}
