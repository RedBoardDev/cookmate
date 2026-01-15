import * as React from "react";

import { cn } from "@/shared/lib/utils";

type InputVariant = "default" | "search";
type InputRadius = "default" | "full";

type InputProps = React.ComponentProps<"input"> & {
  variant?: InputVariant;
  radius?: InputRadius;
};

const variantClasses: Record<InputVariant, string> = {
  default: "",
  search: "",
};

const radiusClasses: Record<InputRadius, string> = {
  default: "",
  full: "rounded-full",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, variant = "default", radius = "default", ...props },
    ref
  ) => {
    const resolvedType = type ?? (variant === "search" ? "search" : undefined);

    return (
      <input
        type={resolvedType}
        className={cn(
          "input",
          variantClasses[variant],
          radiusClasses[radius],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
