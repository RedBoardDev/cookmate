"use client";

import { useLingui } from "@lingui/react/macro";
import { UnifiedInput } from "./components/UnifiedInput";
import { QuickActions } from "./components/QuickActions";
import { ImportingState } from "./states/ImportingState";
import { ErrorMessage } from "@/shared/ui/form/ErrorMessage";
import type { RecipeSourceType } from "@/modules/NewRecipes/domain/recipeSource.vo";
import type { ResponseErrorConfig } from "@/shared/lib/httpClient";
import type { RecipeParsingJob } from "@/modules/NewRecipes/application/recipeParsing.types";

interface QuickImportViewProps {
  inputValue: string;
  file: File | null;
  detectedType: RecipeSourceType | null;
  isValid: boolean;
  isImporting: boolean;
  isSubmitting: boolean;
  error: ResponseErrorConfig<unknown> | null;
  parsingJob: RecipeParsingJob | null;
  onInputChange: (value: string) => void;
  onFileChange: (file: File | null) => void;
  onImport: () => void;
  onManualEntry: () => void;
  onRetryImport: () => void;
}

export function QuickImportView({
  inputValue,
  file,
  detectedType,
  isValid,
  isImporting,
  isSubmitting,
  error,
  parsingJob,
  onInputChange,
  onFileChange,
  onImport,
  onManualEntry,
  onRetryImport
}: QuickImportViewProps) {
  const { t } = useLingui();

  if (isImporting && detectedType) {
    return (
      <ImportingState
        source={detectedType}
        job={parsingJob}
        onRetry={onRetryImport}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold font-display text-foreground">
          {t`Quick import`}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t`Paste anything - we'll handle the rest`}
        </p>
      </div>

      <div className="space-y-4">
        <UnifiedInput
          value={inputValue}
          file={file}
          onChange={onInputChange}
          onFileChange={onFileChange}
          disabled={isSubmitting}
        />

        {error && <ErrorMessage error={error} />}
      </div>

      <QuickActions
        onImport={onImport}
        onManualEntry={onManualEntry}
        isImportDisabled={!isValid}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
