import type { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import type { LucideIcon } from "lucide-react";
import { BookOpen, Calendar, Compass, ShoppingCart } from "lucide-react";

export type NavMatch = {
  path: string[];
  mode?: "exact" | "prefix";
};

export type NavItem = {
  label: MessageDescriptor;
  href: string;
  icon: LucideIcon;
  match: NavMatch;
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: msg`Recipes`,
    href: "/recipes",
    icon: BookOpen,
    match: {
      path: ["recipes"],
      mode: "exact",
    },
  },
  {
    label: msg`Planner`,
    href: "/planner",
    icon: Calendar,
    match: {
      path: ["planner"],
      mode: "prefix",
    },
  },
  {
    label: msg`Groceries`,
    href: "/groceries",
    icon: ShoppingCart,
    match: {
      path: ["groceries"],
      mode: "prefix",
    },
  },
  {
    label: msg`Discover`,
    href: "/discover",
    icon: Compass,
    match: {
      path: ["discover"],
      mode: "prefix",
    },
  },
] as const;

export const MOBILE_NAV_ITEMS: NavItem[] = [
  {
    label: msg`Recipes`,
    href: "/recipes",
    icon: BookOpen,
    match: {
      path: ["recipes"],
      mode: "exact",
    },
  },
  {
    label: msg`Discover`,
    href: "/discover",
    icon: Compass,
    match: {
      path: ["discover"],
      mode: "prefix",
    },
  },
  {
    label: msg`Planner`,
    href: "/planner",
    icon: Calendar,
    match: {
      path: ["planner"],
      mode: "prefix",
    },
  },
  {
    label: msg`Groceries`,
    href: "/groceries",
    icon: ShoppingCart,
    match: {
      path: ["groceries"],
      mode: "prefix",
    },
  },
] as const;
