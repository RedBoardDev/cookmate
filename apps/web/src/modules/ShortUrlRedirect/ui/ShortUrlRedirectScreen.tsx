"use client";

import { useShortUrlRedirectScreen } from "@/modules/ShortUrlRedirect/ui/hooks/useShortUrlRedirectScreen";
import { ShortUrlRedirectView } from "./ShortUrlRedirectView";
import { ShortUrlRedirectErrorState } from "./states/ShortUrlRedirectErrorState";
import { ShortUrlRedirectLoadingState } from "./states/ShortUrlRedirectLoadingState";

interface ShortUrlRedirectScreenProps {
  shortUrl: string;
}

export function ShortUrlRedirectScreen({ shortUrl }: ShortUrlRedirectScreenProps) {
  const { redirect, hasError, isLoading, retry } = useShortUrlRedirectScreen(shortUrl);

  if (isLoading) {
    return <ShortUrlRedirectLoadingState />;
  }

  if (hasError || !redirect) {
    return <ShortUrlRedirectErrorState onRetry={retry} />;
  }

  return <ShortUrlRedirectView redirectPath={redirect.targetPath} />;
}
