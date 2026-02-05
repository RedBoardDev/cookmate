"use client";

import { QuickImportView } from "./QuickImportView";
import { useQuickImport } from "./hooks/useQuickImport";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/primitives/card";

export function QuickImportScreen() {
  const {
    inputValue,
    setInputValue,
    file,
    setFile,
    detectedType,
    isValid,
    isImporting,
    isSubmitting,
    error,
    parsingJob,
    startImport,
    resetImport,
    goToManualEntry
  } = useQuickImport();

  return (
    <section className="mx-auto w-full max-w-xl px-4 pb-16 pt-8 md:pb-20 md:pt-12">
      <Card
        variant="soft"
        border="soft"
        shadow="elevated"
        radius="2xl"
        padding="md"
        className={cn(
          "md:rounded-3xl md:p-8",
          "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2"
        )}
      >
        <QuickImportView
          inputValue={inputValue}
          file={file}
          detectedType={detectedType}
          isValid={isValid}
          isImporting={isImporting}
          isSubmitting={isSubmitting}
          error={error}
          parsingJob={parsingJob.job}
          onInputChange={setInputValue}
          onFileChange={setFile}
          onImport={startImport}
          onManualEntry={goToManualEntry}
          onRetryImport={resetImport}
        />
      </Card>
    </section>
  );
}
