"use client";

import { type Locale, localeNames, locales } from "@cookmate/i18n";
import { Globe } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as Locale) || "en";

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "rounded-full px-3 text-sm font-medium transition-all",
            "text-muted-foreground hover:bg-accent/20 hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-accent/40",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="ml-1.5 hidden sm:inline">{currentLocale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLocale(locale)}
            className={cn("cursor-pointer", currentLocale === locale && "bg-accent text-accent-foreground")}
          >
            <span className="font-medium">{localeNames[locale]}</span>
            <span className="ml-auto text-xs text-muted-foreground">{locale.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
