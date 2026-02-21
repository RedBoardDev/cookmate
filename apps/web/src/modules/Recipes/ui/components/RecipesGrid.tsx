"use client";

import { useLingui } from "@lingui/react/macro";
import { Clock, Users } from "lucide-react";
import type { RecipeEntity } from "@/modules/Recipes/domain/entity/recipe.entity";
import { QUICK_FILTER_LABELS } from "@/modules/Recipes/domain/vo/recipes.filters";
import { RecipeCard } from "@/modules/Recipes/ui/components/RecipeCard";
import { RecipesInfiniteFooter } from "@/modules/Recipes/ui/components/RecipesInfiniteFooter";

interface RecipesGridProps {
  recipes: RecipeEntity[];
  isLoading?: boolean;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  hasLoadMoreError?: boolean;
  onLoadMore?: () => void;
  onRetryLoadMore?: () => void;
}

export function RecipesGrid({
  recipes,
  isLoading = false,
  hasNextPage = false,
  isFetchingNextPage = false,
  hasLoadMoreError = false,
  onLoadMore,
  onRetryLoadMore,
}: RecipesGridProps) {
  const { t } = useLingui();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 motion-safe:animate-in motion-safe:fade-in-0">
        {Array.from({ length: 6 }).map((_, index) => (
          <RecipeCard key={`skeleton-${index}`} isLoading />
        ))}
      </div>
    );
  }

  return (
    <div className="motion-safe:animate-in motion-safe:fade-in-0">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((entity) => {
          const meta = [
            {
              icon: Clock,
              text: entity.formattedDuration,
            },
            {
              icon: Users,
              text: t`${entity.servings} servings`,
            },
          ];

          const tags = entity.tags.map((tag) => (QUICK_FILTER_LABELS[tag] ? t(QUICK_FILTER_LABELS[tag]) : tag));

          return (
            <RecipeCard
              key={entity.id}
              title={entity.title}
              meta={meta}
              tags={tags}
              imageUrl={entity.imageUrl}
              href={entity.href}
            />
          );
        })}
      </div>

      <RecipesInfiniteFooter
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasLoadMoreError={hasLoadMoreError}
        onLoadMore={onLoadMore}
        onRetryLoadMore={onRetryLoadMore}
      />
    </div>
  );
}
