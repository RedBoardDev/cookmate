"use client";

import { Lightbulb, Timer } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import type { RecipeInstruction } from "@/modules/RecipeDetail/domain/vo/recipeInstruction.vo";
import { cn } from "@/shared/core/utils/cn";
import { Card } from "@/shared/ui/primitives/card";

interface StepCardProps {
  instruction?: RecipeInstruction;
  isLoading?: boolean;
}

export function StepCard({ instruction, isLoading = false }: StepCardProps) {
  if (isLoading || !instruction) {
    return (
      <Card variant="soft" border="soft" shadow="flat" radius="2xl" className="p-5">
        <div className="flex items-start gap-4">
          <Skeleton circle width={36} height={36} />
          <div className="flex flex-1 flex-col gap-3">
            <Skeleton count={2} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="soft" border="soft" shadow="flat" radius="2xl" className="p-5">
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            "bg-muted text-sm font-semibold text-foreground",
          )}
        >
          {instruction.step}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <p className="text-sm leading-relaxed text-foreground">{instruction.description}</p>

          {instruction.duration ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Timer className="h-3.5 w-3.5" />
              <span>{instruction.duration.toDisplayString()}</span>
            </div>
          ) : null}

          {instruction.tip ? (
            <div
              className={cn("flex items-start gap-2 rounded-xl bg-accent/15 px-3 py-2", "text-xs text-foreground/80")}
            >
              <Lightbulb className="mt-0.5 h-3.5 w-3.5 text-accent-foreground" />
              <span>{instruction.tip}</span>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
