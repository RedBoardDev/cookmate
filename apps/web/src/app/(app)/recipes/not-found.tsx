import Link from "next/link";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16">
      <Card className="rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-display">Recipe not found</h1>
          <p className="text-sm text-muted-foreground">
            The recipe you&apos;re looking for doesn&apos;t exist or was removed.
          </p>
          <Button asChild className="rounded-xl px-6">
            <Link href="/recipes">Back to recipes</Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}
