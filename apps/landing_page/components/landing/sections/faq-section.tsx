"use client";

import { useLingui } from "@lingui/react/macro";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionContainer } from "../layout/section-container";
import { SectionHeader } from "../ui/section-header";

export function FaqSection() {
  const { t } = useLingui();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = useMemo(
    () => [
      {
        q: t`Where can I import my recipes from?`,
        a: t`Everywhere! Websites (Marmiton, 750g, blogs...), Instagram posts, TikTok videos, photos of cookbooks, handwritten notes, or just copy-pasted text. Our AI adapts to any format.`,
      },
      {
        q: t`Can I use Cookmate for free?`,
        a: t`Yes! The free plan lets you import up to 15 recipes and use all core features. For unlimited use and advanced features, go Premium.`,
      },
      {
        q: t`Are my recipes private?`,
        a: t`Absolutely. Your recipes are yours and stay 100% private by default. You can choose to share specific recipes or collections if you want.`,
      },
      {
        q: t`How does photo import work?`,
        a: t`Just take a photo of a cookbook page or a handwritten recipe. Our AI analyzes the image, extracts the text, identifies ingredients and steps, then structures everything automatically.`,
      },
      {
        q: t`Can I cancel my subscription anytime?`,
        a: t`Yes, no commitment. You can cancel in one click from your account. Your recipes stay accessible—you simply go back to the free plan.`,
      },
    ],
    [t],
  );

  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="absolute -top-24 left-0 right-0 h-48 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E9] via-[#F8F1E9]/95 via-[#F8F1E9]/85 via-[#F8F1E9]/70 via-[#F8F1E9]/50 to-transparent" />
      </div>

      <div className="absolute -top-24 left-0 right-0 h-48 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E9]/30 via-[#F8F1E9]/20 via-[#F8F1E9]/10 to-[#F8F1E9]/0" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-24 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#F8F1E9] via-[#F8F1E9]/99 via-[#F8F1E9]/98 via-[#FAF5F0] to-[#FDFBF8]" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#F0B04C]/[0.05] via-[#C6502B]/[0.03] to-transparent rounded-full blur-[100px] bg-float" />
        <div className="absolute bottom-1/3 left-0 w-[550px] h-[550px] bg-gradient-to-r from-[#5F7A57]/[0.05] via-[#8BA888]/[0.03] to-transparent rounded-full blur-[95px] bg-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#F0B04C]/[0.04] via-[#C6502B]/[0.02] to-transparent rounded-full blur-[105px] bg-float-slow" />
        <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-[#5F7A57]/[0.03] to-transparent rounded-full blur-[80px] bg-pulse" />
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.01)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,251,248,0.5)_0%,transparent_80%)]" />
      </div>
      <SectionContainer maxWidth="sm">
        <SectionHeader label="FAQ" title="Frequently asked questions" id="faq-heading" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }).replace(/</g, "\\u003c"),
          }}
        />

        <div className="space-y-3" role="list">
          {faqs.map((faq, i) => (
            <article
              key={i}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#E6D7C7]/60 overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_2px_8px_-6px_rgba(0,0,0,0.12)] hover:border-[#E6D7C7] focus-within:ring-2 focus-within:ring-accent/40 focus-within:ring-offset-2 focus-within:ring-offset-background"
              role="listitem"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FDFBF8]/50 transition-colors duration-200 focus-visible:outline-none focus-visible:bg-[#FDFBF8]/50"
                aria-expanded={openFaq === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-medium text-[#221B16] pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#6E6258] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-96" : "max-h-0"}`}
                role="region"
                aria-hidden={openFaq !== i}
              >
                <div className="px-6 pb-4">
                  <p className="text-[#6E6258] leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>

      <div className="absolute -bottom-20 left-0 right-0 h-40 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF8]/50 to-[#FDFBF8]" />
      </div>
    </section>
  );
}
