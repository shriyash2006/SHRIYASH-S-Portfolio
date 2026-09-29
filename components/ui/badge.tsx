import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "subtle";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const base =
    "inline-flex items-center text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] px-2.5 py-1 border transition-colors select-none";

  const variants = {
    default:
      "border-border bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]",
    outline: "border-border text-muted-foreground bg-transparent",
    subtle:
      "border-transparent bg-foreground/[0.06] text-foreground/80 hover:text-foreground",
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
}
