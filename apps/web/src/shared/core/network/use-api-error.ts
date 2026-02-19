"use client";

import { useLingui } from "@lingui/react/macro";
import { getUserFacingErrorMessage } from "@/shared/core/network/api-error";
import type { ResponseErrorConfig } from "@/shared/core/network/httpClient";

export function useUserFacingErrorMessage(error: ResponseErrorConfig<unknown> | null): string | null {
  const { t } = useLingui();
  if (!error) return null;
  return getUserFacingErrorMessage(t, error);
}
