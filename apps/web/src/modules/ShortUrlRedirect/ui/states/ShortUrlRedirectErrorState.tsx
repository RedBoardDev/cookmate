import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

interface ShortUrlRedirectErrorStateProps {
  onRetry?: () => void;
}

export function ShortUrlRedirectErrorState({ onRetry }: ShortUrlRedirectErrorStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <Card className="w-full max-w-xl rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-display">
            <Trans>Invalid link</Trans>
          </h1>
          <p className="text-sm text-muted-foreground">
            <Trans>This link does not correspond to an available recipe.</Trans>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {onRetry ? (
              <Button type="button" variant="outline" className="rounded-xl px-6" onClick={onRetry}>
                <Trans>Retry</Trans>
              </Button>
            ) : null}
            <Button asChild className="rounded-xl px-6">
              <Link href="/recipes">
                <Trans>Back to recipes</Trans>
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
