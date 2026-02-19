import { useCallback, useState } from "react";

export type RecipeSection = "ingredients" | "steps";

export function useRecipeSections(initialSection: RecipeSection = "ingredients") {
  const [activeSection, setActiveSection] = useState<RecipeSection>(initialSection);

  const onSelect = useCallback((section: RecipeSection) => {
    setActiveSection(section);
  }, []);

  return {
    activeSection,
    onSelect,
  };
}
