"use client";

import type { RecipeDetailAggregate } from "@/modules/RecipeDetail/domain/entity/recipeDetail.aggregate";
import { useRecipeSections } from "@/modules/RecipeDetail/ui/hooks/useRecipeSections";
import { cn } from "@/shared/core/utils/cn";
import { IngredientsCard } from "./IngredientsCard";
import { Instructions } from "./Instructions";
import { SectionTabs } from "./SectionTabs";

interface DetailSectionsProps {
  detail?: RecipeDetailAggregate;
  servings?: number;
  onDecreaseServings?: () => void;
  onIncreaseServings?: () => void;
  isLoading?: boolean;
}

export function DetailSections({
  detail,
  servings,
  onDecreaseServings,
  onIncreaseServings,
  isLoading = false,
}: DetailSectionsProps) {
  const { activeSection, onSelect } = useRecipeSections();
  const shouldUseHandlers = !isLoading && detail !== undefined && servings !== undefined;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <SectionTabs activeSection={activeSection} onChange={onSelect} />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div
          className={cn(
            activeSection === "ingredients" ? "block" : "hidden",
            "lg:sticky lg:top-28 lg:block lg:w-80 lg:shrink-0",
          )}
        >
          <IngredientsCard
            ingredients={detail?.ingredients}
            defaultServings={detail?.servings}
            servings={shouldUseHandlers ? servings : undefined}
            onDecrease={shouldUseHandlers ? onDecreaseServings : undefined}
            onIncrease={shouldUseHandlers ? onIncreaseServings : undefined}
            isLoading={isLoading}
          />
        </div>

        <div className={cn(activeSection === "steps" ? "block" : "hidden", "lg:block lg:min-w-0 lg:flex-1")}>
          <Instructions instructions={detail?.instructions} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
