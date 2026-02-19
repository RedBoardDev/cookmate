"use client";

import type { ReactNode } from "react";
import type { RecipeDetailAggregate } from "@/modules/RecipeDetail/domain/entity/recipeDetail.aggregate";
import { Card } from "@/shared/ui/primitives/card";
import { HeroActions } from "./Actions";
import { HeroContent } from "./Content";
import { HeroCta } from "./Cta";
import { HeroImage } from "./Image";
import { HeroStats } from "./Stats";

interface HeroProps {
  detail?: RecipeDetailAggregate;
  isLoading?: boolean;
  onOpenCollections?: () => void;
  onShare?: () => void;
  disableCollections?: boolean;
  disableShare?: boolean;
  collectionsModal?: ReactNode;
}

export function Hero({
  detail,
  isLoading = false,
  onOpenCollections,
  onShare,
  disableCollections = false,
  disableShare = false,
  collectionsModal,
}: HeroProps) {
  const source =
    detail?.sourceUrl
      ? {
          type: detail.source,
          url: detail.sourceUrl,
        }
      : null;

  return (
    <div className="relative motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2">
      <div className="pointer-events-none absolute right-0 top-6 z-10 hidden translate-x-1/2 md:flex">
        <HeroActions
          variant="desktop"
          isLoading={isLoading}
          onOpenCollections={onOpenCollections}
          onShare={onShare}
          disableCollections={disableCollections}
          disableShare={disableShare}
        />
      </div>

      <Card variant="soft" border="soft" shadow="elevated" radius="3xl" className="relative overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)]">
          <HeroImage
            images={detail?.imageItems}
            isLoading={isLoading}
            actions={
              <HeroActions
                variant="mobile"
                isLoading={isLoading}
                onOpenCollections={onOpenCollections}
                onShare={onShare}
                disableCollections={disableCollections}
                disableShare={disableShare}
              />
            }
          />

          <div className="flex flex-col gap-6">
            <HeroContent
              title={detail?.title}
              description={detail?.description}
              tags={detail?.tags}
              source={source}
              isLoading={isLoading}
            />

            <div className="px-6 md:px-8">
              <HeroStats
                totalMinutes={detail?.totalTimeMin}
                servings={detail?.servings}
                difficulty={detail?.difficulty}
                isLoading={isLoading}
              />
            </div>

            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <HeroCta isLoading={isLoading} />
            </div>
          </div>
        </div>
      </Card>

      {collectionsModal}
    </div>
  );
}
