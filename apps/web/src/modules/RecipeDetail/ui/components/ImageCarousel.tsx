"use client";

import { useLingui } from "@lingui/react/macro";
import type { SyntheticEvent } from "react";
import type { RecipeImageItem } from "@/modules/RecipeDetail/domain/vo/recipeImages.vo";
import { cn } from "@/shared/core/utils/cn";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/primitives/carousel";

const FALLBACK_IMAGE_SRC = "/image_not_found.png";

function FallbackImage({ alt, onError }: { alt: string; onError: (e: SyntheticEvent<HTMLImageElement>) => void }) {
  return (
    <div className="h-full">
      <img
        src={FALLBACK_IMAGE_SRC}
        alt={alt}
        onError={onError}
        className="block h-full w-full bg-muted/20 object-contain object-center"
      />
    </div>
  );
}

interface ImageCarouselProps {
  images: readonly RecipeImageItem[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const { t } = useLingui();
  const availableImages = images.filter((image) => image.src?.trim());
  const hasMultipleImages = availableImages.length > 1;

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === "true") {
      return;
    }

    target.dataset.fallbackApplied = "true";
    target.src = FALLBACK_IMAGE_SRC;
  };

  if (availableImages.length === 0) {
    return <FallbackImage alt={t`Recipe image not available`} onError={handleImageError} />;
  }

  if (availableImages.length === 1) {
    const image = availableImages[0];
    const imageSrc = image.src ?? FALLBACK_IMAGE_SRC;

    return (
      <div className="h-full">
        <img
          src={imageSrc}
          alt={image.alt || t`Recipe image`}
          onError={handleImageError}
          className="block h-full w-full bg-muted/20 object-contain object-center"
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <Carousel
        opts={{ loop: hasMultipleImages }}
        className="group h-full min-h-0 flex-1 cursor-grab active:cursor-grabbing"
      >
        <CarouselContent containerClassName="h-full" className="ml-0 h-full items-stretch">
          {availableImages.map((image, index) => {
            const imageSrc = image.src ?? FALLBACK_IMAGE_SRC;

            return (
              <CarouselItem key={image.src ?? `fallback-${index}`} className="h-full pl-0">
                <img
                  src={imageSrc}
                  alt={image.alt || t`Recipe image`}
                  onError={handleImageError}
                  className="block h-full w-full bg-muted/20 object-contain object-center"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {hasMultipleImages ? (
          <>
            <CarouselPrevious
              variant="ghost"
              className={cn(
                "left-3 h-9 w-9 rounded-full border border-border/60 bg-background/85",
                "p-0 text-foreground/80 shadow-md backdrop-blur opacity-70 transition-all",
                "hover:text-foreground group-hover:opacity-100",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "[&_svg]:size-5",
              )}
              aria-label={t`Previous image`}
            />
            <CarouselNext
              variant="ghost"
              className={cn(
                "right-3 h-9 w-9 rounded-full border border-border/60 bg-background/85",
                "p-0 text-foreground/80 shadow-md backdrop-blur opacity-70 transition-all",
                "hover:text-foreground group-hover:opacity-100",
                "focus-visible:ring-2 focus-visible:ring-accent/40",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "[&_svg]:size-5",
              )}
              aria-label={t`Next image`}
            />
          </>
        ) : null}
      </Carousel>
    </div>
  );
}
