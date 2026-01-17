"use client";

import { Trans } from "@lingui/react/macro";

interface TagProps {
  children: string;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="px-3 py-1 bg-white border border-[#E6D7C7] rounded-full text-xs text-[#6E6258]">
      <Trans>{children}</Trans>
    </span>
  );
}
