"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowUpRight,
  Command as CommandIcon,
} from "lucide-react";
import { GeometricLogo } from "@/components/ui/geometric-logo";
import { navigationLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface NavbarProps {
  onOpenCommandMenu?: () => void;
}

export function Navbar({ onOpenCommandMenu }: NavbarProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    trackEvent({ name: "theme_toggle", theme: nextTheme });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-background/40 backdrop-blur-sm border-b border-border/40"
      )}
    >
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 h-18 sm:h-20 flex items-center justify-between">
        {/* Left: Official Geometric SS Logo & Name */}
        <div className="flex items-center gap-4">
          <GeometricLogo size={36} priority />
          <Link
            href="/"
            className="flex flex-col group focus:outline-none"
            aria-label="SHRIYASH SAHU — Home"
          >
            <span className="font-semibold text-sm tracking-[0.14em] uppercase text-foreground transition-opacity group-hover:opacity-70">
              {siteConfig.name}
            </span>
            <span className="text-[10px] tracking-wider text-muted-foreground uppercase font-mono hidden sm:inline-block">
              Portfolio 2026
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-8 lg:gap-10 text-xs uppercase tracking-[0.18em]"
          aria-label="Main Navigation"
        >
          {navigationLinks.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative py-1 transition-colors hover:text-foreground",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (Theme Toggle, Command, Resume, Contact) */}
        <div className="hidden sm:flex items-center gap-3">


          {/* Command Palette Trigger */}
          {onOpenCommandMenu && (
            <button
              onClick={onOpenCommandMenu}
              className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-foreground px-2 py-1.5 border border-border hover:border-foreground/60 transition-colors"
              title="Open Command Menu (⌘K)"
              aria-label="Open Command Menu"
            >
              <CommandIcon className="w-3.5 h-3.5" />
              <span className="text-[10px]">K</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle monochrome color theme"
            className="p-2 border border-border hover:border-foreground text-muted-foreground hover:text-foreground transition-colors"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Resume link */}
          <a
            href={siteConfig.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent({ name: "resume_click", format: "pdf" })
            }
            className="text-xs uppercase tracking-wider px-3 py-2 border border-border hover:border-foreground text-foreground transition-colors flex items-center gap-1"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className="text-xs uppercase tracking-wider px-4 py-2 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-all duration-200 flex items-center gap-1 font-medium"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle monochrome color theme"
            className="p-2 border border-border text-foreground"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 border border-border text-foreground"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-background/95 backdrop-blur-xl px-6 py-8 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-6 text-sm uppercase tracking-[0.2em]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "pb-2 border-b border-border/40",
                pathname === "/" ? "text-foreground font-bold" : "text-muted-foreground"
              )}
            >
              00 — Home
            </Link>
            {navigationLinks.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "pb-2 border-b border-border/40 flex items-center justify-between",
                  pathname.startsWith(item.href)
                    ? "text-foreground font-bold"
                    : "text-muted-foreground"
                )}
              >
                <span>
                  0{index + 1} — {item.name}
                </span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </Link>
            ))}
            <a
              href={siteConfig.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent({ name: "resume_click", format: "pdf" });
                setMobileMenuOpen(false);
              }}
              className="pb-2 border-b border-border/40 flex items-center justify-between text-muted-foreground"
            >
              <span>07 — Resume (PDF)</span>
              <ArrowUpRight className="w-4 h-4 opacity-50" />
            </a>



            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-foreground text-background font-semibold text-xs tracking-widest uppercase border border-foreground"
              >
                Get In Touch ↗
              </Link>
              <div className="text-center text-[11px] font-mono text-muted-foreground mt-2">
                shriyashsahu2006@gmail.com
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
