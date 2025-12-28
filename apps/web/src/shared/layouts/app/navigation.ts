import type { LucideIcon } from "lucide-react";
import { BookOpen, Calendar, Compass, Plus, ShoppingCart } from "lucide-react";

type NavMatch = {
  path: string[];
  mode?: "exact" | "prefix";
};

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  match: NavMatch;
};

type NavLink = {
  label: string;
  href: string;
  match: NavMatch;
};

function matchesPath(segments: readonly string[], path: string[]) {
  if (segments.length < path.length) return false;
  return path.every((segment, index) => segments[index] === segment);
}

export function normalizeSegments(segments: readonly string[]) {
  return segments.filter((segment) => !segment.startsWith("("));
}

export function isNavActive(segments: readonly string[], match: NavMatch) {
  const normalized = normalizeSegments(segments);

  if (!matchesPath(normalized, match.path)) return false;

  if (match.mode === "exact") {
    return normalized.length === match.path.length;
  }

  return true;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Recipes",
    href: "/recipes",
    icon: BookOpen,
    match: {
      path: ["recipes"],
      mode: "exact"
    }
  },
  {
    label: "Planner",
    href: "/planner",
    icon: Calendar,
    match: {
      path: ["planner"],
      mode: "prefix"
    }
  },
  {
    label: "Groceries",
    href: "/groceries",
    icon: ShoppingCart,
    match: {
      path: ["groceries"],
      mode: "prefix"
    }
  },
  {
    label: "Discover",
    href: "/discover",
    icon: Compass,
    match: {
      path: ["discover"],
      mode: "prefix"
    }
  }
] as const;

export const MOBILE_NAV_ITEMS: NavItem[] = [
  {
    label: "Add",
    href: "/recipes/add",
    icon: Plus,
    match: {
      path: ["recipes", "add"],
      mode: "prefix"
    }
  },
  {
    label: "Planner",
    href: "/planner",
    icon: Calendar,
    match: {
      path: ["planner"],
      mode: "prefix"
    }
  },
  {
    label: "Groceries",
    href: "/groceries",
    icon: ShoppingCart,
    match: {
      path: ["groceries"],
      mode: "prefix"
    }
  },
  {
    label: "Discover",
    href: "/discover",
    icon: Compass,
    match: {
      path: ["discover"],
      mode: "prefix"
    }
  }
] as const;

export const MOBILE_HOME: NavLink = {
  label: "Recipes",
  href: "/recipes",
  match: {
    path: ["recipes"],
    mode: "exact"
  }
} as const;

export const PRIMARY_ACTION = {
  label: "New recipe",
  href: "/recipes/add",
  icon: Plus
} as const;
