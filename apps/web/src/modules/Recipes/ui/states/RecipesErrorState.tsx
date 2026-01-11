import { AlertTriangle } from "lucide-react";
import { Button } from "@heroui/react";

interface RecipesErrorStateProps {
  onRetry?: () => void;
}

export function RecipesErrorState({ onRetry }: RecipesErrorStateProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="rounded-xl border border-border/70 bg-card/95 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                We couldn&apos;t load your recipes
              </h2>
              <p className="text-sm text-muted-foreground">
                Check your connection and try again.
              </p>
            </div>
          </div>
          {onRetry ? (
            <Button
              size="sm"
              radius="full"
              variant="bordered"
              onPress={onRetry}
            >
              Try again
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
