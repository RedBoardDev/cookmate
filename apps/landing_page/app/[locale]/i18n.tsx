"use client";

import { type Locale } from "@cookmate/i18n";
import { setupI18n, type Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useMemo, type ReactNode } from "react";

interface ClientI18nProviderProps {
  children: ReactNode;
  locale: Locale;
  messages: Messages;
}

export function ClientI18nProvider({ children, locale, messages }: ClientI18nProviderProps) {
  const i18n = useMemo(() => {
    return setupI18n({
      locale,
      messages: { [locale]: messages },
    });
  }, [locale, messages]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
