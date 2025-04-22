
import * as React from "react";
import { cn } from "@/lib/utils";

interface FantasyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const FantasyButton = React.forwardRef<HTMLButtonElement, FantasyButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variantStyles = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      gold: "bg-[#E5C100] text-black shadow-amber-700/30"
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-1",
      md: "text-sm px-6 py-3",
      lg: "text-base px-8 py-4"
    };

    return (
      <button
        className={cn(
          "fantasy-button",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

FantasyButton.displayName = "FantasyButton";

export { FantasyButton };
