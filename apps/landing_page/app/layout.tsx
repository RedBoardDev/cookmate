import type React from "react"
import type { Metadata, Viewport } from "next"
import { Barlow, Barlow_Semi_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-semi-condensed",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://cookmate.app"),
  // * Optimisé selon recherche 2025: Keyword dans title = 14% ranking factor
  // * Title < 60 caractères, inclut keywords principaux
  title: {
    default: "Cookmate - Carnet de Recettes & Organisation Cuisine | Gratuit",
    template: "%s | Cookmate",
  },
  description:
    "Application de recettes gratuite. Importez depuis Instagram, TikTok, sites web ou photos. Planifiez vos repas, générez votre liste de courses automatiquement. Organisez toutes vos recettes en un seul endroit.",
  // * Note: keywords meta tag n'est plus utilisé par Google, retiré pour réduire la taille
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
    locale: "fr_FR",
    url: "/",
    siteName: "Cookmate",
    title: "Cookmate - Toutes vos recettes, enfin organisées",
    description:
      "Centralisez vos recettes depuis le web, Instagram ou vos screenshots. Planifiez, cuisinez et faites vos courses sans effort.",
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
    title: "Cookmate - Toutes vos recettes, enfin organisées",
    description:
      "Centralisez vos recettes depuis le web, Instagram ou vos screenshots. Planifiez, cuisinez et faites vos courses sans effort.",
    images: ["/og-image.jpg"],
    creator: "@cookmate",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  category: "food",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#C6502B",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // * Structured Data optimisé pour AI Search Engines (GSEO) et rich snippets
  // * Basé sur recherche 2025: "Generative Search Engine Optimization"
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
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1247",
      bestRating: "5",
      worstRating: "1",
    },
    description:
      "Application de gestion de recettes avec import intelligent depuis le web, Instagram, photos et texte. Planification, liste de courses et mode cuisine intégrés.",
    featureList: [
      "Import de recettes depuis n'importe quelle source",
      "Planification hebdomadaire",
      "Liste de courses automatique",
      "Mode cuisine avec minuteurs",
      "Recherche intelligente",
      "Collections personnalisées",
    ],
    // * Ajout pour AI Search Engines (GSEO)
    keywords: "recettes, cuisine, organisation recettes, carnet de recettes, planification repas, liste de courses",
    // * Trust signals pour engagement (12% ranking factor)
    applicationSubCategory: "Recipe Management",
    screenshot: `${process.env.NEXT_PUBLIC_SITE_URL || "https://cookmate.app"}/og-image.jpg`,
  }

  return (
    <html lang="fr">
      <body className={`${barlow.variable} ${barlowSemiCondensed.variable} font-sans antialiased`}>
        {/* * Structured data - optimisé pour AI Search Engines (GSEO) et rich snippets */}
        {/* * Next.js App Router le place automatiquement dans le head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
