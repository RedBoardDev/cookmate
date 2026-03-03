"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/shared/core/utils/cn";
import { getRecipeDetailPath } from "@/shared/core/utils/recipePaths";
import { Button } from "@/shared/ui/primitives/button";
import type { RecipeEditorMode } from "../recipeEditor.types";

interface RecipeEditorHeaderProps {
  mode: RecipeEditorMode;
  disabled?: boolean;
  recipeId?: string;
  hasImportInProgress?: boolean;
}

export function RecipeEditorHeader({ mode, disabled, recipeId, hasImportInProgress = false }: RecipeEditorHeaderProps) {
  const { t } = useLingui();
  const backHref = mode === "edit" && recipeId ? getRecipeDetailPath(recipeId) : "/recipes";

  return (
    <div className="space-y-3">
      <Button
        asChild
        variant="ghost"
        disabled={disabled}
        className={cn(
          "h-7 w-fit gap-1.5 px-0 text-xs text-muted-foreground",
          "hover:bg-transparent hover:text-foreground",
        )}
      >
        <Link href={backHref}>
          <ArrowLeft className="h-4 w-4" aria-hidden />
          <Trans>Back</Trans>
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className="text-xl font-display font-semibold text-foreground md:text-2xl">
          {mode === "edit" ? t`Edit recipe` : t`New recipe`}
        </h1>
        <p className="text-sm text-muted-foreground">
          {hasImportInProgress
            ? t`Please wait while we import your recipe…`
            : mode === "edit"
              ? t`Update the details and save your changes.`
              : t`Review, refine, and save your recipe.`}
        </p>
      </div>
    </div>
  );
}
