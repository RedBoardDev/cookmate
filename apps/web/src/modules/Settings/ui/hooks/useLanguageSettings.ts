"use client";

import { defaultLocale, type Locale, type LocaleOption, localeOptions } from "@cookmate/i18n";
import { useLingui } from "@lingui/react/macro";
import { useCallback, useMemo, useState } from "react";
import { normalizeLocale } from "@/shared/core/i18n/i18n";
import { activateLocale } from "@/shared/core/providers/i18n-provider";

interface UseLanguageSettingsResult {
  currentLocale: Locale;
  options: ReadonlyArray<LocaleOption>;
  isUpdating: boolean;
  pendingLocale: Locale | null;
  errorMessage: string | null;
  changeLocale: (locale: Locale) => Promise<void>;
}

export function useLanguageSettings(): UseLanguageSettingsResult {
  const { i18n, t } = useLingui();
  const [isUpdating, setIsUpdating] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentLocale = useMemo(() => normalizeLocale(i18n.locale) ?? defaultLocale, [i18n.locale]);

  const changeLocale = useCallback(
    async (nextLocale: Locale) => {
      if (nextLocale === currentLocale || isUpdating) {
        return;
      }

      setErrorMessage(null);
      setIsUpdating(true);
      setPendingLocale(nextLocale);

      try {
        const isActivated = await activateLocale(nextLocale);
        if (!isActivated) {
          setErrorMessage(t`Unable to change language right now. Please try again.`);
        }
      } catch (error) {
        console.error("Failed to change locale", error);
        setErrorMessage(t`Unable to change language right now. Please try again.`);
      } finally {
        setIsUpdating(false);
        setPendingLocale(null);
      }
    },
    [currentLocale, isUpdating, t],
  );

  return {
    currentLocale,
    options: localeOptions,
    isUpdating,
    pendingLocale,
    errorMessage,
    changeLocale,
  };
}
