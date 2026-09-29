import * as React from "react";
import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  label: string;
  sublabel?: string;
}

const verifiedStats: StatItem[] = [
  {
    value: "04+",
    label: "ENGINEERED SYSTEMS",
    sublabel: "Full-Stack, AI & Architecture",
  },
  {
    value: "650+",
    label: "HACKATHON BUILDERS",
    sublabel: "ORIGIN'26 Execution Lead",
  },
  {
    value: "05+",
    label: "HACKATHON PODIUMS",
    sublabel: "Duality AI, VIBEHACK, CSI",
  },
  {
    value: "100%",
    label: "MONOCHROME DISCIPLINE",
    sublabel: "Black & White Precision",
  },
];

export function HeroStats({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-border",
        className
      )}
    >
      {verifiedStats.map((stat, idx) => (
        <div key={idx} className="flex flex-col space-y-1">
          <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tightest text-foreground">
            {stat.value}
          </span>
          <span className="editorial-tag text-[10px] sm:text-[11px] text-foreground tracking-[0.2em] font-semibold">
            {stat.label}
          </span>
          {stat.sublabel && (
            <span className="text-xs text-muted-foreground font-normal">
              {stat.sublabel}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
