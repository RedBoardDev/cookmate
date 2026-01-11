import Link from "next/link";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

export function ShortUrlRedirectErrorState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <Card className="w-full max-w-xl rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-display">Invalid link</h1>
          <p className="text-sm text-muted-foreground">
            This link does not correspond to an available recipe.
          </p>
          <Button asChild className="rounded-xl px-6">
            <Link href="/recipes">Back to recipes</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
