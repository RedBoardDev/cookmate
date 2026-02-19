"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { SlidersHorizontal } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import type { QuickFilterId, QuickFilterOption } from "@/modules/Recipes/domain/vo/recipes.filters";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";

interface RecipesFiltersProps {
  quickFilters: QuickFilterOption[];
  isSelected: (filter: QuickFilterId) => boolean;
  onToggle: (filter: QuickFilterId) => void;
  isLoading?: boolean;
}

export function RecipesFilters({ quickFilters, isSelected, onToggle, isLoading = false }: RecipesFiltersProps) {
  const { t } = useLingui();
  const allFilter = quickFilters.find((f) => f.id === "all");
  const otherFilters = quickFilters.filter((f) => f.id !== "all");
  const skeletonWidths = [72, 96, 84, 110, 64];

  const filtersButton = (
    <Button size="sm" variant="outline" className="rounded-full px-4 shadow-sm hover:shadow-md">
      <SlidersHorizontal className="h-4 w-4" />
      <Trans>Filters</Trans>
    </Button>
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-border/60 pt-4",
        "md:flex-row md:items-center md:justify-between",
      )}
    >
      <div className={cn("flex min-w-0 flex-1 flex-col gap-3", "md:flex-row md:items-center md:gap-2")}>
        <div className="flex items-center justify-between gap-2 md:justify-start">
          {isLoading ? (
            <Skeleton height={36} width={84} borderRadius={999} />
          ) : allFilter ? (
            <Button
              size="sm"
              variant={isSelected(allFilter.id) ? "secondary" : "outline"}
              className={cn("shrink-0 rounded-full px-4 transition-shadow", isSelected(allFilter.id) && "bg-secondary")}
              aria-pressed={isSelected(allFilter.id)}
              onClick={() => onToggle(allFilter.id)}
            >
              {t(allFilter.label)}
            </Button>
          ) : null}
          <div className="md:hidden">{filtersButton}</div>
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
            : otherFilters.map((filterItem) => {
                const active = isSelected(filterItem.id);

                return (
                  <Button
                    key={filterItem.id}
                    size="sm"
                    variant={active ? "secondary" : "outline"}
                    className="shrink-0 rounded-full px-4 transition-shadow"
                    aria-pressed={active}
                    onClick={() => onToggle(filterItem.id)}
                  >
                    {t(filterItem.label)}
                  </Button>
                );
              })}
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">{filtersButton}</div>
    </div>
  );
}
