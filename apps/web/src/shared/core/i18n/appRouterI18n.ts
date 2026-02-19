import "server-only";

import { type Locale, loadCatalogMessages } from "@cookmate/i18n";
import { type I18n, type Messages, setupI18n } from "@lingui/core";
import { setI18n } from "@lingui/react/server";
import { cookies } from "next/headers";
import { resolveLocale } from "@/shared/core/i18n/i18n";

/**
 * Server-only module that pre-creates one i18n instance per locale.
 * Following the official Lingui RSC pattern.
 * @see https://lingui.dev/tutorials/react-rsc
 *
 * Catalog loading is delegated to `@cookmate/i18n` which uses
 * package-internal relative imports (Turbopack-compatible).
 */

const enMessages = await loadCatalogMessages("en");
const frMessages = await loadCatalogMessages("fr");

const allMessages: Record<Locale, Messages> = { en: enMessages, fr: frMessages };

export { allMessages };

type AllI18nInstances = Record<Locale, I18n>;

export const allI18nInstances: AllI18nInstances = {
  en: setupI18n({ locale: "en", messages: { en: enMessages } }),
  fr: setupI18n({ locale: "fr", messages: { fr: frMessages } }),
};

export function getI18nInstance(locale: Locale): I18n {
  const instance = allI18nInstances[locale];
  if (!instance) {
    console.warn(`[i18n] No i18n instance found for locale "${locale}", falling back to "en"`);
    return allI18nInstances.en;
  }
  return instance;
}

/**
 * Initialize i18n for the current request.
 * Must be called in every Server Component page/layout that uses `<Trans>`.
 *
 * Reads the locale from the cookie and calls `setI18n` so that
 * Lingui RSC components (`<Trans>`, `useLingui`) work correctly.
 */
export async function initI18n(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = resolveLocale(cookieStore.get("cookmate-locale")?.value ?? null);
  setI18n(getI18nInstance(locale));
  return locale;
}
