"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { QuickImportDrawer } from "@/modules/NewRecipes/ui/QuickImport/QuickImportDrawer";
import { Button } from "@/shared/ui/primitives/button";
import { useMediaQuery } from "@/shared/ui/hooks/useMediaQuery";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";

interface QuickAddTriggerProps {
  children?: ReactNode;
}

export function QuickAddTrigger({ children }: QuickAddTriggerProps) {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = useCallback(() => {
    if (isMobile) {
      setIsDrawerOpen(true);
    } else {
      router.push("/recipes/new");
    }
  }, [isMobile, router]);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return (
    <>
      {children ? (
        <div onClick={handleClick}>{children}</div>
      ) : (
        <Button onClick={handleClick} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Recipe
        </Button>
      )}

      {isMobile && (
        <QuickImportDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
      )}
    </>
  );
}
