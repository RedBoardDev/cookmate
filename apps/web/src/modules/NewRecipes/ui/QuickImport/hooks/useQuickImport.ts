"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { RecipeSourceType } from "@/modules/NewRecipes/domain/recipeSource.vo";
import { useCreateRecipeParsingJob } from "@/modules/NewRecipes/api/useCreateRecipeParsingJob";
import { useRecipeParsingJob } from "@/modules/NewRecipes/api/useRecipeParsingJob";
import {
  isRecipeParsingSourceSupported,
  RECIPE_PARSING_TYPE_BY_SOURCE
} from "@/modules/NewRecipes/application/recipeParsing.config";

const URL_REGEX = /^https?:\/\//i;

function detectInputType(
  content: string,
  file: File | null
): RecipeSourceType | null {
  if (file) return "image";
  const trimmed = content.trim();
  if (!trimmed) return null;
  if (URL_REGEX.test(trimmed)) return "link";
  return "text";
}

export function useQuickImport() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const detectedType = useMemo(
    () => detectInputType(inputValue, file),
    [inputValue, file]
  );

  const isValid = useMemo(() => {
    if (!detectedType) return false;
    return isRecipeParsingSourceSupported(detectedType);
  }, [detectedType]);

  const createJob = useCreateRecipeParsingJob({
    onSuccess: (job) => {
      setJobId(job.jobId);
    }
  });

  const parsingJob = useRecipeParsingJob(jobId, {
    enabled: Boolean(jobId)
  });

  const isImporting = Boolean(jobId);

  // * Redirect to editor when parsing completes
  useEffect(() => {
    if (!parsingJob.job || !detectedType) return;
    if (parsingJob.job.status !== "COMPLETED") return;

    const params = new URLSearchParams();
    params.set("jobId", parsingJob.job.jobId);
    params.set("source", detectedType);

    router.push(`/recipes/editor?${params.toString()}`);

    setJobId(null);
    setInputValue("");
    setFile(null);
  }, [parsingJob.job, router, detectedType]);

  const startImport = useCallback(() => {
    if (!detectedType || isImporting) return;
    if (!isRecipeParsingSourceSupported(detectedType)) return;

    const parsingType = RECIPE_PARSING_TYPE_BY_SOURCE[detectedType];

    if (parsingType === "URL" && inputValue.trim()) {
      createJob.reset();
      createJob.mutate({
        type: parsingType,
        url: inputValue.trim()
      });
    }

    // TODO: Handle TEXT and IMAGE parsing when API supports it
  }, [createJob, detectedType, inputValue, isImporting]);

  const resetImport = useCallback(() => {
    setJobId(null);
  }, []);

  const goToManualEntry = useCallback(() => {
    router.push("/recipes/editor");
  }, [router]);

  const clear = useCallback(() => {
    setInputValue("");
    setFile(null);
    setJobId(null);
    createJob.reset();
  }, [createJob]);

  const submitError = useMemo(() => createJob.error ?? null, [createJob.error]);

  return {
    // Input state
    inputValue,
    setInputValue,
    file,
    setFile,

    // Derived
    detectedType,
    isValid,

    // Actions
    startImport,
    resetImport,
    goToManualEntry,
    clear,

    // Import state
    isImporting,
    isSubmitting: createJob.isPending,
    error: submitError,
    parsingJob
  };
}
