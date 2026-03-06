"use client";

import { useLingui } from "@lingui/react/macro";
import { Camera, FileText, Instagram, Link2, Video } from "lucide-react";
import { ImportDemo } from "../import/import-demo";
import { SectionContainer } from "../layout/section-container";
import { SectionHeader } from "../ui/section-header";

interface ImportSectionProps {
  urlInput: string;
  setUrlInput: (value: string) => void;
  isProcessing: boolean;
  recipeImported: boolean;
  onImport: () => void;
  onReset: () => void;
  onSignup: () => void;
}

export function ImportSection({
  urlInput,
  setUrlInput,
  isProcessing,
  recipeImported,
  onImport,
  onReset,
  onSignup,
}: ImportSectionProps) {
  const { t } = useLingui();

  return (
    <section id="import-section" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute -top-20 left-0 right-0 h-40 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5F0] via-[#FAF5F0]/80 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#FAF5F0] via-[#F8F1E9] to-[#FDFBF8]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#C6502B]/[0.04] via-[#F0B04C]/[0.02] to-transparent rounded-full blur-[100px] bg-float" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-[#5F7A57]/[0.03] to-transparent rounded-full blur-[95px] bg-float-delayed" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,rgba(253,251,248,0.3)_70%)]" />
      </div>

      <div className="absolute -bottom-20 left-0 right-0 h-40 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF8]/50 to-[#FDFBF8]" />
      </div>
      <SectionContainer maxWidth="lg">
        <SectionHeader
          label="Try it now"
          title="Import your recipes in 2 seconds"
          description="Paste a link, a photo, or text. Our AI structures everything automatically."
        />

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {[
            {
              icon: Instagram,
              label: t`Instagram`,
              gradient: "from-[#E1306C]/10 to-[#F77737]/10",
              iconColor: "#E1306C",
            },
            { icon: Video, label: t`TikTok`, gradient: "from-[#00f2ea]/10 to-[#ff0050]/10", iconColor: "#000" },
            {
              icon: Link2,
              label: t`Websites`,
              gradient: "from-[#C6502B]/10 to-[#F0B04C]/10",
              iconColor: "#C6502B",
            },
            { icon: Camera, label: t`Photos`, gradient: "from-[#5F7A57]/10 to-[#8BA888]/10", iconColor: "#5F7A57" },
            { icon: FileText, label: t`Text`, gradient: "from-[#F0B04C]/10 to-[#FFD700]/10", iconColor: "#F0B04C" },
          ].map((source, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r ${source.gradient} rounded-full border border-white/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 ease-out cursor-default backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2`}
            >
              <source.icon className="w-4 h-4" style={{ color: source.iconColor }} />
              <span className="text-sm font-medium text-[#221B16]">{source.label}</span>
            </div>
          ))}
        </div>

        <ImportDemo
          urlInput={urlInput}
          setUrlInput={setUrlInput}
          isProcessing={isProcessing}
          recipeImported={recipeImported}
          onImport={onImport}
          onReset={onReset}
          onSignup={onSignup}
        />
      </SectionContainer>
    </section>
  );
}
