import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";
import type { ReactNode } from "react";
import { allMessages, initI18n } from "@/shared/core/i18n/appRouterI18n";
import { I18nProviderWrapper } from "@/shared/core/providers/i18n-provider";
import { Toaster } from "@/shared/ui/primitives/sonner";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Cookmate",
    template: "%s | Cookmate",
  },
  description: "Your personal recipe manager — import, organize, and cook with ease.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await initI18n();

  return (
    <html lang={locale} className="light" data-theme="light" suppressHydrationWarning>
      <body className={`bg-background text-foreground ${barlow.variable} ${barlowSemiCondensed.variable}`}>
        <I18nProviderWrapper initialLocale={locale} initialMessages={allMessages[locale]}>
          {children}
          <Toaster />
        </I18nProviderWrapper>
      </body>
    </html>
  );
}
