import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  number?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "split";
  children?: React.ReactNode;
}

export function SectionHeading({
  label,
  number,
  title,
  subtitle,
  className,
  align = "left",
  children,
}: SectionHeadingProps) {
  if (align === "split") {
    return (
      <div className={cn("mb-12 md:mb-16", className)}>
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            {number && (
              <span className="font-mono text-xs text-muted-foreground tracking-wider">
                ({number})
              </span>
            )}
            <span className="editorial-tag text-muted-foreground">{label}</span>
          </div>
          {children && <div>{children}</div>}
        </div>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
          <h2 className="lg:col-span-7 text-section-title font-medium tracking-tightest leading-[1.08] text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="lg:col-span-5 text-muted-foreground text-base sm:text-lg leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-3 pb-3 border-b border-border/80">
        {number && (
          <span className="font-mono text-xs text-muted-foreground tracking-wider">
            /{number}/
          </span>
        )}
        <span className="editorial-tag text-muted-foreground tracking-[0.24em]">
          {label}
        </span>
      </div>
      <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-section-title font-medium tracking-tightest leading-[1.08] text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-muted-foreground text-base sm:text-lg leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {children && <div className="shrink-0">{children}</div>}
      </div>
    </div>
  );
}
