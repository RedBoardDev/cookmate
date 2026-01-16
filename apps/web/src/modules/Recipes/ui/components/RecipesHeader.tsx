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
          <h1 className="text-3xl font-display tracking-tight md:text-4xl">
            My recipes
          </h1>
          <div className="md:hidden">
            <UserMenu />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton width={220} />
          ) : (
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border/60",
                "bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground",
                "shadow-[0_6px_18px_-14px_rgba(0,0,0,0.3)]"
              )}
            >
              {totalRecipes} recipes
              <span aria-hidden>•</span>
              {collectionsCount} collections
            </span>
          )}
        </p>
      </div>

      <div className="relative w-full md:max-w-sm">
        <Search
          className={cn(
            "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2",
            "text-muted-foreground"
          )}
        />
        <Input
          aria-label="Search recipes"
          variant="search"
          radius="full"
          placeholder="Search recipes, ingredients..."
          className="pl-11 pr-4"
        />
      </div>
    </div>
  );
}
