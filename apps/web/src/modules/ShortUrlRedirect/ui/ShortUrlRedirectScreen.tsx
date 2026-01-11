"use client";

import { ShortUrlRedirectView } from "./ShortUrlRedirectView";
import { ShortUrlRedirectErrorState } from "./states/ShortUrlRedirectErrorState";
import { ShortUrlRedirectLoadingState } from "./states/ShortUrlRedirectLoadingState";
import { useShortUrlRedirect } from "../api/useShortUrlRedirect";

interface ShortUrlRedirectScreenProps {
  shortUrl: string;
}

export function ShortUrlRedirectScreen({ shortUrl }: ShortUrlRedirectScreenProps) {
  const { recipeId, error, isLoading } = useShortUrlRedirect(shortUrl);

  if (isLoading) {
    return <ShortUrlRedirectLoadingState />;
  }

  if (error || !recipeId) {
    return <ShortUrlRedirectErrorState />;
  }

  return <ShortUrlRedirectView recipeId={recipeId} />;
}
