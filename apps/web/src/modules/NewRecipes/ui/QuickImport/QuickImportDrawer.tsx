"use client";

import { Sheet, SheetContent } from "@/shared/ui/primitives/sheet";
import { QuickImportView } from "./QuickImportView";
import { cn } from "@/shared/lib/utils";
import { useQuickImport } from "./hooks/useQuickImport";

interface QuickImportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickImportDrawer({ isOpen, onClose }: QuickImportDrawerProps) {
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

  const handleManualEntry = () => {
    goToManualEntry();
    onClose();
  };

  const handleClose = () => {
    if (isImporting) return;
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="bottom"
        overlayClassName="bg-black/45 backdrop-blur-[2px]"
        className={cn(
          "border-border/60 bg-background px-0 pb-0 pt-0 shadow-2xl",
          "rounded-t-[28px]"
        )}
      >
        <div className="relative px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6">
          <div className="absolute left-1/2 top-3 h-1 w-12 -translate-x-1/2 rounded-full bg-muted-foreground/30" />

          <div className="pt-4">
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
              onManualEntry={handleManualEntry}
              onRetryImport={resetImport}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
