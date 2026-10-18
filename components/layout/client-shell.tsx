"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar/navbar";
import { CommandMenu } from "@/components/command-menu/command-menu";
import { MotionLayer } from "@/components/motion/motion-layer";


export function ClientShell({ children }: { children: React.ReactNode }) {
  const [commandMenuOpen, setCommandMenuOpen] = React.useState(false);
  

  // Global ⌘K keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <MotionLayer />
      <Navbar onOpenCommandMenu={() => setCommandMenuOpen(true)} />

      <main id="main-content" className="relative z-[1] flex-1">
        {children}
      </main>

      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </div>
  );
}
