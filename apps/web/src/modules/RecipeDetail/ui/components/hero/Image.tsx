import { useLingui } from "@lingui/react/macro";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { RecipeImageItem } from "@/modules/RecipeDetail/domain/vo/recipeImages.vo";
import { Button } from "@/shared/ui/primitives/button";
import { ImageCarousel } from "../ImageCarousel";

interface HeroImageProps {
  images?: readonly RecipeImageItem[];
  isLoading?: boolean;
  actions?: ReactNode;
}

export function HeroImage({ images, isLoading = false, actions }: HeroImageProps) {
  const { t } = useLingui();
  const visibleImages = isLoading ? [] : (images ?? []);

  return (
    <div className="min-w-0 overflow-hidden border-b border-border/60 bg-muted/20 md:relative md:min-h-0 md:self-stretch md:border-b-0 md:border-r">
      <div className="relative aspect-[4/3] w-full overflow-hidden md:absolute md:inset-0 md:h-auto md:aspect-auto">
        <div className="absolute left-4 top-4 z-10 md:hidden">
          <Button
            asChild
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-xl border-border/60 bg-background/80 text-muted-foreground shadow-sm backdrop-blur"
            aria-label={t`Back to recipes`}
          >
            <Link href="/recipes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {actions ? (
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2 md:hidden">{actions}</div>
        ) : null}
        <ImageCarousel images={visibleImages} />
      </div>
    </div>
  );
}
