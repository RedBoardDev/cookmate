"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

interface ShortUrlRedirectViewProps {
  recipeId: string;
}

export function ShortUrlRedirectView({ recipeId }: ShortUrlRedirectViewProps) {
  const router = useRouter();
  const redirectUrl = `/recipes/${recipeId}`;

  useEffect(() => {
    router.replace(redirectUrl);
  }, [router, redirectUrl]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <Card className="w-full max-w-xl rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-display">Redirecting...</h1>
          <p className="text-sm text-muted-foreground">
            If nothing happens, you can open the recipe manually.
          </p>
          <Button asChild className="rounded-xl px-6">
            <Link href={redirectUrl}>Open recipe</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
