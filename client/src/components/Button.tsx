import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Tertiary adds an automatic chevron if not present in children (simplified logic: just append icon visually)
    const isTertiary = variant === "tertiary";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            // Primary: Filled, pill, subtle shadow
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm": variant === "primary",
            // Secondary: Outline style per request
            "bg-transparent text-primary border border-primary/30 hover:bg-primary/5": variant === "secondary",
            // Tertiary: Text link + chevron
            "text-primary hover:text-primary/80 hover:underline p-0 h-auto bg-transparent": variant === "tertiary",
            // Extras
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground": variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            
            "h-8 px-4 text-xs": size === "sm" && !isTertiary,
            "h-10 px-6 text-[15px]": size === "md" && !isTertiary,
            "h-12 px-8 text-[17px]": size === "lg" && !isTertiary,
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {isTertiary && <ChevronRight className="ml-1 w-4 h-4" />}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
