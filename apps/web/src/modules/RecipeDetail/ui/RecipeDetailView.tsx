import type { ReactNode } from "react";
import type { RecipeDetailAggregate } from "@/modules/RecipeDetail/domain/entity/recipeDetail.aggregate";
import { DetailSections } from "@/modules/RecipeDetail/ui/components/DetailSections";
import { Hero } from "@/modules/RecipeDetail/ui/components/hero/Hero";

interface RecipeDetailViewProps {
  detail?: RecipeDetailAggregate;
  servings?: number;
  onDecreaseServings?: () => void;
  onIncreaseServings?: () => void;
  isLoading?: boolean;
  onEdit?: () => void;
  onOpenCollections?: () => void;
  onShare?: () => void;
  onStartCooking?: () => void;
  disableCollections?: boolean;
  disableShare?: boolean;
  collectionsModal?: ReactNode;
}

export function RecipeDetailView({
  detail,
  servings,
  onDecreaseServings,
  onIncreaseServings,
  isLoading = false,
  onEdit,
  onOpenCollections,
  onShare,
  onStartCooking,
  disableCollections,
  disableShare,
  collectionsModal,
}: RecipeDetailViewProps) {
  if (!detail && !isLoading) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 md:px-5 md:pb-20 md:pt-8">
      <div className="flex flex-col gap-8 md:gap-12">
        <Hero
          detail={detail}
          isLoading={isLoading}
          onEdit={onEdit}
          onOpenCollections={onOpenCollections}
          onShare={onShare}
          onStartCooking={onStartCooking}
          disableCollections={disableCollections}
          disableShare={disableShare}
          collectionsModal={collectionsModal}
        />
        <DetailSections
          detail={detail}
          servings={servings}
          onDecreaseServings={onDecreaseServings}
          onIncreaseServings={onIncreaseServings}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
