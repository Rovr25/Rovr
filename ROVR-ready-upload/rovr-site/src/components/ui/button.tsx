
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", asChild, variant = "default", size = "md", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors";
    const variants = variant === "outline"
      ? "border border-white/20 bg-black/50 text-white hover:bg-white/10"
      : "bg-gradient-to-b from-neutral-900 to-black text-white border-2 border-white/20";
    const sizes = size === "sm" ? "h-9 px-3" : size === "lg" ? "h-12 px-6" : "h-10";
    return <Comp ref={ref} className={[base, variants, sizes, className].join(" ")} {...props} />;
  }
);
Button.displayName = "Button";
