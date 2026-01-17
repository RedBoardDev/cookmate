"use client"

import { Link2, Sparkles, Instagram, Video, Camera, FileText } from "lucide-react"
import { useLingui, Trans } from "@lingui/react/macro"
import { SectionContainer } from "../layout/section-container"
import { SectionHeader } from "../ui/section-header"
import { ImportForm } from "./import-form"
import { RecipePreview } from "./recipe-preview"

interface ImportDemoProps {
  urlInput: string
  setUrlInput: (value: string) => void
  isProcessing: boolean
  recipeImported: boolean
  onImport: () => void
  onReset: () => void
  onSignup: () => void
}

export function ImportDemo({
  urlInput,
  setUrlInput,
  isProcessing,
  recipeImported,
  onImport,
  onReset,
  onSignup,
}: ImportDemoProps) {
  const { t } = useLingui()

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-[0_4px_12px_-8px_rgba(0,0,0,0.22)] border border-[#E6D7C7]/80 overflow-hidden">
      <div className="bg-gradient-to-b from-[#FDFBF8] to-[#F8F1E9]/80 border-b border-[#E6D7C7]/60 px-4 md:px-6 py-3.5 flex items-center gap-4">
        <div className="hidden md:flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-inner" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner" />
        </div>
        <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#E6D7C7]/60 shadow-inner">
          <Link2 className="w-4 h-4 text-[#6E6258]/60" />
          <span className="text-sm text-[#6E6258]">cookmate.app/import</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#F0B04C]/10 to-[#F0B04C]/5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#F0B04C]" />
          <span className="text-xs font-medium text-[#6E6258] hidden sm:inline">
            <Trans>AI</Trans>
          </span>
        </div>
      </div>

      <div className="p-6 md:p-10">
        {!recipeImported ? (
          <ImportForm
            urlInput={urlInput}
            setUrlInput={setUrlInput}
            isProcessing={isProcessing}
            onImport={onImport}
          />
        ) : (
          <RecipePreview onSignup={onSignup} onReset={onReset} />
        )}
      </div>
    </div>
  )
}
