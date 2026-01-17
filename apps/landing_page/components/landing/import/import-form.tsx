"use client"

import { Link2, Sparkles, Check } from "lucide-react"
import { useLingui, Trans } from "@lingui/react/macro"
import { PrimaryButton } from "../ui/primary-button"

interface ImportFormProps {
  urlInput: string
  setUrlInput: (value: string) => void
  isProcessing: boolean
  onImport: () => void
}

export function ImportForm({ urlInput, setUrlInput, isProcessing, onImport }: ImportFormProps) {
  const { t } = useLingui()

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-display text-2xl text-[#221B16] mb-2">
          <Trans>Try the import</Trans>
        </h3>
        <p className="text-[#6E6258]">
          <Trans>Paste a recipe link to see the magic happen</Trans>
        </p>
      </div>

      <div className="relative mb-4">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Link2 className="w-5 h-5 text-[#6E6258]/50" />
        </div>
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder={t`https://example.com/recipes/...`}
          className="w-full pl-12 pr-4 py-4 bg-[#F8F1E9]/50 border-2 border-[#E6D7C7] rounded-xl text-[#221B16] placeholder:text-[#6E6258]/40 focus:outline-none focus:border-[#C6502B] focus:bg-white focus:ring-2 focus:ring-[#C6502B]/20 transition-all duration-200"
        />
      </div>

      <PrimaryButton
        onClick={onImport}
        disabled={isProcessing}
        size="md"
        className="w-full rounded-xl shadow-none"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>
              <Trans>Analyzing...</Trans>
            </span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>{urlInput ? t`Import this recipe` : t`Try with a sample`}</span>
          </>
        )}
      </PrimaryButton>

      {isProcessing && (
        <div className="mt-8 space-y-3">
          {[t`Reading the page...`, t`Extracting ingredients...`, t`Structuring the steps...`].map(
            (step, i) => (
              <div
                key={i}
                className="flex items-center gap-3 text-sm animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="w-5 h-5 rounded-full bg-[#5F7A57]/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#5F7A57]" />
                </div>
                <span className="text-[#6E6258]">{step}</span>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  )
}
