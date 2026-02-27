import { Trans } from "@lingui/react/macro";
import { Calendar, ShoppingCart } from "lucide-react";
import { Button } from "@/shared/ui/primitives/button";

interface HeroCtaProps {
  isLoading?: boolean;
}

export function HeroCta({ isLoading = false }: HeroCtaProps) {
  return (
    <div className="flex flex-col gap-3">
      <Button
        className="h-11 w-full rounded-2xl px-6 shadow-sm transition-shadow hover:shadow-md"
        disabled={isLoading}
      >
        <Trans>Start cooking</Trans>
      </Button>
      <div className="grid grid-cols-2 gap-2.5">
        <Button
          variant="outline"
          className="h-11 min-w-0 rounded-2xl px-4 shadow-sm transition-shadow hover:shadow-md md:px-6"
          disabled={isLoading}
        >
          <Calendar className="h-4 w-4" />
          <Trans>Plan it</Trans>
        </Button>
        <Button
          variant="outline"
          className="h-11 min-w-0 rounded-2xl px-4 shadow-sm transition-shadow hover:shadow-md md:px-6"
          disabled={isLoading}
        >
          <ShoppingCart className="h-4 w-4" />
          <Trans>Add to groceries</Trans>
        </Button>
      </div>
    </div>
  );
}
