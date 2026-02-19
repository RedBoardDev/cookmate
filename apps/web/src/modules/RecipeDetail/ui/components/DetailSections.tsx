"use client";

import type { RecipeDetailAggregate } from "@/modules/RecipeDetail/domain/entity/recipeDetail.aggregate";
import { useRecipeSections } from "@/modules/RecipeDetail/ui/hooks/useRecipeSections";
import { useServingsStepper } from "@/modules/RecipeDetail/ui/hooks/useServingsStepper";
import { cn } from "@/shared/lib/utils";
import { IngredientsCard } from "./IngredientsCard";
import { Instructions } from "./Instructions";
import { SectionTabs } from "./SectionTabs";

interface DetailSectionsProps {
  detail?: RecipeDetailAggregate;
  isLoading?: boolean;
}

export function DetailSections({ detail, isLoading = false }: DetailSectionsProps) {
  const { activeSection, onSelect } = useRecipeSections();
  const { servings, decrement, increment } = useServingsStepper(detail?.servings ?? 1);
  const shouldUseHandlers = !isLoading && detail !== undefined;

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <SectionTabs activeSection={activeSection} onChange={onSelect} />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div
          className={cn(
            activeSection === "ingredients" ? "block" : "hidden",
            "lg:sticky lg:top-24 lg:block lg:w-80 lg:shrink-0",
          )}
        >
          <IngredientsCard
            ingredients={detail?.ingredients}
            servings={shouldUseHandlers ? servings : undefined}
            onDecrease={shouldUseHandlers ? decrement : undefined}
            onIncrease={shouldUseHandlers ? increment : undefined}
            isLoading={isLoading}
          />
        </div>

        <div className={cn(activeSection === "steps" ? "block" : "hidden", "lg:block lg:flex-1")}>
          <Instructions instructions={detail?.instructions} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
