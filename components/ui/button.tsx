import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground disabled:opacity-40 disabled:pointer-events-none group border";

    const variantStyles = {
      // Inversion based on theme:
      // In light mode: black bg + white text -> hover white bg + black text
      // In dark mode: white bg + black text -> hover black bg + white text
      primary:
        "bg-brand-black text-brand-white border-brand-black dark:bg-brand-white dark:text-brand-black dark:border-brand-white hover:bg-transparent hover:text-brand-black dark:hover:bg-transparent dark:hover:text-brand-white",
      secondary:
        "bg-brand-100 text-brand-black border-brand-200 dark:bg-brand-900 dark:text-brand-white dark:border-brand-800 hover:border-brand-black dark:hover:border-brand-white",
      outline:
        "bg-transparent text-foreground border-border hover:border-foreground hover:bg-foreground/5",
      ghost:
        "bg-transparent text-foreground border-transparent hover:bg-foreground/5",
      link:
        "bg-transparent text-foreground border-transparent underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizeStyles = {
      sm: "text-xs tracking-wider uppercase px-3.5 py-1.5 gap-1.5",
      md: "text-sm tracking-wide px-5 py-2.5 gap-2",
      lg: "text-base tracking-wide px-7 py-3.5 gap-2.5",
    };

    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
