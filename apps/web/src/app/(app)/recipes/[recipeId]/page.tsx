import { RecipeDetailScreen } from "@/modules/RecipeDetail/ui/RecipeDetailScreen";

interface RecipeDetailPageProps {
  params: Promise<{
    recipeId: string;
  }>;
}

export default async function RecipeDetailPage({
  params
}: RecipeDetailPageProps) {
  const { recipeId } = await params;

  return <RecipeDetailScreen recipeId={recipeId} />;
}
