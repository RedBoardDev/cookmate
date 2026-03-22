import type { Metadata } from "next";
import { RecipesPageClient } from "@/app/(app)/recipes/RecipesPageClient";

export const metadata: Metadata = {
  title: "My Recipes",
  description: "Browse and manage your saved recipes.",
};

export default function RecipesPage() {
  return <RecipesPageClient />;
}
