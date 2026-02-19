import { Trans } from "@lingui/react/macro";
import { Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";

interface HeroCtaProps {
  isLoading?: boolean;
}

export function HeroCta({ isLoading = false }: HeroCtaProps) {
  if (isLoading) return null;

  return (
    <div className="flex flex-col gap-3">
      <Button className="w-full rounded-2xl px-6 shadow-sm">
        <Trans>Start cooking</Trans>
      </Button>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="rounded-2xl px-6 shadow-sm">
          <Calendar className="h-4 w-4" />
          <Trans>Plan it</Trans>
        </Button>
        <Button variant="outline" className="rounded-2xl px-6 shadow-sm">
          <ShoppingCart className="h-4 w-4" />
          <Trans>Add to groceries</Trans>
        </Button>
      </div>
    </div>
  );
}
