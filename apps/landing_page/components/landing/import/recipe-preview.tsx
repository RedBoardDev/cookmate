"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChefHat,
  Clock,
  Flame,
  Heart,
  Link2,
  RotateCcw,
  ShoppingCart,
  Users,
} from "lucide-react";
import Image from "next/image";
import { PrimaryButton } from "../ui/primary-button";
import { RecipeMeta } from "../ui/recipe-meta";
import { Tag } from "../ui/tag";

interface RecipePreviewProps {
  onSignup: () => void;
  onReset: () => void;
}

export function RecipePreview({ onSignup, onReset }: RecipePreviewProps) {
  const { t } = useLingui();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#6E6258] hover:text-[#221B16] hover:bg-[#F8F1E9] rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2"
        >
          <RotateCcw className="w-4 h-4" />
          <Trans>Start over</Trans>
        </button>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5F7A57]/10 rounded-full">
          <CheckCircle2 className="w-4 h-4 text-[#5F7A57]" />
          <span className="text-sm text-[#5F7A57] font-medium">
            <Trans>Imported in 2.3s</Trans>
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F8F1E9] to-[#F5EDE3] rounded-2xl overflow-hidden border border-[#E6D7C7]/50 shadow-[0_2px_8px_-6px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_4px_12px_-8px_rgba(0,0,0,0.22)]">
        <div className="md:flex">
          <div className="md:w-2/5 aspect-[4/3] md:aspect-auto relative">
            <Image
              src="/placeholder.svg"
              alt={t`Creamy Tuscan Chicken`}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              loading="lazy"
              priority={false}
            />
            <button className="absolute top-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 active:scale-95">
              <Heart className="w-5 h-5 text-[#C6502B] transition-transform duration-300 hover:scale-110" />
            </button>
          </div>

          <div className="md:w-3/5 p-5 md:p-6">
            <h3 className="font-display text-xl md:text-2xl text-[#221B16] mb-1">
              <Trans>Creamy Tuscan Chicken</Trans>
            </h3>
            <p className="text-sm text-[#6E6258] mb-4 flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              halfbakedharvest.com
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <RecipeMeta icon={Clock} value="45 min" iconColor="#C6502B" />
              <RecipeMeta icon={Users} value="4 servings" iconColor="#5F7A57" />
              <RecipeMeta icon={Flame} value="420 kcal" iconColor="#F0B04C" />
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {[t`Italian`, t`Quick`, t`High Protein`].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="flex gap-2">
              <PrimaryButton onClick={onSignup} size="md" className="flex-1 rounded-xl shadow-md shadow-[#C6502B]/15">
                <ChefHat className="w-4 h-4" />
                <Trans>Cook</Trans>
              </PrimaryButton>
              <button className="px-4 py-3 bg-white border border-[#E6D7C7] rounded-xl hover:border-[#C6502B]/30 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 active:scale-95">
                <Calendar className="w-4 h-4 text-[#6E6258] transition-colors duration-200 hover:text-[#C6502B]" />
              </button>
              <button className="px-4 py-3 bg-white border border-[#E6D7C7] rounded-xl hover:border-[#C6502B]/30 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 active:scale-95">
                <ShoppingCart className="w-4 h-4 text-[#6E6258] transition-colors duration-200 hover:text-[#C6502B]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <PrimaryButton onClick={onSignup} variant="dark" className="shadow-lg hover:shadow-xl">
          <Trans>Create my free account</Trans>
          <ArrowRight className="w-5 h-5" />
        </PrimaryButton>
      </div>
    </div>
  );
}
