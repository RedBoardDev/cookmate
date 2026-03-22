"use client";

import { useState } from "react";
import { CollectionsManageModal } from "@/modules/Collections/ui/CollectionsManageModal";
import { QuickAddTrigger } from "@/modules/NewRecipes/ui/QuickAdd/QuickAddTrigger";
import { RecipesScreen } from "@/modules/Recipes/ui/RecipesScreen";

export function RecipesPageClient() {
  const [isManageOpen, setIsManageOpen] = useState(false);

  return (
    <RecipesScreen
      onManageCollections={() => setIsManageOpen(true)}
      collectionsModal={<CollectionsManageModal open={isManageOpen} onOpenChange={setIsManageOpen} />}
      addRecipeAction={<QuickAddTrigger />}
    />
  );
}
