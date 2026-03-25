"use client";

import { Trans, useLingui } from "@lingui/react/macro";
import { Calendar, Check, ChefHat, Pause, Play, Plus, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { SectionContainer } from "../layout/section-container";
import { FeatureCard } from "../ui/feature-card";

interface FeaturesSectionProps {
  onAuthClick: (tab: "login" | "signup") => void;
}

export function FeaturesSection({ onAuthClick }: FeaturesSectionProps) {
  const { t } = useLingui();
  const [cookStep, setCookStep] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerValue, _setTimerValue] = useState(180);
  const [searchQuery, setSearchQuery] = useState(() => t`quick chicken tonight`);
  const [searchTags, setSearchTags] = useState<string[]>(() => [t`Quick`, t`Chicken`, t`Dinner`]);
  const [shoppingItems, setShoppingItems] = useState(() => [
    { item: t`Cherry tomatoes`, qty: "500g", checked: true },
    { item: t`Fresh spinach`, qty: "200g", checked: true },
    { item: t`Grated Parmesan`, qty: "100g", checked: false },
    { item: t`Crème fraîche`, qty: "25cl", checked: false },
  ]);
  const [planningDays, setPlanningDays] = useState(() => [
    { day: t`Mon`, hasRecipe: true, recipe: "/beef-bourguignon-french-stew-with-vegetables.jpg" },
    { day: t`Tue`, hasRecipe: true, recipe: "/mediterranean-quinoa-bowl-with-feta-and-vegetables.jpg" },
    { day: t`Wed`, hasRecipe: false },
    { day: t`Thu`, hasRecipe: true, recipe: "/honey-glazed-salmon-with-asparagus.jpg" },
    { day: t`Fri`, hasRecipe: true, recipe: "/korean-fried-chicken-with-gochujang-sauce.jpg" },
  ]);
  const [_expandedCollection, setExpandedCollection] = useState<number | null>(null);

  const cookSteps = useMemo(
    () => [
      {
        title: t`Prep the ingredients`,
        desc: t`Slice the garlic, cut sun-dried tomatoes into strips, and grate the Parmesan.`,
      },
      {
        title: t`Sear the chicken`,
        desc: t`In a large pan, heat olive oil. Sear the chicken breasts for 6 minutes on each side.`,
        timer: 360,
      },
      {
        title: t`Make the sauce`,
        desc: t`Remove the chicken. In the same pan, sauté the garlic for 1 minute, then add the spinach.`,
        timer: 60,
      },
      {
        title: t`Add the cream`,
        desc: t`Pour in the cream and broth. Simmer for 5 minutes until thickened.`,
        timer: 300,
      },
    ],
    [t],
  );

  const tagLabels = useMemo(
    () => ({
      quick: t`Quick`,
      chicken: t`Chicken`,
      dinner: t`Dinner`,
      vegetarian: t`Vegetarian`,
      dessert: t`Dessert`,
      italian: t`Italian`,
      easy: t`Easy`,
    }),
    [t],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value);
      if (value.length > 3) {
        const words = value.toLowerCase().split(" ");
        const extractedTags: string[] = [];
        if (words.some((w) => ["quick", "fast", "rapide", "vite"].includes(w))) extractedTags.push(tagLabels.quick);
        if (words.some((w) => ["chicken", "poulet"].includes(w))) extractedTags.push(tagLabels.chicken);
        if (words.some((w) => ["tonight", "dinner", "diner", "soir"].includes(w))) extractedTags.push(tagLabels.dinner);
        if (words.some((w) => ["vegetarian", "veggie", "vegetable", "vegetarien"].includes(w)))
          extractedTags.push(tagLabels.vegetarian);
        if (words.some((w) => ["dessert", "sweet"].includes(w))) extractedTags.push(tagLabels.dessert);
        if (words.some((w) => ["italian", "italien"].includes(w))) extractedTags.push(tagLabels.italian);
        if (words.some((w) => ["easy", "simple", "facile"].includes(w))) extractedTags.push(tagLabels.easy);
        setSearchTags(extractedTags);
      } else {
        setSearchTags([]);
      }
    },
    [tagLabels],
  );

  const toggleShoppingItem = useCallback((index: number) => {
    setShoppingItems((items) => items.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item)));
  }, []);

  const addRecipeToDay = useCallback(
    (dayIndex: number) => {
      if (dayIndex === 2 && !planningDays[2].hasRecipe) {
        setPlanningDays((days) =>
          days.map((day, i) =>
            i === dayIndex
              ? { ...day, hasRecipe: true, recipe: "/mediterranean-quinoa-bowl-with-feta-and-vegetables.jpg" }
              : day,
          ),
        );
      }
    },
    [planningDays],
  );

  const collections = useMemo(
    () => [
      {
        name: t`Quick`,
        count: 23,
        gradient: "from-[#FEE2E2] to-[#FECACA]",
        images: [
          "/avocado-toast.png",
          "/greek-salad.png",
          "/korean-fried-chicken-with-gochujang-sauce.jpg",
          "/thai-basil-beef-stir-fry-with-rice.jpg",
        ],
        description: t`Quick recipes for busy nights`,
      },
      {
        name: t`Comfort Food`,
        count: 18,
        gradient: "from-[#FEF3C7] to-[#FDE68A]",
        images: [
          "/beef-bourguignon-french-stew-with-vegetables.jpg",
          "/creamy-sauce-simmering-with-sun-dried-tomatoes.jpg",
          "/images/menu/risotto.png",
          "/finished-tuscan-chicken-dish-plated.jpg",
        ],
        description: t`Feel-good dishes for pure comfort`,
      },
      {
        name: t`Healthy`,
        count: 31,
        gradient: "from-[#D1FAE5] to-[#A7F3D0]",
        images: [
          "/mediterranean-quinoa-bowl-with-feta-and-vegetables.jpg",
          "/honey-glazed-salmon-with-asparagus.jpg",
          "/gourmet-avocado-toast-with-eggs-and-toppings.jpg",
          "/greek-salad.png",
        ],
        description: t`Balanced and nourishing recipes`,
      },
    ],
    [t],
  );

  return (
    <section id="features" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -top-20 left-0 right-0 h-40 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF8] via-[#FDFBF8]/80 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute -top-20 -bottom-20 left-0 right-0 bg-gradient-to-b from-[#FDFBF8] via-[#F8F1E9] to-[#FAF5F0]" />
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-l from-[#F0B04C]/[0.06] via-[#C6502B]/[0.04] to-transparent rounded-full blur-[100px] bg-float" />
        <div className="absolute bottom-1/4 left-0 w-[750px] h-[750px] bg-gradient-to-r from-[#5F7A57]/[0.06] via-[#8BA888]/[0.03] to-transparent rounded-full blur-[95px] bg-float-delayed" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,rgba(253,251,248,0.4)_100%)]" />
      </div>

      <div className="absolute -bottom-20 left-0 right-0 h-40 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAF5F0]/50 to-[#FAF5F0]" />
      </div>

      <SectionContainer maxWidth="lg">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-medium text-[#C6502B] mb-3 tracking-wide uppercase">
            <Trans>Features</Trans>
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-[#221B16] mb-4">
            <Trans>More than a simple notebook</Trans>
          </h2>
          <p className="text-[#6E6258] text-lg max-w-xl mx-auto">
            <Trans>Organize, plan, cook. Everything is connected.</Trans>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          <FeatureCard
            icon={ChefHat}
            title={t`Cook Mode`}
            description={t`Step by step, with built-in timers.`}
            iconGradient="from-[#C6502B] to-[#A84423]"
            iconShadow="shadow-[#C6502B]/25"
            hoverBorder="hover:border-[#C6502B]/20"
            hoverShadow="hover:shadow-[#C6502B]/[0.04]"
          >
            <div className="bg-gradient-to-br from-[#F8F1E9]/80 to-[#F5EDE3]/80 rounded-xl p-4 border border-[#E6D7C7]/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#6E6258]">
                  <Trans>
                    Step {cookStep + 1} of {cookSteps.length}
                  </Trans>
                </span>
                {cookSteps[cookStep].timer && (
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-[#E6D7C7]/50 hover:border-[#C6502B]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 active:scale-95"
                  >
                    {timerRunning ? (
                      <Pause className="w-3 h-3 text-[#C6502B]" />
                    ) : (
                      <Play className="w-3 h-3 text-[#C6502B]" />
                    )}
                    <span className="text-xs font-mono text-[#221B16]">
                      {Math.floor(timerValue / 60)}:{(timerValue % 60).toString().padStart(2, "0")}
                    </span>
                  </button>
                )}
              </div>

              <div className="h-1.5 bg-[#E6D7C7]/50 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-[#C6502B] to-[#F0B04C] rounded-full transition-all duration-300"
                  style={{ width: `${((cookStep + 1) / cookSteps.length) * 100}%` }}
                />
              </div>

              <p className="text-sm text-[#221B16] mb-4 leading-relaxed line-clamp-2">
                <span className="font-semibold">{cookSteps[cookStep].title}</span> — {cookSteps[cookStep].desc}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setCookStep(Math.max(0, cookStep - 1))}
                  disabled={cookStep === 0}
                  className="flex-1 py-2 text-xs font-medium text-[#6E6258] bg-white rounded-lg border border-[#E6D7C7]/50 disabled:opacity-40 hover:bg-[#FDFBF8] hover:border-[#E6D7C7] hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 active:scale-95 disabled:active:scale-100"
                >
                  <Trans>Previous</Trans>
                </button>
                <button
                  onClick={() => setCookStep(Math.min(cookSteps.length - 1, cookStep + 1))}
                  disabled={cookStep === cookSteps.length - 1}
                  className="flex-1 py-2 text-xs font-medium text-white bg-gradient-to-b from-[#C6502B] to-[#B54526] rounded-lg disabled:opacity-40 hover:from-[#B54526] hover:to-[#A43F20] hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 active:scale-95 disabled:active:scale-100"
                >
                  <Trans>Next</Trans>
                </button>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={Calendar}
            title={t`Planning`}
            description={t`Drag your recipes in—your week is ready.`}
            iconGradient="from-[#5F7A57] to-[#4A6144]"
            iconShadow="shadow-[#5F7A57]/25"
            hoverBorder="hover:border-[#5F7A57]/20"
            hoverShadow="hover:shadow-[#5F7A57]/[0.04]"
          >
            <div className="bg-gradient-to-br from-[#F8F1E9]/80 to-[#F5EDE3]/80 rounded-xl p-4 border border-[#E6D7C7]/30">
              <div className="grid grid-cols-5 gap-2">
                {planningDays.map((day, i) => (
                  <div key={day.day} className="text-center">
                    <span className="text-[10px] text-[#6E6258] block mb-1.5">{day.day}</span>
                    <button
                      onClick={() => addRecipeToDay(i)}
                      className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all ${
                        day.hasRecipe
                          ? "bg-white shadow-sm border border-[#E6D7C7]/50 hover:scale-105 hover:shadow-md"
                          : "bg-[#5F7A57]/10 border-2 border-[#5F7A57] border-dashed hover:bg-[#5F7A57]/20 hover:border-[#5F7A57]"
                      }`}
                    >
                      {day.hasRecipe && day.recipe ? (
                        <Image
                          src={day.recipe}
                          alt={t`Recipe for ${day.day}`}
                          width={80}
                          height={80}
                          className="w-full h-full rounded object-cover"
                          loading="lazy"
                          priority={false}
                        />
                      ) : (
                        <Plus className="w-3 h-3 text-[#5F7A57]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={ShoppingCart}
            title={t`Shopping list`}
            description={t`Auto-generated, sorted by aisle.`}
            iconGradient="from-[#F0B04C] to-[#E5A33E]"
            iconShadow="shadow-[#F0B04C]/25"
            hoverBorder="hover:border-[#F0B04C]/20"
            hoverShadow="hover:shadow-[#F0B04C]/[0.04]"
          >
            <div className="bg-gradient-to-br from-[#F8F1E9]/80 to-[#F5EDE3]/80 rounded-xl p-4 border border-[#E6D7C7]/30 space-y-2">
              {shoppingItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggleShoppingItem(i)}
                  className="w-full flex items-center gap-3 hover:bg-white/30 rounded-lg p-1.5 transition-all group/item"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                      item.checked
                        ? "bg-[#5F7A57] border-[#5F7A57] scale-110"
                        : "border-[#E6D7C7] bg-white group-hover/item:border-[#5F7A57]/50"
                    }`}
                  >
                    {item.checked && <Check className="w-2.5 h-2.5 text-white animate-in fade-in duration-200" />}
                  </div>
                  <span
                    className={`flex-1 text-sm text-left transition-all ${
                      item.checked ? "text-[#6E6258] line-through" : "text-[#221B16]"
                    }`}
                  >
                    {item.item}
                  </span>
                  <span className="text-xs text-[#6E6258]">{item.qty}</span>
                </button>
              ))}
            </div>
          </FeatureCard>

          <FeatureCard
            icon={Search}
            title={t`Smart search`}
            description={t`Speak naturally—Cookmate understands.`}
            iconGradient="from-[#C6502B] to-[#A84423]"
            iconShadow="shadow-[#C6502B]/25"
            hoverBorder="hover:border-[#C6502B]/20"
            hoverShadow="hover:shadow-[#C6502B]/[0.04]"
          >
            <div className="bg-gradient-to-br from-[#F8F1E9]/80 to-[#F5EDE3]/80 rounded-xl p-4 border border-[#E6D7C7]/30">
              <div className="flex items-center gap-3 px-3 py-2.5 bg-white rounded-lg mb-3 shadow-sm border border-[#E6D7C7]/50">
                <Search className="w-4 h-4 text-[#6E6258]/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder={t`Type your search...`}
                  className="flex-1 text-sm text-[#221B16] bg-transparent border-none outline-none placeholder:text-[#6E6258]/50"
                />
              </div>
              {searchTags.length > 0 && (
                <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  {searchTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#C6502B]/10 text-[#C6502B] rounded-full text-xs font-medium animate-in fade-in zoom-in duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {!searchQuery && (
                <p className="text-xs text-[#6E6258]/60 text-center mt-2">
                  <Trans>Examples: "quick chicken", "vegetarian", "easy dessert"</Trans>
                </p>
              )}
            </div>
          </FeatureCard>

          <div className="md:col-span-2 group">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-7 border border-[#E6D7C7]/60 hover:border-[#5F7A57]/20 transition-all hover:shadow-xl hover:shadow-[#5F7A57]/[0.04]">
              <div className="md:flex md:items-center md:gap-10">
                <div className="md:w-2/5 mb-6 md:mb-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5F7A57] to-[#4A6343] flex items-center justify-center shadow-lg shadow-[#5F7A57]/25 mb-5">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display text-xl text-[#221B16] mb-2">
                    <Trans>Collections that fit you</Trans>
                  </h3>
                  <p className="text-[#6E6258] text-sm leading-relaxed">
                    <Trans>
                      Create your collections like on Spotify. "Quick", "Batch cooking", "Cravings"... Organize the way
                      you think.
                    </Trans>
                  </p>
                </div>

                <div className="md:w-3/5">
                  <div className="grid grid-cols-3 gap-3">
                    {collections.map((collection, i) => (
                      <div
                        key={i}
                        className="group/card relative"
                        onMouseEnter={() => setExpandedCollection(i)}
                        onMouseLeave={() => setExpandedCollection(null)}
                      >
                        <div
                          className={`aspect-square rounded-xl p-1.5 grid grid-cols-2 gap-1 bg-gradient-to-br ${collection.gradient} transition-all duration-300 group-hover/card:shadow-xl cursor-pointer overflow-hidden relative`}
                        >
                          {collection.images.map((image, j) => (
                            <div key={j} className="rounded-lg bg-white/30 overflow-hidden relative">
                              <Image
                                src={image}
                                alt={t`${collection.name} recipe ${j + 1}`}
                                width={150}
                                height={150}
                                className="w-full h-full object-cover transition-all duration-300 group-hover/card:blur-[1.5px]"
                                loading="lazy"
                                priority={false}
                              />
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-[0.12] mix-blend-overlay`}
                              />
                            </div>
                          ))}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                            <div className="text-white text-center">
                              <p className="text-base font-semibold drop-shadow-lg mb-1">{collection.name}</p>
                              <p className="text-xs opacity-95 drop-shadow">
                                <Trans>{collection.count} recipes</Trans>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
