"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";

interface RecipeEditorHeaderProps {
  disabled?: boolean;
}

export function RecipeEditorHeader({ disabled }: RecipeEditorHeaderProps) {
  const { t } = useLingui();

  return (
    <div className="space-y-3">
      <Button
        asChild
        variant="ghost"
        disabled={disabled}
        className={cn("h-7 w-fit gap-1.5 px-0 text-xs text-muted-foreground", "hover:bg-transparent hover:text-foreground")}
      >
        <Link href="/recipes">
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <Trans>Back</Trans>
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className="text-xl font-display font-semibold text-foreground md:text-2xl">
          <Trans>New recipe</Trans>
        </h1>
        <p className="text-sm text-muted-foreground">
          {disabled ? t`Please wait while we import your recipe…` : t`Review, refine, and save your recipe.`}
        </p>
      </div>
    </div>
  );
}
