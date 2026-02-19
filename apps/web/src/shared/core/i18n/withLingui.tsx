import "server-only";

import type { Locale } from "@cookmate/i18n";
import type { ReactNode } from "react";
import { initI18n } from "@/shared/core/i18n/appRouterI18n";

/**
 * HOCs that call `setI18n` before rendering Server Components.
 *
 * Because Next.js App Router can render pages before/in parallel with layouts,
 * `setI18n` must be called in **every** page and layout that uses `<Trans>`.
 * These HOCs encapsulate that boilerplate (same pattern as Deazl/official Lingui docs).
 *
 * @see https://lingui.dev/tutorials/react-rsc
 */

type PageProps = Record<string, unknown>;
type LayoutProps = { children: ReactNode } & Record<string, unknown>;

export function withLinguiPage<P extends PageProps>(
  PageComponent: React.ComponentType<P & { locale: Locale }>,
): (props: P) => Promise<ReactNode> {
  return async function WithLinguiPage(props: P) {
    const locale = await initI18n();
    return <PageComponent {...props} locale={locale} />;
  };
}

export function withLinguiLayout<P extends LayoutProps>(
  LayoutComponent: React.ComponentType<P & { locale: Locale }>,
): (props: P) => Promise<ReactNode> {
  return async function WithLinguiLayout(props: P) {
    const locale = await initI18n();
    return <LayoutComponent {...props} locale={locale} />;
  };
}
