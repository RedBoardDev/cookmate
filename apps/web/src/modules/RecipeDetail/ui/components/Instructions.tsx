import { Trans } from "@lingui/react/macro";
import type { RecipeInstruction } from "@/modules/RecipeDetail/domain/vo/recipeInstruction.vo";
import { StepCard } from "./StepCard";

interface InstructionsProps {
  instructions?: readonly RecipeInstruction[];
  isLoading?: boolean;
}

export function Instructions({ instructions, isLoading = false }: InstructionsProps) {
  const safeInstructions = instructions ?? [];

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight md:text-xl">
        <Trans>Instructions</Trans>
      </h2>
      {isLoading ? (
        <ol className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <StepCard key={`step-skeleton-${index}`} isLoading />
          ))}
        </ol>
      ) : safeInstructions.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          <Trans>No instructions available for this recipe yet.</Trans>
        </p>
      ) : (
        <ol className="flex flex-col gap-4">
          {safeInstructions.map((instruction) => (
            <StepCard key={`step-${instruction.step}`} instruction={instruction} />
          ))}
        </ol>
      )}
    </div>
  );
}
