"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
}

const variants = {
  primary: "bg-gradient-to-b from-[#C6502B] to-[#B54526] text-white hover:from-[#B54526] hover:to-[#A43F20] shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
  dark: "bg-[#221B16] text-white hover:bg-[#2D2520] shadow-lg hover:shadow-xl",
  outline: "border-2 border-[#221B16] text-[#221B16] hover:bg-[#221B16] hover:text-white hover:shadow-md",
  white: "bg-white text-[#C6502B] hover:bg-[#F8F1E9] shadow-xl hover:shadow-2xl",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 font-semibold",
};

export function PrimaryButton({
  onClick,
  children,
  variant = "primary",
  size = "lg",
  className,
  disabled,
  asChild,
}: PrimaryButtonProps) {
  const baseClasses = cn(
    "rounded-full transition-all duration-300 ease-out flex items-center justify-center gap-2",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6502B]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98] disabled:active:scale-100",
    variants[variant],
    sizes[size],
    disabled && "opacity-70 cursor-not-allowed",
    className
  );

  if (asChild) {
    return <span className={baseClasses}>{children}</span>;
  }

  return (
    <button onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
}
