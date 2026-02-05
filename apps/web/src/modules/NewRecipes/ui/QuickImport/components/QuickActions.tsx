"use client";

import { useLingui } from "@lingui/react/macro";
import { Sparkles, PenLine } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";

interface QuickActionsProps {
  onImport: () => void;
  onManualEntry: () => void;
  isImportDisabled?: boolean;
  isSubmitting?: boolean;
}

export function QuickActions({
  onImport,
  onManualEntry,
  isImportDisabled = false,
  isSubmitting = false
}: QuickActionsProps) {
  const { t } = useLingui();

  return (
    <div className="space-y-5">
      <Button
        type="button"
        className="h-12 w-full gap-2 text-base"
        onClick={onImport}
        disabled={isImportDisabled || isSubmitting}
      >
        <Sparkles className="h-5 w-5" />
        {isSubmitting ? t`Importing...` : t`Import`}
      </Button>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <span className="relative bg-background px-4 text-sm text-muted-foreground">
          {t`or create from scratch`}
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full gap-2 text-base"
        onClick={onManualEntry}
        disabled={isSubmitting}
      >
        <PenLine className="h-5 w-5" />
        {t`Manual entry`}
      </Button>
    </div>
  );
}
