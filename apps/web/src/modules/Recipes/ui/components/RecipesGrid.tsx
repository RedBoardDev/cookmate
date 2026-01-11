import { Clock, Users } from "lucide-react";
import { RecipeCard } from "@/modules/Recipes/ui/components/RecipeCard";
import { QUICK_FILTER_LABELS } from "@/modules/Recipes/domain/recipes.filters";
import type { RecipeTag } from "@cookmate/domain/recipe";
import type { RecipeAggregate } from "@/modules/Recipes/domain/recipe.aggregate";

function formatDuration(totalMinutes: number) {
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

interface RecipesGridProps {
  recipes: RecipeAggregate[];
  isLoading?: boolean;
}

export function RecipesGrid({ recipes, isLoading = false }: RecipesGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <RecipeCard key={`skeleton-${index}`} isLoading />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {recipes.map((aggregate) => {
        const { recipe } = aggregate;
        const meta = [
          {
            icon: Clock,
            text: formatDuration(recipe.totalTimeMin)
          },
          {
            icon: Users,
            text: `${recipe.servings} servings`
          }
        ];

        const tags = recipe.tags.map(
          (tag: RecipeTag) => QUICK_FILTER_LABELS[tag] ?? tag
        );

        return (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            meta={meta}
            tags={tags}
            imageUrl={aggregate.imageUrl}
            href={aggregate.href}
          />
        );
      })}
    </div>
  );
}
