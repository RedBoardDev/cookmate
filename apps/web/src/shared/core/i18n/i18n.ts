import { defaultLocale, isValidLocale, type Locale, loadCatalogMessages } from "@cookmate/i18n";
import type { Messages } from "@lingui/core";

export { i18n } from "@lingui/core";

export const LOCALE_STORAGE_KEY = "cookmate-locale";
export const LOCALE_COOKIE_KEY = "cookmate-locale";
export const LOCALE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export function normalizeLocale(candidate: string | null | undefined): Locale | null {
  if (!candidate) return null;
  const normalized = candidate.toLowerCase();

  if (isValidLocale(normalized)) return normalized as Locale;

  const base = normalized.split(/[-_]/)[0];
  return isValidLocale(base) ? (base as Locale) : null;
}

export function resolveLocale(candidate: string | null | undefined): Locale {
  return normalizeLocale(candidate) ?? defaultLocale;
}

export async function loadLocaleMessages(locale: Locale): Promise<Messages> {
  return loadCatalogMessages(locale);
}

export function buildLocaleCookieValue(locale: Locale): string {
  return `${LOCALE_COOKIE_KEY}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}
