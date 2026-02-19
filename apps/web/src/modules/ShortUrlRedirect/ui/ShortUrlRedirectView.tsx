"use client";

import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

interface ShortUrlRedirectViewProps {
  redirectPath: string;
}

export function ShortUrlRedirectView({ redirectPath }: ShortUrlRedirectViewProps) {
  const router = useRouter();

  useEffect(() => {
    router.replace(redirectPath);
  }, [router, redirectPath]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <Card className="w-full max-w-xl rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-display">
            <Trans>Redirecting...</Trans>
          </h1>
          <p className="text-sm text-muted-foreground">
            <Trans>If nothing happens, you can open the recipe manually.</Trans>
          </p>
          <Button asChild className="rounded-xl px-6">
            <Link href={redirectPath}>
              <Trans>Open recipe</Trans>
            </Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
