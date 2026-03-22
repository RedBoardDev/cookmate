"use client";

import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

interface RecipeErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RecipeError({ error, reset }: RecipeErrorProps) {
  useEffect(() => {
    console.error("Recipe error:", error);
  }, [error]);

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16">
      <Card className="rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-display">
            <Trans>Error loading recipe</Trans>
          </h1>
          <p className="text-sm text-muted-foreground">
            <Trans>We couldn&apos;t load this recipe. Please try again.</Trans>
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button onClick={reset} variant="outline" className="rounded-xl px-6">
              <Trans>Try again</Trans>
            </Button>
            <Button asChild className="rounded-xl px-6">
              <Link href="/recipes">
                <Trans>Back to recipes</Trans>
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
