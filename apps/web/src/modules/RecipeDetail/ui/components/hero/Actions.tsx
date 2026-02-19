"use client";
import { useLingui } from "@lingui/react/macro";
import { FolderOpen, Pencil, Share2 } from "lucide-react";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";

interface HeroActionsProps {
  variant?: "desktop" | "mobile";
  isLoading?: boolean;
  onEdit?: () => void;
  onOpenCollections?: () => void;
  onShare?: () => void;
  disableCollections?: boolean;
  disableShare?: boolean;
}

export function HeroActions({
  variant = "desktop",
  isLoading = false,
  onEdit,
  onOpenCollections,
  onShare,
  disableCollections = false,
  disableShare = false,
}: HeroActionsProps) {
  const { t } = useLingui();
  if (isLoading) return null;

  const isDesktop = variant === "desktop";
  const buttonClass = cn(
    "h-9 w-9 rounded-xl border-border/60",
    "bg-background/90 text-muted-foreground shadow-sm backdrop-blur",
    "transition-colors hover:text-foreground",
    "focus-visible:ring-2 focus-visible:ring-accent/40",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    isDesktop ? "" : "h-8 w-8 bg-background/80",
  );

  return (
    <div className={cn("flex items-center gap-2", isDesktop ? "pointer-events-auto flex-col" : "pointer-events-auto")}>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className={buttonClass}
        aria-label={t`Edit recipe`}
        onClick={onEdit}
        disabled={!onEdit}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className={buttonClass}
        aria-label={t`Add to collection`}
        onClick={onOpenCollections}
        disabled={disableCollections || !onOpenCollections}
      >
        <FolderOpen className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="outline"
        className={buttonClass}
        aria-label={t`Share recipe`}
        onClick={onShare}
        disabled={disableShare || !onShare}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
