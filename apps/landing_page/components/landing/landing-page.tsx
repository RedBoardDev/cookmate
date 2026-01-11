"use client"

import { useState, useRef, useMemo } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import {
  ArrowRight,
  Heart,
  Clock,
  Users,
  ChefHat,
  Check,
  Link2,
  Instagram,
  FileText,
  Camera,
  Sparkles,
  Calendar,
  ShoppingCart,
  Search,
  ChevronDown,
  Play,
  Pause,
  Plus,
  Twitter,
  Mail,
  CheckCircle2,
  Flame,
  Video,
  RotateCcw,
} from "lucide-react"

// Lazy load AuthModal - only load when needed
const AuthModal = dynamic(() => import("@/components/auth/auth-modal").then((mod) => ({ default: mod.AuthModal })), {
  ssr: false,
})

// * Features section - Import statique pour SEO (contenu important pour indexation)
// * Pas de lazy loading car c'est du contenu critique pour le SEO
import { FeaturesSection } from "./sections/features-section"

interface LandingPageProps {
  onEnterApp?: () => void
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  const [showAuth, setShowAuth] = useState(false)
  const [authTab, setAuthTab] = useState<"login" | "signup">("signup")
  const [urlInput, setUrlInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [recipeImported, setRecipeImported] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // * Note: Les états et handlers pour Features ont été déplacés dans FeaturesSection pour le code splitting

  const importRef = useRef<HTMLDivElement>(null)

  // * Fonctions simples - pas besoin de useCallback (pas passées en props, pas de dépendances complexes)
  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab)
    setShowAuth(true)
  }

  const scrollToImport = () => {
    importRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const handleImport = () => {
    if (!urlInput) {
      setUrlInput("https://halfbakedharvest.com/creamy-tuscan-chicken")
    }
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setRecipeImported(true)
    }, 2500)
  }

  const handleReset = () => {
    setRecipeImported(false)
    setUrlInput("")
  }

  const faqs = useMemo(
    () => [
    {
      q: "D'ou puis-je importer mes recettes ?",
      a: "De partout ! Sites web (Marmiton, 750g, blogs...), posts Instagram, videos TikTok, photos de livres de cuisine, notes manuscrites, ou simplement en copiant-collant du texte. Notre IA s'adapte a tous les formats.",
    },
    {
      q: "Puis-je utiliser Cookmate gratuitement ?",
      a: "Oui ! Le plan gratuit vous permet d'importer jusqu'a 15 recettes et d'utiliser toutes les fonctionnalites de base. Pour un usage illimite et les fonctionnalites avancees, passez a Premium.",
    },
    {
      q: "Mes recettes sont-elles privees ?",
      a: "Absolument. Vos recettes vous appartiennent et restent 100% privees par defaut. Vous pouvez choisir de partager certaines recettes ou collections si vous le souhaitez.",
    },
    {
      q: "Comment fonctionne l'import par photo ?",
      a: "Prenez simplement une photo d'une page de livre ou d'une recette manuscrite. Notre IA analyse l'image, extrait le texte, identifie les ingredients et les etapes, puis structure le tout automatiquement.",
    },
    {
      q: "Puis-je annuler mon abonnement a tout moment ?",
      a: "Oui, sans engagement. Vous pouvez annuler en un clic depuis votre compte. Vos recettes restent accessibles, vous repassez simplement au plan gratuit.",
    },
  ],
    [],
  )

  return (
    <>
      <div className="relative bg-noise">
        {/* Global flowing background - Base layer with mesh gradient */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E9] via-[#FAF5F0] to-[#F8F1E9]" />
          <div className="absolute inset-0 bg-mesh opacity-60" />
        </div>

        {/* ============================================= */}
        {/* NAVBAR - Semantic HTML pour SEO */}
        {/* ============================================= */}
        <header>
          <nav className="fixed top-0 left-0 right-0 z-50" aria-label="Navigation principale">
          {/* Enhanced navbar background with glassmorphism */}
          <div className="absolute inset-0 bg-[#F8F1E9]/75 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
          {/* Elegant border with gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E6D7C7]/70 to-transparent" />
          {/* Subtle shadow for depth */}
          <div className="absolute inset-0 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]" />
          <div className="relative max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-[#C6502B] to-[#A84423] rounded-xl flex items-center justify-center shadow-lg shadow-[#C6502B]/20">
                <span className="text-white font-display text-lg font-semibold">C</span>
              </div>
              <span className="font-display text-xl text-[#221B16] tracking-tight">Cookmate</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-[#6E6258] hover:text-[#221B16] transition-colors">
                Fonctionnalites
              </a>
              <a href="#pricing" className="text-sm text-[#6E6258] hover:text-[#221B16] transition-colors">
                Tarifs
              </a>
              <a href="#faq" className="text-sm text-[#6E6258] hover:text-[#221B16] transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => openAuth("login")}
                className="px-3 md:px-4 py-2 text-sm text-[#6E6258] hover:text-[#221B16] transition-colors"
              >
                Connexion
              </button>
              <button
                onClick={() => openAuth("signup")}
                className="px-4 md:px-5 py-2.5 text-sm font-medium bg-gradient-to-b from-[#C6502B] to-[#B54526] text-white rounded-full hover:from-[#B54526] hover:to-[#A43F20] transition-all shadow-md shadow-[#C6502B]/25 hover:shadow-lg active:scale-[0.98]"
              >
                Commencer
              </button>
            </div>
          </div>
        </nav>
        </header>

        {/* ============================================= */}
        {/* HERO - Recentered on the main problem: finding recipes */}
        {/* ============================================= */}
        <main>
          <section className="pt-28 md:pt-36 pb-20 md:pb-28 relative overflow-hidden" aria-labelledby="hero-heading">
          {/* Hero-specific background - Premium but subtle */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {/* Base gradient with depth - extends beyond section for smooth transition */}
            <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#F8F1E9] via-[#FAF5F0] to-[#FDFBF8]" />

            {/* Subtle animated floating orbs - elegant and refined */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-[#C6502B]/[0.08] via-[#F0B04C]/[0.05] to-transparent rounded-full blur-[100px] bg-float" />
            <div className="absolute top-[300px] left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#5F7A57]/[0.07] via-[#8BA888]/[0.04] to-transparent rounded-full blur-[100px] bg-float-delayed" />
            <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-[#F0B04C]/[0.06] via-[#C6502B]/[0.03] to-transparent rounded-full blur-[100px] bg-float-slow" />

            {/* Additional subtle depth layers */}
            <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#C6502B]/[0.04] to-transparent rounded-full blur-[90px] bg-pulse" />
            <div className="absolute bottom-1/4 left-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#5F7A57]/[0.05] to-transparent rounded-full blur-[85px] bg-drift" />

            {/* Very subtle light effect - minimal */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent" />

            {/* Subtle shadow for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.015)_0%,transparent_50%)]" />

            {/* Radial gradient for focus */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,rgba(248,241,233,0.3)_70%)]" />
          </div>

          {/* Bottom transition fade - extends into next section */}
          <div className="absolute -bottom-20 left-0 right-0 h-40 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF5F0]/50 to-[#FAF5F0]" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-[#E6D7C7]/80 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#F0B04C]" />
              <span className="text-sm text-[#6E6258]">Instagram, TikTok, sites, photos — tout au meme endroit</span>
            </div>

            <h1 id="hero-heading" className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#221B16] tracking-tight leading-[1.1] mb-6 text-balance">
              Ou est passee cette <br className="hidden sm:block" />
              <span className="text-[#C6502B]">recette ?</span>
            </h1>

            <p className="text-lg md:text-xl text-[#6E6258] max-w-2xl mx-auto leading-relaxed mb-10">
              Vous savez, celle vue sur Instagram il y a 3 semaines. Ou dans ce livre. Ou sur ce blog.
              <span className="text-[#221B16] font-medium"> Centralisez tout. Retrouvez tout.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={() => openAuth("signup")}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-b from-[#C6502B] to-[#B54526] text-white font-semibold rounded-full hover:from-[#B54526] hover:to-[#A43F20] transition-all shadow-xl shadow-[#C6502B]/25 hover:shadow-2xl active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToImport}
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-[#221B16] font-medium rounded-full border border-[#E6D7C7] hover:bg-white hover:border-[#C6502B]/20 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                Voir comment ca marche
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* * Trust signals pour engagement utilisateur (12% ranking factor 2025) */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6E6258]/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#5F7A57]" />
                <span>Gratuit jusqu'à 15 recettes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#5F7A57]" />
                <span>+1,247 utilisateurs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F0B04C]" />
                <span>Note 4.8/5</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* IMPORT INTERACTIF (Demo) */}
        {/* ============================================= */}
        <section ref={importRef} className="py-16 md:py-24 relative overflow-hidden">
          {/* Top transition fade - extends from previous section */}
          <div className="absolute -top-20 left-0 right-0 h-40 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5F0] via-[#FAF5F0]/80 to-transparent" />
          </div>

          {/* Import section background - Subtle and clean, seamless transition */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {/* Base gradient - starts with hero color, transitions smoothly */}
            <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#FAF5F0] via-[#F8F1E9] to-[#FDFBF8]" />

            {/* Subtle animated orbs - minimal and elegant */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#C6502B]/[0.04] via-[#F0B04C]/[0.02] to-transparent rounded-full blur-[100px] bg-float" />
            <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-[#5F7A57]/[0.03] to-transparent rounded-full blur-[95px] bg-float-delayed" />

            {/* Soft radial overlay for seamless blend */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,rgba(253,251,248,0.3)_70%)]" />
          </div>

          {/* Bottom transition fade - extends into next section */}
          <div className="absolute -bottom-20 left-0 right-0 h-40 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF8]/50 to-[#FDFBF8]" />
          </div>
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="text-center mb-10 md:mb-14">
              <p className="text-sm font-medium text-[#C6502B] mb-3 tracking-wide uppercase">Essayez maintenant</p>
              <h2 className="font-display text-3xl md:text-4xl text-[#221B16] mb-4">Importez vos recettes en 2 secondes</h2>
              <p className="text-[#6E6258] text-lg max-w-xl mx-auto">
                Collez un lien, une photo, du texte. Notre IA structure tout automatiquement.
              </p>
            </div>

            {/* Source pills */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  gradient: "from-[#E1306C]/10 to-[#F77737]/10",
                  iconColor: "#E1306C",
                },
                { icon: Video, label: "TikTok", gradient: "from-[#00f2ea]/10 to-[#ff0050]/10", iconColor: "#000" },
                {
                  icon: Link2,
                  label: "Sites web",
                  gradient: "from-[#C6502B]/10 to-[#F0B04C]/10",
                  iconColor: "#C6502B",
                },
                { icon: Camera, label: "Photos", gradient: "from-[#5F7A57]/10 to-[#8BA888]/10", iconColor: "#5F7A57" },
                { icon: FileText, label: "Texte", gradient: "from-[#F0B04C]/10 to-[#FFD700]/10", iconColor: "#F0B04C" },
              ].map((source, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r ${source.gradient} rounded-full border border-white/50 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-default backdrop-blur-sm`}
                >
                  <source.icon className="w-4 h-4" style={{ color: source.iconColor }} />
                  <span className="text-sm font-medium text-[#221B16]">{source.label}</span>
                </div>
              ))}
            </div>

            {/* Browser Window */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-[#221B16]/[0.08] border border-[#E6D7C7]/80 overflow-hidden">
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
                  <span className="text-xs font-medium text-[#6E6258] hidden sm:inline">IA</span>
                </div>
              </div>

              <div className="p-6 md:p-10">
                {!recipeImported ? (
                  <div className="max-w-lg mx-auto">
                    <div className="text-center mb-8">
                      <h3 className="font-display text-2xl text-[#221B16] mb-2">Testez l'import</h3>
                      <p className="text-[#6E6258]">Collez un lien de recette pour voir la magie operer</p>
                    </div>

                    <div className="relative mb-4">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Link2 className="w-5 h-5 text-[#6E6258]/50" />
                      </div>
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://marmiton.org/recettes/..."
                        className="w-full pl-12 pr-4 py-4 bg-[#F8F1E9]/50 border-2 border-[#E6D7C7] rounded-xl text-[#221B16] placeholder:text-[#6E6258]/40 focus:outline-none focus:border-[#C6502B] focus:bg-white transition-all"
                      />
                    </div>

                    <button
                      onClick={handleImport}
                      disabled={isProcessing}
                      className="w-full py-4 bg-gradient-to-b from-[#C6502B] to-[#B54526] text-white font-semibold rounded-xl hover:from-[#B54526] hover:to-[#A43F20] disabled:opacity-70 disabled:hover:from-[#C6502B] disabled:hover:to-[#B54526] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C6502B]/20"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Analyse en cours...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>{urlInput ? "Importer cette recette" : "Essayer avec un exemple"}</span>
                        </>
                      )}
                    </button>

                    {isProcessing && (
                      <div className="mt-8 space-y-3">
                        {["Lecture de la page...", "Extraction des ingredients...", "Structuration des etapes..."].map(
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
                ) : (
                  <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm text-[#6E6258] hover:text-[#221B16] hover:bg-[#F8F1E9] rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Recommencer
                      </button>
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5F7A57]/10 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-[#5F7A57]" />
                        <span className="text-sm text-[#5F7A57] font-medium">Importee en 2.3s</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#F8F1E9] to-[#F5EDE3] rounded-2xl overflow-hidden border border-[#E6D7C7]/50">
                      <div className="md:flex">
                        <div className="md:w-2/5 aspect-[4/3] md:aspect-auto relative">
                          <Image
                            src="/placeholder.svg"
                            alt="Poulet Toscan Cremeux"
                            width={400}
                            height={400}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            priority={false}
                          />
                          <button className="absolute top-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                            <Heart className="w-5 h-5 text-[#C6502B]" />
                          </button>
                        </div>

                        <div className="md:w-3/5 p-5 md:p-6">
                          <h3 className="font-display text-xl md:text-2xl text-[#221B16] mb-1">
                            Poulet Toscan Cremeux
                          </h3>
                          <p className="text-sm text-[#6E6258] mb-4 flex items-center gap-1">
                            <Link2 className="w-3 h-3" />
                            halfbakedharvest.com
                          </p>

                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <div className="flex items-center gap-1.5 text-sm">
                              <Clock className="w-4 h-4 text-[#C6502B]" />
                              <span className="text-[#221B16]">45 min</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm">
                              <Users className="w-4 h-4 text-[#5F7A57]" />
                              <span className="text-[#221B16]">4 pers.</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm">
                              <Flame className="w-4 h-4 text-[#F0B04C]" />
                              <span className="text-[#221B16]">420 kcal</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-5">
                            {["Italien", "Rapide", "High Protein"].map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 bg-white border border-[#E6D7C7] rounded-full text-xs text-[#6E6258]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openAuth("signup")}
                              className="flex-1 py-3 bg-gradient-to-b from-[#C6502B] to-[#B54526] text-white text-sm font-semibold rounded-xl hover:from-[#B54526] hover:to-[#A43F20] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#C6502B]/15"
                            >
                              <ChefHat className="w-4 h-4" />
                              Cuisiner
                            </button>
                            <button className="px-4 py-3 bg-white border border-[#E6D7C7] rounded-xl hover:border-[#C6502B]/30 transition-colors">
                              <Calendar className="w-4 h-4 text-[#6E6258]" />
                            </button>
                            <button className="px-4 py-3 bg-white border border-[#E6D7C7] rounded-xl hover:border-[#C6502B]/30 transition-colors">
                              <ShoppingCart className="w-4 h-4 text-[#6E6258]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-8">
                      <button
                        onClick={() => openAuth("signup")}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-[#221B16] text-white font-semibold rounded-full hover:bg-[#2D2520] transition-all shadow-lg hover:shadow-xl"
                      >
                        Creer mon compte gratuit
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================= */}
        {/* FEATURES - Lazy loaded for better code splitting */}
        {/* ============================================= */}
        <FeaturesSection onAuthClick={openAuth} />

        {/* ============================================= */}
        {/* PRICING */}
        {/* ============================================= */}
        <section id="pricing" className="py-20 md:py-28 relative overflow-hidden">
          {/* Top transition fade - extends from previous section */}
          <div className="absolute -top-20 left-0 right-0 h-40 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF5F0] via-[#FAF5F0]/80 to-transparent" />
          </div>

          {/* Pricing section background - Clean and professional */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {/* Seamless gradient base - starts with features color */}
            <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#FAF5F0] via-[#FDFBF8] to-[#F8F1E9]" />

            {/* Subtle animated orbs */}
            <div className="absolute top-0 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-[#C6502B]/[0.05] via-[#F0B04C]/[0.03] to-transparent rounded-full blur-[100px] bg-float" />
            <div className="absolute bottom-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-tl from-[#5F7A57]/[0.05] via-[#8BA888]/[0.03] to-transparent rounded-full blur-[95px] bg-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#C6502B]/[0.04] via-[#F0B04C]/[0.03] to-transparent rounded-full blur-[105px] bg-float-slow" />

            {/* Additional subtle depth */}
            <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#F0B04C]/[0.03] to-transparent rounded-full blur-[85px] bg-pulse" />

            {/* Very subtle light effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent" />

            {/* Subtle shadow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.01)_0%,transparent_50%)]" />

            {/* Soft radial overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,rgba(250,245,240,0.5)_100%)]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-sm font-medium text-[#C6502B] mb-3 tracking-wide uppercase">Tarifs</p>
              <h2 className="font-display text-3xl md:text-4xl text-[#221B16] mb-4">Un prix simple et transparent</h2>
              <p className="text-[#6E6258] text-lg">Commencez gratuitement, passez a Premium quand vous etes pret.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#E6D7C7]/80">
                <div className="mb-6">
                  <h3 className="font-display text-xl text-[#221B16] mb-1">Gratuit</h3>
                  <p className="text-sm text-[#6E6258]">Pour decouvrir Cookmate</p>
                </div>

                <div className="mb-6">
                  <span className="font-display text-4xl text-[#221B16]">0</span>
                  <span className="text-[#6E6258]">€/mois</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {["15 recettes maximum", "Import depuis tous les formats", "Mode cuisine", "1 collection"].map(
                    (feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-[#221B16]">
                        <div className="w-5 h-5 rounded-full bg-[#5F7A57]/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#5F7A57]" />
                        </div>
                        {feature}
                      </li>
                    ),
                  )}
                </ul>

                <button
                  onClick={() => openAuth("signup")}
                  className="w-full py-3.5 border-2 border-[#221B16] text-[#221B16] font-semibold rounded-xl hover:bg-[#221B16] hover:text-white transition-all"
                >
                  Commencer gratuitement
                </button>
              </div>

              {/* Premium Plan */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-[#C6502B] relative shadow-xl shadow-[#C6502B]/10">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#C6502B] to-[#B54526] text-white text-xs font-semibold rounded-full shadow-md">
                  Populaire
                </div>

                <div className="mb-6">
                  <h3 className="font-display text-xl text-[#221B16] mb-1">Premium</h3>
                  <p className="text-sm text-[#6E6258]">Pour les passionnes</p>
                </div>

                <div className="mb-6">
                  <span className="font-display text-4xl text-[#221B16]">4,99</span>
                  <span className="text-[#6E6258]">€/mois</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {[
                    "Recettes illimitees",
                    "Collections illimitees",
                    "Planification hebdomadaire",
                    "Liste de courses automatique",
                    "Recherche intelligente",
                    "Synchronisation multi-appareils",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-[#221B16]">
                      <div className="w-5 h-5 rounded-full bg-[#C6502B]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#C6502B]" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openAuth("signup")}
                  className="w-full py-3.5 bg-gradient-to-b from-[#C6502B] to-[#B54526] text-white font-semibold rounded-xl hover:from-[#B54526] hover:to-[#A43F20] transition-all shadow-md shadow-[#C6502B]/20"
                >
                  Essayer 14 jours gratuits
                </button>
                <p className="text-xs text-[#6E6258] text-center mt-3">Sans engagement</p>
              </div>
            </div>
          </div>

          {/* Bottom transition fade - extends into next section with longer, smoother gradient */}
          <div className="absolute -bottom-24 left-0 right-0 h-48 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8F1E9]/20 via-[#F8F1E9]/40 via-[#F8F1E9]/60 via-[#F8F1E9]/80 to-[#F8F1E9]" />
          </div>

          {/* Additional overlay to ensure seamless blend - masks any visible line */}
          <div className="absolute -bottom-24 left-0 right-0 h-48 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E9]/0 via-[#F8F1E9]/10 via-[#F8F1E9]/20 to-[#F8F1E9]/30" />
          </div>
        </section>

        {/* ============================================= */}
        {/* FAQ - Structured Data pour rich snippets */}
        {/* ============================================= */}
        <section id="faq" className="py-20 md:py-28 relative overflow-hidden" aria-labelledby="faq-heading">
          {/* Top transition fade - extends from previous section with longer, smoother gradient */}
          <div className="absolute -top-24 left-0 right-0 h-48 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E9] via-[#F8F1E9]/95 via-[#F8F1E9]/85 via-[#F8F1E9]/70 via-[#F8F1E9]/50 to-transparent" />
          </div>

          {/* Additional overlay to ensure seamless blend - masks any visible line */}
          <div className="absolute -top-24 left-0 right-0 h-48 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#F8F1E9]/30 via-[#F8F1E9]/20 via-[#F8F1E9]/10 to-[#F8F1E9]/0" />
          </div>

          {/* FAQ section background - Soft and seamless */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {/* Seamless gradient base - starts with pricing color, extends beyond for perfect blend */}
            <div className="absolute -top-24 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#F8F1E9] via-[#F8F1E9]/99 via-[#F8F1E9]/98 via-[#FAF5F0] to-[#FDFBF8]" />

            {/* Subtle animated orbs */}
            <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-l from-[#F0B04C]/[0.05] via-[#C6502B]/[0.03] to-transparent rounded-full blur-[100px] bg-float" />
            <div className="absolute bottom-1/3 left-0 w-[550px] h-[550px] bg-gradient-to-r from-[#5F7A57]/[0.05] via-[#8BA888]/[0.03] to-transparent rounded-full blur-[95px] bg-float-delayed" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-[#F0B04C]/[0.04] via-[#C6502B]/[0.02] to-transparent rounded-full blur-[105px] bg-float-slow" />

            {/* Additional subtle depth */}
            <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-gradient-to-br from-[#5F7A57]/[0.03] to-transparent rounded-full blur-[80px] bg-pulse" />

            {/* Very subtle light effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.02] to-transparent" />

            {/* Subtle shadow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,0,0,0.01)_0%,transparent_50%)]" />

            {/* Soft radial overlay for seamless blend */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(253,251,248,0.5)_0%,transparent_80%)]" />
          </div>
          <div className="max-w-3xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-medium text-[#C6502B] mb-3 tracking-wide uppercase">FAQ</p>
              <h2 id="faq-heading" className="font-display text-3xl md:text-4xl text-[#221B16] mb-4">
                Questions frequentes
              </h2>
            </div>

            {/* * FAQ Structured Data pour rich snippets (AI Search Engines) */}
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
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#E6D7C7]/60 overflow-hidden shadow-sm"
                  role="listitem"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FDFBF8]/50 transition-colors"
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
                    className={`overflow-hidden transition-all duration-200 ${openFaq === i ? "max-h-40" : "max-h-0"}`}
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
          </div>

          {/* Bottom transition fade - extends into next section */}
          <div className="absolute -bottom-20 left-0 right-0 h-40 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFBF8]/50 to-[#FDFBF8]" />
          </div>
        </section>

        {/* ============================================= */}
        {/* CTA FINAL */}
        {/* ============================================= */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          {/* Top transition fade - extends from previous section with smooth color blend */}
          <div className="absolute -top-20 left-0 right-0 h-60 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF8] via-[#F8F1E9] via-[#FAF5F0] via-[#F0B04C]/20 to-[#C6502B]" />
          </div>

          {/* CTA section background - Bold but refined */}
          <div className="absolute inset-0">
            {/* Rich gradient background - extends beyond for smooth transition */}
            <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-br from-[#C6502B] via-[#B54526] to-[#A43F20]" />

            {/* Subtle animated decorative orbs */}
            <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#F0B04C]/25 rounded-full blur-[120px] bg-pulse" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-[#221B16]/25 rounded-full blur-[130px] bg-float" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C6502B]/20 rounded-full blur-[140px] bg-float-delayed" />

            {/* Additional subtle accent orbs */}
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#F0B04C]/15 rounded-full blur-[100px] bg-drift" />
            <div className="absolute bottom-0 left-1/3 w-[450px] h-[450px] bg-[#221B16]/15 rounded-full blur-[110px] bg-float-slow" />

            {/* Subtle light effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.04] to-transparent" />

            {/* Rich shadow for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,rgba(0,0,0,0.08)_100%)]" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center z-10">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-6 text-balance drop-shadow-lg">
              Ne perdez plus jamais une recette
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-xl mx-auto drop-shadow-md">
              Rejoignez des milliers de cuisiniers qui ont enfin trouve ou centraliser toutes leurs recettes.
            </p>
            {/* * Trust signals pour engagement (12% ranking factor) */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>+1,247 utilisateurs actifs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Note 4.8/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>100% gratuit jusqu'à 15 recettes</span>
              </div>
            </div>
            <button
              onClick={() => openAuth("signup")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#C6502B] font-semibold rounded-full hover:bg-[#F8F1E9] transition-all shadow-xl hover:shadow-2xl active:scale-[0.98]"
            >
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-white/70 text-sm mt-4">Gratuit pour toujours jusqu'a 15 recettes</p>
          </div>

          {/* Bottom transition fade - extends into footer */}
          <div className="absolute -bottom-20 left-0 right-0 h-60 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#A43F20]/50 via-[#B54526]/30 to-[#1C1917]" />
          </div>
        </section>
        </main>

        {/* ============================================= */}
        {/* FOOTER - Semantic HTML pour SEO */}
        {/* ============================================= */}
        <footer className="py-12 md:py-16 bg-[#1C1917] text-white relative overflow-hidden" role="contentinfo">
          {/* Top transition fade - extends from CTA with smooth color blend */}
          <div className="absolute -top-20 left-0 right-0 h-60 pointer-events-none -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-[#A43F20] via-[#B54526] via-[#1A1614] to-[#1C1917]" />
          </div>

          {/* Footer background - Clean and minimal */}
          <div className="absolute inset-0">
            {/* Simple dark gradient base - extends beyond for smooth transition */}
            <div className="absolute -top-20 -bottom-0 left-0 right-0 bg-gradient-to-b from-[#1C1917] via-[#1A1614] to-[#161412]" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 md:px-8 z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#C6502B] to-[#A84423] rounded-xl flex items-center justify-center">
                    <span className="text-white font-display text-lg font-semibold">C</span>
                  </div>
                  <span className="font-display text-xl text-white">Cookmate</span>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Toutes vos recettes, enfin reunies en un seul endroit.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-4 text-white/90">Produit</h4>
                <ul className="space-y-2.5 text-sm text-white/50">
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">
                      Fonctionnalites
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-white transition-colors">
                      Tarifs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Application mobile
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-4 text-white/90">Ressources</h4>
                <ul className="space-y-2.5 text-sm text-white/50">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Centre d'aide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-4 text-white/90">Legal</h4>
                <ul className="space-y-2.5 text-sm text-white/50">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Confidentialite
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      CGU
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Mentions legales
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/40">© 2025 Cookmate. Tous droits reserves.</p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-white/50" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-white/50" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <Mail className="w-4 h-4 text-white/50" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultTab={authTab} />
    </>
  )
}
