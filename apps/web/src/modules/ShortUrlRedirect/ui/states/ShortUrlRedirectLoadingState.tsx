import { Card } from "@/shared/ui/primitives/card";
import { Skeleton } from "@/shared/ui/primitives/skeleton";

export function ShortUrlRedirectLoadingState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <Card className="w-full max-w-xl rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-8 w-48" />
          <Skeleton className="mx-auto h-4 w-64" />
          <Skeleton className="mx-auto h-10 w-32" />
        </div>
      </Card>
    </main>
  );
}
