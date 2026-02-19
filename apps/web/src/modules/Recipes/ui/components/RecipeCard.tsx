"use client";
import { Chip } from "@heroui/react";
import { useLingui } from "@lingui/react/macro";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { SyntheticEvent } from "react";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/primitives/card";

const FALLBACK_IMAGE_SRC = "/image_not_found.png";

export type RecipeCardMeta = {
  icon: LucideIcon;
  text: string;
};

export interface RecipeCardProps {
  title?: string;
  meta?: RecipeCardMeta[];
  tags?: string[];
  imageUrl?: string | null;
  href?: string;
  className?: string;
  isLoading?: boolean;
}

export function RecipeCard({
  title,
  meta = [],
  tags = [],
  imageUrl,
  href,
  className,
  isLoading = false,
}: RecipeCardProps) {
  const { t } = useLingui();
  const imageSrc = imageUrl ?? FALLBACK_IMAGE_SRC;

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === "true") return;
    target.dataset.fallbackApplied = "true";
    target.src = FALLBACK_IMAGE_SRC;
  };

  return (
    <Card
      variant="solid"
      border="soft"
      shadow="flat"
      radius="xl"
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        "bg-card/95 transition-colors duration-300",
        "hover:border-primary/20",
        "focus-within:ring-2 focus-within:ring-accent/40",
        "focus-within:ring-offset-2 focus-within:ring-offset-background",
        href && !isLoading ? "cursor-pointer" : "cursor-default",
        className,
      )}
    >
      {href && !isLoading ? (
        <Link href={href} aria-label={t`Open ${title ?? t`recipe`}`} className="absolute inset-0 z-10" />
      ) : null}

      <div className="relative z-20 flex h-full flex-col pointer-events-none">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20">
          {isLoading ? (
            <img
              src={FALLBACK_IMAGE_SRC}
              alt={t`Recipe image not available`}
              onError={handleImageError}
              className="block h-full w-full object-cover object-center"
            />
          ) : (
            <>
              <img
                src={imageSrc}
                alt={title ?? t`Recipe`}
                onError={handleImageError}
                className="block h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="text-base font-semibold text-foreground transition-colors duration-300 group-hover:text-primary md:text-lg">
            {isLoading ? <Skeleton width="70%" /> : title}
          </h3>

          {isLoading ? (
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton width={80} />
              <Skeleton width={90} />
            </div>
          ) : meta.length ? (
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
              {meta.map((item) => (
                <div key={item.text} className="flex items-center gap-1.5">
                  <item.icon className="h-3.5 w-3.5" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          ) : null}

          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              <Skeleton height={20} width={64} borderRadius={999} />
              <Skeleton height={20} width={80} borderRadius={999} />
            </div>
          ) : tags.length ? (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Chip key={tag} variant="soft" size="sm" className="rounded-full bg-muted/70 text-muted-foreground">
                  {tag}
                </Chip>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
