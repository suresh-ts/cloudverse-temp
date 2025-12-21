import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className, width = "100%", height = "100%" }: SkeletonProps) {
  return (
    <div 
      className={cn(
        "animate-pulse bg-cv-surface2 rounded-cv border border-cv-line/50",
        className
      )}
      style={{ width, height }}
    >
      {/* Internal structure to make it look like a dashboard UI */}
      <div className="h-full w-full p-6 flex flex-col gap-4 opacity-50">
        <div className="h-8 w-1/3 bg-cv-line/50 rounded-md"></div>
        <div className="flex gap-4 h-full">
            <div className="w-1/4 h-full bg-cv-line/30 rounded-md"></div>
            <div className="w-3/4 h-full flex flex-col gap-4">
                <div className="h-1/3 w-full bg-cv-line/30 rounded-md"></div>
                <div className="h-2/3 w-full bg-cv-line/30 rounded-md"></div>
            </div>
        </div>
      </div>
    </div>
  );
}
