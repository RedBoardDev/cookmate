import * as React from "react";

import { cn } from "@/shared/lib/utils";

type CardVariant = "solid" | "soft" | "subtle" | "muted" | "ghost";
type CardRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
type CardShadow = "none" | "flat" | "subtle" | "elevated" | "floating";
type CardBorder = "none" | "soft" | "default" | "strong" | "dashed";
type CardPadding = "none" | "sm" | "md" | "lg";
type CardBlur = "none" | "sm" | "md";
type CardInteractive = "none" | "border";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  radius?: CardRadius;
  shadow?: CardShadow;
  border?: CardBorder;
  padding?: CardPadding;
  blur?: CardBlur;
  interactive?: CardInteractive;
};

const variantClasses: Record<CardVariant, string> = {
  solid: "bg-card text-card-foreground",
  soft: "bg-card/90 text-card-foreground",
  subtle: "bg-card/70 text-card-foreground",
  muted: "bg-muted/60 text-card-foreground",
  ghost: "bg-transparent text-card-foreground",
};

const radiusClasses: Record<CardRadius, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

const shadowClasses: Record<CardShadow, string> = {
  none: "shadow-none",
  flat: "shadow-[0_1px_0_rgba(0,0,0,0.06)]",
  subtle: "shadow-[0_2px_8px_-6px_rgba(0,0,0,0.12)]",
  elevated: "shadow-[0_4px_12px_-8px_rgba(0,0,0,0.22)]",
  floating: "shadow-[0_12px_28px_-20px_rgba(0,0,0,0.24)]",
};

const borderClasses: Record<CardBorder, string> = {
  none: "border-0",
  soft: "border border-border/60",
  default: "border border-border",
  strong: "border border-border/80",
  dashed: "border border-dashed border-border/80",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const blurClasses: Record<CardBlur, string> = {
  none: "",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur",
};

const interactiveClasses: Record<CardInteractive, string> = {
  none: "",
  border: "transition-colors hover:border-border/80",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "solid",
      radius = "lg",
      shadow = "flat",
      border = "default",
      padding = "none",
      blur = "none",
      interactive = "none",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        variantClasses[variant],
        radiusClasses[radius],
        shadowClasses[shadow],
        borderClasses[border],
        paddingClasses[padding],
        blurClasses[blur],
        interactiveClasses[interactive],
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Tag = "h3", ...props }, ref) => (
    <Tag ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />,
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
