import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "gray";
  padding?: "hero" | "primary" | "utility" | "none";
  container?: "default" | "wide" | "full" | "none";
}

export function Section({ 
  children, 
  className, 
  id, 
  background = "white",
  padding = "primary",
  container = "default"
}: SectionProps) {
  const containerClass = {
    default: "cv-container",
    wide: "cv-container-wide",
    full: "cv-container-full",
    none: ""
  };

  return (
    <section
      id={id}
      className={cn(
        "w-full",
        background === "gray" ? "bg-cv-surface2" : "bg-cv-surface",
        {
          "py-14 sm:py-20 lg:py-24": padding === "hero",
          "py-14 sm:py-16 lg:py-20": padding === "primary",
          "py-10 sm:py-12 lg:py-14": padding === "utility",
          "py-0": padding === "none",
        },
        className
      )}
    >
      {container === "none" ? (
        children
      ) : (
        <div className={containerClass[container]}>
          {children}
        </div>
      )}
    </section>
  );
}
