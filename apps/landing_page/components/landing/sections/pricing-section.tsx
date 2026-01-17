"use client"

import { useLingui, Trans } from "@lingui/react/macro"
import { SectionContainer } from "../layout/section-container"
import { SectionHeader } from "../ui/section-header"
import { PrimaryButton } from "../ui/primary-button"
import { FeatureItem } from "../ui/feature-item"

interface PricingSectionProps {
  onSignup: () => void
}

export function PricingSection({ onSignup }: PricingSectionProps) {
  const { t } = useLingui()

  return (
    <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -top-20 left-0 right-0 h-40 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5F0] via-[#FAF5F0]/80 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#FAF5F0] via-[#FDFBF8] to-[#F8F1E9]" />
        <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-[#C6502B]/[0.05] via-[#F0B04C]/[0.03] to-transparent rounded-full blur-[100px] bg-float" />
        <div className="absolute bottom-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-tl from-[#5F7A57]/[0.05] via-[#8BA888]/[0.03] to-transparent rounded-full blur-[95px] bg-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#C6502B]/[0.04] via-[#F0B04C]/[0.03] to-transparent rounded-full blur-[105px] bg-float-slow" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#F0B04C]/[0.03] to-transparent rounded-full blur-[85px] bg-pulse" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.01)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,rgba(250,245,240,0.5)_100%)]" />
      </div>
      <SectionContainer maxWidth="md">
        <SectionHeader
          label="Pricing"
          title="A simple, transparent price"
          description="Start for free, go Premium when you're ready."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#E6D7C7]/80 transition-all duration-300 hover:shadow-[0_2px_8px_-6px_rgba(0,0,0,0.12)] hover:border-[#E6D7C7]">
            <div className="mb-6">
              <h3 className="font-display text-xl text-[#221B16] mb-1">
                <Trans>Free</Trans>
              </h3>
              <p className="text-sm text-[#6E6258]">
                <Trans>To discover Cookmate</Trans>
              </p>
            </div>

            <div className="mb-6">
              <span className="font-display text-4xl text-[#221B16]">0</span>
              <span className="text-[#6E6258]">
                <Trans>€/month</Trans>
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {[t`Up to 15 recipes`, t`Import from any format`, t`Cook mode`, t`1 collection`].map((feature) => (
                <FeatureItem key={feature}>{feature}</FeatureItem>
              ))}
            </ul>

            <PrimaryButton onClick={onSignup} variant="outline" size="md" className="w-full rounded-xl">
              <Trans>Start for free</Trans>
            </PrimaryButton>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C6502B] relative shadow-[0_4px_12px_-8px_rgba(198,80,43,0.22)] transition-all duration-300 hover:shadow-[0_12px_28px_-20px_rgba(198,80,43,0.24)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#C6502B] to-[#B54526] text-white text-xs font-semibold rounded-full shadow-md">
              <Trans>Most popular</Trans>
            </div>

            <div className="mb-6">
              <h3 className="font-display text-xl text-[#221B16] mb-1">
                <Trans>Premium</Trans>
              </h3>
              <p className="text-sm text-[#6E6258]">
                <Trans>For enthusiasts</Trans>
              </p>
            </div>

            <div className="mb-6">
              <span className="font-display text-4xl text-[#221B16]">4.99</span>
              <span className="text-[#6E6258]">
                <Trans>€/month</Trans>
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                t`Unlimited recipes`,
                t`Unlimited collections`,
                t`Weekly planning`,
                t`Automatic shopping list`,
                t`Smart search`,
                t`Multi-device sync`,
              ].map((feature) => (
                <FeatureItem key={feature} variant="primary">
                  {feature}
                </FeatureItem>
              ))}
            </ul>

            <PrimaryButton onClick={onSignup} size="md" className="w-full rounded-xl shadow-none">
              <Trans>Try 14 days free</Trans>
            </PrimaryButton>
            <p className="text-xs text-[#6E6258] text-center mt-3">
              <Trans>No commitment</Trans>
            </p>
          </div>
        </div>
      </SectionContainer>

      <div className="absolute -bottom-24 left-0 right-0 h-48 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8F1E9]/20 via-[#F8F1E9]/40 via-[#F8F1E9]/60 via-[#F8F1E9]/80 to-[#F8F1E9]" />
      </div>

      <div className="absolute -bottom-24 left-0 right-0 h-48 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E9]/0 via-[#F8F1E9]/10 via-[#F8F1E9]/20 to-[#F8F1E9]/30" />
      </div>
    </section>
  )
}
