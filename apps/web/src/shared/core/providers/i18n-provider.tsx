"use client";

import { defaultLocale, type Locale } from "@cookmate/i18n";
import { i18n, type Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { type ReactNode, useEffect, useRef } from "react";
import {
  buildLocaleCookieValue,
  LOCALE_STORAGE_KEY,
  loadLocaleMessages,
  normalizeLocale,
} from "@/shared/core/i18n/i18n";

// --- Client locale detection ---

function getClientPreferredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  const stored = normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
  if (stored) return stored;
  for (const candidate of navigator.languages) {
    const normalized = normalizeLocale(candidate);
    if (normalized) return normalized;
  }
  return null;
}

// --- Public API ---

export async function activateLocale(locale: Locale): Promise<boolean> {
  try {
    const messages = await loadLocaleMessages(locale);
    i18n.load(locale, messages);
    i18n.activate(locale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      document.cookie = buildLocaleCookieValue(locale);
      document.documentElement.lang = locale;
    }
    return true;
  } catch (error) {
    console.warn(`[i18n] Failed to activate locale "${locale}"`, error);
    if (locale !== defaultLocale) {
      return activateLocale(defaultLocale);
    }
    return false;
  }
}

// --- Provider ---

interface I18nProviderWrapperProps {
  children: ReactNode;
  initialLocale: Locale;
  initialMessages: Messages;
}

export function I18nProviderWrapper({ children, initialLocale, initialMessages }: I18nProviderWrapperProps) {
  const isInitialized = useRef(false);

  // Synchronous init — no flash
  if (!isInitialized.current) {
    i18n.load(initialLocale, initialMessages);
    i18n.activate(initialLocale);
    isInitialized.current = true;
  }

  // Async reconciliation: switch if client prefers different locale
  useEffect(() => {
    const clientLocale = getClientPreferredLocale();
    if (clientLocale && clientLocale !== initialLocale) {
      void activateLocale(clientLocale);
    }
  }, [initialLocale]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
