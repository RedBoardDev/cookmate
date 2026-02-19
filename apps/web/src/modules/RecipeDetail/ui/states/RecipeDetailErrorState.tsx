import { Trans } from "@lingui/react/macro";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

interface RecipeDetailErrorStateProps {
  onRetry?: () => void;
}

export function RecipeDetailErrorState({ onRetry }: RecipeDetailErrorStateProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10">
      <Card variant="soft" border="soft" shadow="flat" radius="3xl" padding="md" className="md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-sm">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                <Trans>We couldn&apos;t load this recipe</Trans>
              </h2>
              <p className="text-sm text-muted-foreground">
                <Trans>Check your connection and try again.</Trans>
              </p>
            </div>
          </div>
          {onRetry ? (
            <Button size="sm" variant="outline" className="rounded-full px-4" onClick={onRetry}>
              <Trans>Try again</Trans>
            </Button>
          ) : null}
        </div>
      </Card>
    </section>
  );
}
