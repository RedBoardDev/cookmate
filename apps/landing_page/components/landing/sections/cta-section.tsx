"use client";

import { Trans } from "@lingui/react/macro";
import { ArrowRight, CheckCircle2, Sparkles, Users } from "lucide-react";
import { SectionContainer } from "../layout/section-container";
import { PrimaryButton } from "../ui/primary-button";
import { TrustSignal } from "../ui/trust-signal";

interface CtaSectionProps {
  onSignup: () => void;
}

export function CtaSection({ onSignup }: CtaSectionProps) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -top-20 left-0 right-0 h-60 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF8] via-[#F8F1E9] via-[#FAF5F0] via-[#F0B04C]/20 to-[#C6502B]" />
      </div>

      <div className="absolute inset-0">
        <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-br from-[#C6502B] via-[#B54526] to-[#A43F20]" />
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#F0B04C]/25 rounded-full blur-[120px] bg-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#221B16]/25 rounded-full blur-[130px] bg-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C6502B]/20 rounded-full blur-[140px] bg-float-delayed" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#F0B04C]/15 rounded-full blur-[100px] bg-drift" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-[#221B16]/15 rounded-full blur-[110px] bg-float-slow" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,rgba(0,0,0,0.08)_100%)]" />
      </div>

      <SectionContainer maxWidth="sm" className="relative text-center z-10">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6 text-balance drop-shadow-lg">
          <Trans>Never lose a recipe again</Trans>
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto drop-shadow-md">
          <Trans>Join thousands of cooks who finally found a place to keep all their recipes.</Trans>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-white/80">
          <TrustSignal icon={Users} iconColor="currentColor">
            1,247 active users
          </TrustSignal>
          <TrustSignal icon={CheckCircle2} iconColor="currentColor">
            Rated 4.8/5
          </TrustSignal>
          <TrustSignal icon={Sparkles} iconColor="currentColor">
            100% free up to 15 recipes
          </TrustSignal>
        </div>
        <div className="flex justify-center">
          <PrimaryButton onClick={onSignup} variant="white" className="group">
            <Trans>Start for free</Trans>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </PrimaryButton>
        </div>
        <p className="text-white/70 text-sm mt-4">
          <Trans>Free forever up to 15 recipes</Trans>
        </p>
      </SectionContainer>

      <div className="absolute -bottom-20 left-0 right-0 h-60 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A43F20]/50 via-[#B54526]/30 to-[#1C1917]" />
      </div>
    </section>
  );
}
