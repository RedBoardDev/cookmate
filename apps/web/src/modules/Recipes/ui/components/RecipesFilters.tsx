"use client";

import { SlidersHorizontal } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/shared/ui/primitives/button";
import { cn } from "@/shared/lib/utils";
import type {
  QuickFilterId,
  QuickFilterOption
} from "@/modules/Recipes/domain/recipes.filters";

interface RecipesFiltersProps {
  quickFilters: QuickFilterOption[];
  isSelected: (filter: QuickFilterId) => boolean;
  onToggle: (filter: QuickFilterId) => void;
  isLoading?: boolean;
}

export function RecipesFilters({
  quickFilters,
  isSelected,
  onToggle,
  isLoading = false
}: RecipesFiltersProps) {
  const allFilter = quickFilters.find((f) => f.id === "all");
  const otherFilters = quickFilters.filter((f) => f.id !== "all");
  const skeletonWidths = [72, 96, 84, 110, 64];

  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border/70 pb-4",
        "md:flex-row md:items-center md:justify-between"
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {isLoading ? (
          <Skeleton height={36} width={84} borderRadius={999} />
        ) : allFilter ? (
          <Button
            size="sm"
            variant={isSelected(allFilter.id) ? "secondary" : "outline"}
            className={cn(
              "shrink-0 rounded-full px-4",
              isSelected(allFilter.id) && "bg-secondary"
            )}
            aria-pressed={isSelected(allFilter.id)}
            onClick={() => onToggle(allFilter.id)}
          >
            {allFilter.label}
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
            : otherFilters.map((filterItem) => {
                const active = isSelected(filterItem.id);

                return (
                  <Button
                    key={filterItem.id}
                    size="sm"
                    variant={active ? "secondary" : "outline"}
                    className="shrink-0 rounded-full px-4"
                    aria-pressed={active}
                    onClick={() => onToggle(filterItem.id)}
                  >
                    {filterItem.label}
                  </Button>
                );
              })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="rounded-full px-4"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>
    </div>
  );
}
