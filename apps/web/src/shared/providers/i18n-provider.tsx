"use client";

import { locales, defaultLocale, type Locale, isValidLocale } from "@cookmate/i18n";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useEffect, useState, type ReactNode } from "react";

const LOCALE_STORAGE_KEY = "cookmate-locale";

let isInitialized = false;

function normalizeLocale(candidate: string | null | undefined): Locale | null {
  if (!candidate) return null;
  const normalized = candidate.toLowerCase();
  if (isValidLocale(normalized)) return normalized as Locale;
  const base = normalized.split(/[-_]/)[0];
  return isValidLocale(base) ? (base as Locale) : null;
}

function getStoredLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  return normalizeLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
}

function getNavigatorLocale(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const candidates = [...(navigator.languages ?? []), navigator.language];
  for (const candidate of candidates) {
    const normalized = normalizeLocale(candidate);
    if (normalized) return normalized;
  }
  return null;
}

function getInitialLocale(): Locale {
  return getStoredLocale() ?? getNavigatorLocale() ?? defaultLocale;
}

// Initialize once on module load (client-side only)
if (typeof window !== "undefined" && !isInitialized) {
  const initial = getInitialLocale();
  i18n.load(initial, {});
  i18n.activate(initial);
  isInitialized = true;
}

export async function activateLocale(locale: Locale) {
  try {
    const { messages } = await import(`@cookmate/i18n/locales/${locale}/messages.mjs`);
    i18n.load(locale, messages);
    i18n.activate(locale);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      document.documentElement.lang = locale;
    }
  } catch (error) {
    console.warn(`Failed to load locale ${locale}, falling back to default`, error);
    if (locale !== defaultLocale) {
      return activateLocale(defaultLocale);
    }
  }
}

interface I18nProviderWrapperProps {
  children: ReactNode;
}

export function I18nProviderWrapper({ children }: I18nProviderWrapperProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initial = getInitialLocale();
    activateLocale(initial).then(() => setIsLoaded(true));
  }, []);

  if (!isLoaded) return null;

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}

export { i18n, locales, defaultLocale, type Locale };
