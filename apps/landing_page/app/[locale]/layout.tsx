import { defaultLocale, isValidLocale, loadCatalogMessages, type Locale, locales } from "@cookmate/i18n";
import { setupI18n } from "@lingui/core";
import { setI18n } from "@lingui/react/server";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";
import type React from "react";
import { ClientI18nProvider } from "./i18n";
import "../globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-semi-condensed",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Localized metadata
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<Locale, string> = {
    en: "Cookmate - Recipe book & Kitchen organization",
    fr: "Cookmate - Carnet de recettes & Organisation cuisine",
  };

  const descriptions: Record<Locale, string> = {
    en: "Free recipe app. Import from Instagram, TikTok, websites or photos. Plan your meals, automatically generate your shopping list. Organize all your recipes in one place.",
    fr: "Application de recettes gratuite. Importez depuis Instagram, TikTok, sites web ou photos. Planifiez vos repas, générez votre liste de courses automatiquement. Organisez toutes vos recettes en un seul endroit.",
  };

  const ogTitles: Record<Locale, string> = {
    en: "Cookmate - All your recipes, finally organized",
    fr: "Cookmate - Toutes vos recettes, enfin organisées",
  };

  const ogDescriptions: Record<Locale, string> = {
    en: "Centralize your recipes from the web, Instagram or your screenshots. Plan, cook and shop effortlessly.",
    fr: "Centralisez vos recettes depuis le web, Instagram ou vos screenshots. Planifiez, cuisinez et faites vos courses sans effort.",
  };

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cookmate.app"),
    title: {
      default: titles[locale],
      template: "%s | Cookmate",
    },
    description: descriptions[locale],
    authors: [{ name: "Cookmate" }],
    creator: "Cookmate",
    publisher: "Cookmate",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? ["en_US"] : ["fr_FR"],
      url: `/${locale}`,
      siteName: "Cookmate",
      title: ogTitles[locale],
      description: ogDescriptions[locale],
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Cookmate - Application de gestion de recettes",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitles[locale],
      description: ogDescriptions[locale],
      images: ["/og-image.jpg"],
      creator: "@cookmate",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
    manifest: "/manifest.json",
    category: "food",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#C6502B",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale: localeParam } = await params;
  const validLocale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const messages = await loadCatalogMessages(validLocale);

  // Setup i18n for server components
  const i18n = setupI18n({ locale: validLocale, messages: { [validLocale]: messages } });
  setI18n(i18n);

  const structuredDataDescriptions: Record<Locale, string> = {
    en: "Recipe management app with smart import from web, Instagram, photos and text. Planning, shopping list and cooking mode integrated.",
    fr: "Application de gestion de recettes avec import intelligent depuis le web, Instagram, photos et texte. Planification, liste de courses et mode cuisine intégrés.",
  };

  const structuredDataFeatures: Record<Locale, string[]> = {
    en: [
      "Import recipes from any source",
      "Weekly planning",
      "Automatic shopping list",
      "Cooking mode with timers",
      "Smart search",
      "Custom collections",
    ],
    fr: [
      "Import de recettes depuis n'importe quelle source",
      "Planification hebdomadaire",
      "Liste de courses automatique",
      "Mode cuisine avec minuteurs",
      "Recherche intelligente",
      "Collections personnalisées",
    ],
  };

  const structuredDataKeywords: Record<Locale, string> = {
    en: "recipes, cooking, recipe organization, recipe book, meal planning, shopping list",
    fr: "recettes, cuisine, organisation recettes, carnet de recettes, planification repas, liste de courses",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cookmate",
    applicationCategory: "FoodApplication",
    operatingSystem: "Web, iOS, Android",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://cookmate.app",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: validLocale === "fr" ? "EUR" : "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
    description: structuredDataDescriptions[validLocale],
    featureList: structuredDataFeatures[validLocale],
    keywords: structuredDataKeywords[validLocale],
    applicationSubCategory: "Recipe Management",
    screenshot: `${process.env.NEXT_PUBLIC_SITE_URL || "https://cookmate.app"}/og-image.jpg`,
  };

  return (
    <html lang={validLocale}>
      <body className={`${barlow.variable} ${barlowSemiCondensed.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <ClientI18nProvider key={validLocale} locale={validLocale} messages={messages}>
          {children}
        </ClientI18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
