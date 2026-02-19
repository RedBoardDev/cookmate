"use client";

import type { RecipeSource } from "@cookmate/domain/recipe";
import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Trans, useLingui } from "@lingui/react/macro";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/primitives/badge";
import { Button } from "@/shared/ui/primitives/button";

const SOURCE_LABELS: Record<RecipeSource, MessageDescriptor> = {
  MANUAL: msg`Manual entry`,
  IMPORT_URL: msg`Website import`,
  IMPORT_SOCIAL_NETWORK: msg`Social import`,
  IMPORT_IMAGE: msg`Image import`,
  IMPORT_TEXT: msg`Text import`,
  FORK_DISCOVER: msg`Discover recipe`,
};

interface HeroContentProps {
  title?: string;
  description?: string;
  tags?: readonly string[];
  source?: { type: RecipeSource; url: string } | null;
  isLoading?: boolean;
}

export function HeroContent({ title, description, tags, source, isLoading = false }: HeroContentProps) {
  const { t } = useLingui();
  const tagSkeletons = [68, 84, 56];
  const safeTags = tags ?? [];
  const sourceLabel = source ? t(SOURCE_LABELS[source.type]) : null;

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8">
      <div className="hidden md:flex">
        <Button
          asChild
          variant="ghost"
          className="h-8 gap-2 rounded-full px-3 text-muted-foreground hover:bg-muted/60"
          aria-label={t`Back to recipes`}
        >
          <Link href="/recipes">
            <ArrowLeft className="h-4 w-4" />
            <Trans>Back to recipes</Trans>
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isLoading
          ? tagSkeletons.map((width, index) => (
              <Skeleton key={`${width}-${index}`} width={width} height={20} borderRadius={999} />
            ))
          : safeTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={cn("rounded-full border-border/60 bg-muted/60", "text-xs font-medium text-muted-foreground")}
              >
                {tag}
              </Badge>
            ))}
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <h1 className="text-2xl font-display tracking-tight md:text-3xl">
            {isLoading ? <Skeleton width="80%" /> : title}
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
            {isLoading ? <Skeleton count={2} /> : description}
          </p>
        </div>

        {isLoading ? (
          <Skeleton width={160} />
        ) : source && sourceLabel ? (
          <Link
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-primary transition-colors",
              "hover:text-primary/80 hover:underline hover:underline-offset-4",
            )}
          >
            <ExternalLink className="h-4 w-4" />
            {sourceLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
