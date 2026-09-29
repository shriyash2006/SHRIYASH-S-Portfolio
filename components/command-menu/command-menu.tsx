"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  FileText,
  Briefcase,
  Layers,
  BookOpen,
  Mail,
  Home,
  Sun,
  Moon,
  X,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDesignImport?: () => void;
}

interface CommandItem {
  id: string;
  name: string;
  category: "Navigation" | "Theme" | "External" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export function CommandMenu({
  isOpen,
  onClose,
  onOpenDesignImport,
}: CommandMenuProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const commands: CommandItem[] = [
    {
      id: "home",
      name: "Go to Home",
      category: "Navigation",
      icon: Home,
      action: () => router.push("/"),
    },
    {
      id: "about",
      name: "About Shriyash Sahu",
      category: "Navigation",
      icon: FileText,
      action: () => router.push("/about"),
    },
    {
      id: "projects",
      name: "Portfolio / Selected Works",
      category: "Navigation",
      icon: Layers,
      action: () => router.push("/projects"),
    },
    {
      id: "experience",
      name: "Experience & Journey",
      category: "Navigation",
      icon: Briefcase,
      action: () => router.push("/experience"),
    },
    {
      id: "blog",
      name: "Technical Blog & Notes",
      category: "Navigation",
      icon: BookOpen,
      action: () => router.push("/blog"),
    },
    {
      id: "contact",
      name: "Contact & Transmission",
      category: "Navigation",
      icon: Mail,
      action: () => router.push("/contact"),
    },
    {
      id: "design-import",
      name: "Start with your design (Import DESIGN.md)",
      category: "Actions",
      icon: Sparkles,
      action: () => {
        if (onOpenDesignImport) onOpenDesignImport();
      },
    },
    {
      id: "theme",
      name: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      category: "Theme",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        trackEvent({ name: "theme_toggle", theme: next });
      },
    },
    {
      id: "resume",
      name: "Download Resume (PDF)",
      category: "External",
      icon: FileText,
      action: () => {
        trackEvent({ name: "resume_click", format: "pdf" });
        window.open(siteConfig.resumePdf, "_blank");
      },
    },
    {
      id: "github",
      name: "View GitHub Profile (@shriyash2006)",
      category: "External",
      icon: GithubIcon,
      action: () => window.open(siteConfig.github, "_blank"),
    },
    {
      id: "linkedin",
      name: "View LinkedIn Profile",
      category: "External",
      icon: LinkedinIcon,
      action: () => window.open(siteConfig.linkedin, "_blank"),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // triggered by parent
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? (filteredCommands.length || 1) - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredCommands, selectedIndex]);

  // Reset selected index when query changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-brand-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-background border border-border shadow-2xl overflow-hidden text-foreground"
        role="dialog"
        aria-modal="true"
        aria-label="Command Menu"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border bg-card">
          <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1 hover:text-foreground text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-border/20">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-muted-foreground">
              No matching commands found for &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 text-xs font-mono cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-foreground text-background font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{cmd.name}</span>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider ${
                      isSelected ? "text-background/80" : "text-muted-foreground"
                    }`}
                  >
                    {cmd.category}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border bg-muted/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
          <span>Navigate with ↑ and ↓</span>
          <span>Select with ↵</span>
          <span>Exit with ESC</span>
        </div>
      </div>
    </div>
  );
}
