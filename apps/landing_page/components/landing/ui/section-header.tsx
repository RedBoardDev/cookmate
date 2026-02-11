"use client";

import { Trans } from "@lingui/react/macro";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  id?: string;
}

export function SectionHeader({ label, title, description, id }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <p className="text-sm font-medium text-[#C6502B] mb-3 tracking-wide uppercase animate-in fade-in slide-in-from-top-2 duration-500">
        <Trans>{label}</Trans>
      </p>
      <h2
        id={id}
        className="font-display text-3xl md:text-4xl lg:text-5xl text-[#221B16] mb-4 tracking-tight leading-tight"
      >
        <Trans>{title}</Trans>
      </h2>
      {description && (
        <p className="text-[#6E6258] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          <Trans>{description}</Trans>
        </p>
      )}
    </div>
  );
}
