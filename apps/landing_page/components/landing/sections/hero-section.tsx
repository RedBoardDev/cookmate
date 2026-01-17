"use client"

import { ArrowRight, ChevronDown, Users, Sparkles, CheckCircle2 } from "lucide-react"
import { Trans } from "@lingui/react/macro"
import { SectionContainer } from "../layout/section-container"
import { PrimaryButton } from "../ui/primary-button"
import { TrustSignal } from "../ui/trust-signal"

interface HeroSectionProps {
  onSignup: () => void
  onScrollToImport: () => void
}

export function HeroSection({ onSignup, onScrollToImport }: HeroSectionProps) {
  return (
    <section className="pt-28 md:pt-20 pb-20 md:pb-28 relative overflow-hidden" aria-labelledby="hero-heading">
      <SectionContainer maxWidth="md" className="relative text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#E6D7C7]/80 mb-6 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/70 hover:border-[#E6D7C7]">
          <Sparkles className="w-4 h-4 text-[#F0B04C] animate-pulse" />
          <span className="text-sm text-[#6E6258]">
            <Trans>Instagram, TikTok, websites, photos — all in one place</Trans>
          </span>
        </div>

        <h1
          id="hero-heading"
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#221B16] tracking-tight leading-[1.1] mb-4 sm:mb-6 text-balance"
        >
          <Trans>
            Where did that <br className="hidden sm:block" />
            <span className="text-[#C6502B]">recipe go?</span>
          </Trans>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-[#6E6258] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 px-4 sm:px-0">
          <Trans>
            You know, the one you saw on Instagram three weeks ago. Or in that book. Or on that blog.
            <span className="text-[#221B16] font-medium"> Centralize everything. Find everything.</span>
          </Trans>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <PrimaryButton onClick={onSignup} className="w-full sm:w-auto shadow-xl shadow-[#C6502B]/25">
            <Trans>Start for free</Trans>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </PrimaryButton>
          <button
            onClick={onScrollToImport}
            className="group w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-[#221B16] font-medium rounded-full border border-[#E6D7C7] hover:bg-white hover:border-[#C6502B]/20 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            <Trans>See how it works</Trans>
            <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6E6258]/70">
          <TrustSignal icon={CheckCircle2} iconColor="#5F7A57" className="transition-opacity duration-300 hover:opacity-100">
            Free up to 15 recipes
          </TrustSignal>
          <TrustSignal icon={Users} iconColor="#5F7A57" className="transition-opacity duration-300 hover:opacity-100">
            1,247 users
          </TrustSignal>
          <TrustSignal icon={Sparkles} iconColor="#F0B04C" className="transition-opacity duration-300 hover:opacity-100">
            Rated 4.8/5
          </TrustSignal>
        </div>
      </SectionContainer>
    </section>
  )
}
