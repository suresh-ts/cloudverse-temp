import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-cv bg-cv-surface text-cv-ink p-8 border border-cv-line shadow-cv-card",
          hover && "transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
