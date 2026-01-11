import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { ReactNode } from "react";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" data-theme="light">
      <body className={`bg-background text-foreground ${barlow.variable} ${barlowSemiCondensed.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
