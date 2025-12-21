import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "gray";
  padding?: "hero" | "primary" | "utility" | "none";
}

export function Section({ 
  children, 
  className, 
  id, 
  background = "white",
  padding = "primary" 
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full",
        background === "gray" ? "bg-cv-surface2" : "bg-cv-surface",
        {
          "py-cv-sec-xl": padding === "hero",
          "py-cv-sec-lg": padding === "primary",
          "py-cv-sec-md": padding === "utility",
          "py-0": padding === "none",
        },
        className
      )}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {children}
      </div>
    </section>
  );
}
