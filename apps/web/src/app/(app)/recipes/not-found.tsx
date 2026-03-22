import { Trans } from "@lingui/react/macro";
import Link from "next/link";
import { withLinguiPage } from "@/shared/core/i18n/withLingui";
import { Button } from "@/shared/ui/primitives/button";
import { Card } from "@/shared/ui/primitives/card";

function NotFound() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16">
      <Card className="rounded-3xl border border-border/70 bg-card/95 p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-display">
            <Trans>Recipe not found</Trans>
          </h1>
          <p className="text-sm text-muted-foreground">
            <Trans>The recipe you&apos;re looking for doesn&apos;t exist or was removed.</Trans>
          </p>
          <Button asChild className="rounded-xl px-6">
            <Link href="/recipes">
              <Trans>Back to recipes</Trans>
            </Link>
          </Button>
        </div>
      </Card>
    </section>
  );
}

export default withLinguiPage(NotFound);
