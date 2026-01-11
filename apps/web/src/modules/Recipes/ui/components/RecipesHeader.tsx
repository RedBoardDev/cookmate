import { Search } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { Input } from "@/shared/ui/primitives/input";
import { UserMenu } from "@/shared/layouts/app/UserMenu";
import { cn } from "@/shared/lib/utils";

interface RecipesHeaderProps {
  totalRecipes: number;
  collectionsCount: number;
  isLoading?: boolean;
}

export function RecipesHeader({
  totalRecipes,
  collectionsCount,
  isLoading = false
}: RecipesHeaderProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4 md:items-center">
          <h1 className="text-3xl font-display md:text-4xl">My recipes</h1>
          <div className="md:hidden">
            <UserMenu />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton width={220} />
          ) : (
            `${totalRecipes} recipes across ${collectionsCount} collections.`
          )}
        </p>
      </div>

      <div className="relative w-full md:max-w-sm">
        <Search
          className={cn(
            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
            "text-muted-foreground pointer-events-none"
          )}
        />
        <Input
          aria-label="Search recipes"
          placeholder="Search recipes, ingredients..."
          className="w-full rounded-full pl-10"
        />
      </div>
    </div>
  );
}
