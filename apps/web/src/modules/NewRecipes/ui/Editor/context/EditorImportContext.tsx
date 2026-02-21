"use client";

import type { ParsingStatusValue } from "@cookmate/domain/shared/value-objects";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, type ReactNode, useCallback, useContext, useMemo } from "react";
import { useRecipeParsingJob } from "@/modules/NewRecipes/api/useRecipeParsingJob";
import type { ParsedRecipe } from "@/modules/NewRecipes/application/recipeParsing.types";
import type { RecipeSourceType } from "@/modules/NewRecipes/domain/vo/recipeSource.vo";
import { RecipeSource } from "@/modules/NewRecipes/domain/vo/recipeSource.vo";

type ImportStep = "connecting" | "parsing" | "preparing";

interface EditorImportState {
  jobId: string | null;
  isImporting: boolean;
  source: RecipeSourceType | null;
  status: ParsingStatusValue | null;
  progress: number;
  remainingMs: number;
  currentStep: ImportStep;
  parsedRecipe: ParsedRecipe | null;
  error: { code: string; message: string } | null;
  cancel: () => void;
}

const EditorImportContext = createContext<EditorImportState | null>(null);

function isImportingStatus(status: ParsingStatusValue | null) {
  return status === "QUEUED" || status === "PROCESSING";
}

function resolveCurrentStep(progress: number): ImportStep {
  if (progress < 30) return "connecting";
  if (progress < 80) return "parsing";
  return "preparing";
}

export function EditorImportProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceValue = searchParams.get("source");
  const source = useMemo(() => {
    return RecipeSource.fromValue(sourceValue)?.value ?? null;
  }, [sourceValue]);
  const jobId = searchParams.get("jobId");

  const parsingJob = useRecipeParsingJob(jobId, {
    enabled: Boolean(jobId),
  });

  const status = parsingJob.status;
  const progress = parsingJob.progress?.percent ?? 0;
  const isImporting = Boolean(jobId) && (isImportingStatus(status) || parsingJob.isLoading);

  const remainingMs = useMemo(() => {
    if (!isImporting || !parsingJob.job?.createdAt) return 0;
    if (progress <= 0) return 0;

    const startedAt = parsingJob.job.startedAt ?? parsingJob.job.createdAt;
    const elapsed = Date.now() - startedAt.getTime();
    const estimatedTotal = (elapsed / progress) * 100;
    return Math.max(estimatedTotal - elapsed, 0);
  }, [isImporting, parsingJob.job?.createdAt, parsingJob.job?.startedAt, progress]);

  const currentStep = useMemo(() => resolveCurrentStep(progress), [progress]);

  const cancel = useCallback(() => {
    router.push("/recipes");
  }, [router]);

  const value: EditorImportState = useMemo(
    () => ({
      jobId,
      isImporting,
      source,
      status,
      progress,
      remainingMs,
      currentStep,
      parsedRecipe: parsingJob.result,
      error: parsingJob.error,
      cancel,
    }),
    [
      jobId,
      isImporting,
      source,
      status,
      progress,
      remainingMs,
      currentStep,
      parsingJob.result,
      parsingJob.error,
      cancel,
    ],
  );

  return <EditorImportContext.Provider value={value}>{children}</EditorImportContext.Provider>;
}

export function useEditorImport() {
  const context = useContext(EditorImportContext);
  if (!context) {
    throw new Error("useEditorImport must be used within EditorImportProvider");
  }
  return context;
}
