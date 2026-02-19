import type { ReactNode } from "react";
import type { RecipeDetailAggregate } from "@/modules/RecipeDetail/domain/entity/recipeDetail.aggregate";
import { DetailSections } from "@/modules/RecipeDetail/ui/components/DetailSections";
import { Hero } from "@/modules/RecipeDetail/ui/components/hero/Hero";

interface RecipeDetailViewProps {
  detail?: RecipeDetailAggregate;
  isLoading?: boolean;
  onOpenCollections?: () => void;
  onShare?: () => void;
  disableCollections?: boolean;
  disableShare?: boolean;
  collectionsModal?: ReactNode;
}

export function RecipeDetailView({
  detail,
  isLoading = false,
  onOpenCollections,
  onShare,
  disableCollections,
  disableShare,
  collectionsModal,
}: RecipeDetailViewProps) {
  if (!detail && !isLoading) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:pb-20">
      <div className="flex flex-col gap-8 md:gap-10">
        <Hero
          detail={detail}
          isLoading={isLoading}
          onOpenCollections={onOpenCollections}
          onShare={onShare}
          disableCollections={disableCollections}
          disableShare={disableShare}
          collectionsModal={collectionsModal}
        />
        <DetailSections detail={detail} isLoading={isLoading} />
      </div>
    </section>
  );
}
