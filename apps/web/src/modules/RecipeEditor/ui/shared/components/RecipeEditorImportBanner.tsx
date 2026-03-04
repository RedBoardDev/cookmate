"use client";

import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react/macro";
import { FileText, X } from "lucide-react";
import { cn } from "@/shared/core/utils/cn";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";
import type { RecipeEditorImportSource, RecipeEditorImportState } from "../recipeEditor.types";

const sourceLabels: Partial<Record<RecipeEditorImportSource, MessageDescriptor>> = {
  URL: msg`website`,
  TEXT: msg`text`,
  IMAGE: msg`photo`,
  PDF: msg`PDF`,
};

interface RecipeEditorImportBannerProps {
  importState?: RecipeEditorImportState | null;
}

export function RecipeEditorImportBanner({ importState }: RecipeEditorImportBannerProps) {
  const { t } = useLingui();

  if (!importState?.isImporting) {
    return null;
  }

  const sourceLabel = importState.source ? t(sourceLabels[importState.source] ?? msg`source`) : t(msg`source`);

  return (
    <Card variant="soft" border="soft" radius="2xl" className="relative overflow-hidden">
      <div
        className={cn("absolute left-0 top-0 h-1 bg-primary transition-all duration-1000", "ease-linear")}
        style={{ width: `${importState.progress}%` }}
      />

      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", "bg-primary/10 text-primary")}>
            <FileText className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">{t`Importing your recipe...`}</p>
            <p className="text-xs text-muted-foreground">{t`From ${sourceLabel} · ${importState.progress}%`}</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={importState.onCancel}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
