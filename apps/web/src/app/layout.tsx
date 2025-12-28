import "@/styles/globals.css";
import type { ReactNode } from "react";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"]
});

const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"]
});

export const metadata = {
  title: {
    default: "Cookmate - All your recipes in one place",
    template: "%s | Cookmate"
  },
  description:
    "Save recipes from anywhere—websites, Instagram, screenshots. Cook step-by-step with timers, plan weekly meals, and get smart shopping lists. Your private kitchen assistant.",
  keywords: [
    "recipe manager",
    "recipe hub",
    "cooking app",
    "meal planning",
    "shopping list",
    "recipe organizer",
    "cooking assistant",
    "recipe collection"
  ],
  openGraph: {
    title: "Cookmate - All your recipes in one place",
    description:
      "Save recipes from anywhere. Cook step-by-step with timers, plan meals, and get smart shopping lists. Your private kitchen assistant.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookmate - All your recipes in one place",
    description:
      "Save recipes from anywhere. Cook step-by-step with timers, plan meals, and get smart shopping lists. Your private kitchen assistant."
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${barlowSemiCondensed.variable}`}>
        {children}
      </body>
    </html>
  );
}
