"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { Header } from "./layout/header"
import { Footer } from "./layout/footer"
import { HeroSection } from "./sections/hero-section"
import { ImportSection } from "./sections/import-section"
import { FeaturesSection } from "./sections/features-section"
import { PricingSection } from "./sections/pricing-section"
import { FaqSection } from "./sections/faq-section"
import { CtaSection } from "./sections/cta-section"

const AuthModal = dynamic(() => import("@/components/auth/auth-modal").then((mod) => ({ default: mod.AuthModal })), {
  ssr: false,
})

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "signup">("signup")
  const [urlInput, setUrlInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [recipeImported, setRecipeImported] = useState(false)

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab)
    setShowAuth(true)
  }

  const scrollToImport = () => {
    const element = document.getElementById("import-section")
    element?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const handleImport = () => {
    if (!urlInput) {
      setUrlInput("https://halfbakedharvest.com/creamy-tuscan-chicken")
    }
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setRecipeImported(true)
    }, 2500)
  }

  const handleReset = () => {
    setRecipeImported(false)
    setUrlInput("")
  }

  return (
    <>
      <div
        className={cn(
          "relative isolate min-h-screen overflow-x-hidden bg-background text-foreground",
          "bg-[radial-gradient(120%_120%_at_top,_hsl(var(--accent)/0.2)_0%,_transparent_60%)]",
          "after:pointer-events-none after:absolute after:inset-0",
          "after:bg-[radial-gradient(70%_70%_at_15%_0%,_hsl(var(--primary)/0.12)_0%,_transparent_60%),radial-gradient(70%_70%_at_85%_10%,_hsl(var(--accent)/0.12)_0%,_transparent_65%)]",
          "after:opacity-80"
        )}
      >
        <Header onLogin={() => openAuth("login")} onSignup={() => openAuth("signup")} />

        <main className={cn("relative z-10 min-h-screen pt-0 md:pt-16")}>
          <HeroSection onSignup={() => openAuth("signup")} onScrollToImport={scrollToImport} />

          <ImportSection
            urlInput={urlInput}
            setUrlInput={setUrlInput}
            isProcessing={isProcessing}
            recipeImported={recipeImported}
            onImport={handleImport}
            onReset={handleReset}
            onSignup={() => openAuth("signup")}
          />

          <FeaturesSection onAuthClick={openAuth} />

          <PricingSection onSignup={() => openAuth("signup")} />

          <FaqSection />

          <CtaSection onSignup={() => openAuth("signup")} />
        </main>

        <Footer />
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultTab={authTab} />
    </>
  )
}
