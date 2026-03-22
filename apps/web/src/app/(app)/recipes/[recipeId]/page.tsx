import type { Metadata } from "next";
import { RecipeDetailScreen } from "@/modules/RecipeDetail/ui/RecipeDetailScreen";

interface RecipeDetailPageProps {
  params: Promise<{
    recipeId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Recipe",
  description: "View recipe details, ingredients and instructions.",
};

export default async function RecipeDetailPage({ params }: RecipeDetailPageProps) {
  const { recipeId } = await params;

  return <RecipeDetailScreen recipeId={recipeId} />;
}
