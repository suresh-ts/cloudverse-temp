import { Section } from "./Section";
import { Link } from "wouter";
import { Button } from "./Button";
import { Skeleton } from "./Skeleton";
import { cn } from "@/lib/utils";

interface FeatureBandProps {
  eyebrow: string;
  title: string;
  body: string;
  linkText: string;
  linkHref: string;
  reversed?: boolean;
}

export function FeatureBand({ eyebrow, title, body, linkText, linkHref, reversed = false }: FeatureBandProps) {
  return (
    <Section padding="primary">
      <div className={cn(
        "flex flex-col gap-12 lg:gap-24 items-center",
        reversed ? "lg:flex-row-reverse" : "lg:flex-row"
      )}>
        <div className="flex-1 space-y-6 text-left">
          <span className="cv-cap font-semibold tracking-widest uppercase text-cv-muted">
            {eyebrow}
          </span>
          <h2 className="cv-h2">{title}</h2>
          <p className="cv-body text-cv-muted max-w-md">
            {body}
          </p>
          <div>
            <Link href={linkHref}>
              <Button variant="tertiary" className="text-[17px]">
                {linkText}
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex-1 w-full">
           {/* Placeholder for feature screenshot */}
           <div className="aspect-[4/3] w-full">
              <Skeleton className="w-full h-full shadow-cv-card bg-cv-surface" />
           </div>
        </div>
      </div>
    </Section>
  );
}
