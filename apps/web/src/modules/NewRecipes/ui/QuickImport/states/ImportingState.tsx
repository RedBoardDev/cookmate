"use client";

import { useMemo } from "react";
import { useLingui } from "@lingui/react/macro";
import { Check, ChefHat } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";
import type { RecipeSourceType } from "@/modules/NewRecipes/domain/recipeSource.vo";
import type { RecipeParsingJob } from "@/modules/NewRecipes/application/recipeParsing.types";

interface ImportingStateProps {
  source: RecipeSourceType;
  job: RecipeParsingJob | null;
  onRetry: () => void;
}

interface Step {
  id: string;
  label: string;
}

const DEFAULT_PROGRESS = 0;

export function ImportingState({ source, job, onRetry }: ImportingStateProps) {
  const { t } = useLingui();

  const steps: Step[] = useMemo(
    () => [
      { id: "warming", label: t`Warming up the kitchen` },
      { id: "measuring", label: t`Gathering ingredients` },
      { id: "plating", label: t`Adding the final touches` }
    ],
    [t]
  );

  const progress = job?.progress?.percent ?? DEFAULT_PROGRESS;
  const isFailed = job?.status === "FAILED" || job?.status === "CANCELLED";

  const currentStepIndex = useMemo(() => {
    if (progress < 30) return 0;
    if (progress < 80) return 1;
    return 2;
  }, [progress]);

  const sourceLabel = useMemo(() => {
    switch (source) {
      case "link":
        return t`a website`;
      case "text":
        return t`your notes`;
      case "image":
        return t`a photo`;
      default:
        return t`a source`;
    }
  }, [source, t]);

  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(var(--primary) ${progress}%, var(--muted) 0%)`
    }),
    [progress]
  );

  if (isFailed) {
    return (
      <div className="space-y-6 py-2">
        <div className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3">
          <p className="text-sm font-medium text-destructive">
            {job?.error?.message ?? t`We couldn't parse this recipe.`}
          </p>
        </div>
        <Button className="w-full" onClick={onRetry}>
          {t`Back`}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-2">
      <div className="space-y-5 text-center">
        <div className="relative mx-auto h-28 w-28">
          <div
            className="absolute inset-0 rounded-full p-[4px]"
            style={ringStyle}
          >
            <div className="h-full w-full rounded-full bg-background" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground shadow-sm">
              <ChefHat className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-xl font-semibold text-foreground">
            {t`Preparing your recipe`}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t`From ${sourceLabel}`}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isActive = index === currentStepIndex;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-transparent px-3 py-2 transition-all",
                isActive && "border-primary/20 bg-primary/5",
                isCompleted && "opacity-70"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full transition-all",
                  isCompleted && "bg-primary text-primary-foreground",
                  isActive && "bg-primary/15 text-primary",
                  !isCompleted && !isActive && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-semibold">{index + 1}</span>
                )}
              </div>

              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive && "text-foreground",
                    !isActive && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
              </div>

              {isActive && (
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border/60 bg-muted/30 px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          {t`Please wait, we'll redirect you to the editor when ready.`}
        </p>
      </div>
    </div>
  );
}
