"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GeometricLogo } from "@/components/ui/geometric-logo";
import { Signature } from "@/components/ui/signature";
import { siteConfig, navigationLinks } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="w-full bg-brand-black text-brand-white border-t border-brand-800">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 pb-12">
        {/* Top: Large Email Callout */}
        <div className="pb-16 border-b border-brand-800 space-y-4">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-brand-500">
            CONNECT & INQUIRE
          </span>
          <div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight hover:underline underline-offset-8 block transition-opacity hover:opacity-85 text-brand-white"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        {/* Middle Grid: Brand, Navigation, Socials, Signature */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-brand-800">
          {/* Col 1: SS Logo & Brand statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <GeometricLogo size={42} />
              <div>
                <span className="font-semibold text-sm tracking-[0.16em] uppercase block text-brand-white">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-brand-500 font-mono">
                  {siteConfig.degree} · VIT Bhopal
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-brand-500 max-w-sm leading-relaxed">
              Minimalist, technical portfolio exploring modern full-stack web applications, AI-driven learning tools, and distributed software systems.
            </p>
            <div className="pt-2">
              <Signature width={160} height={50} />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-500 block">
              DIRECTORY
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider font-mono">
              <li>
                <Link
                  href="/"
                  className="text-brand-300 hover:text-brand-white transition-colors"
                >
                  Home
                </Link>
              </li>
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brand-300 hover:text-brand-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social & Professional Links */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-500 block">
              CHANNELS
            </span>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-300 hover:text-brand-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>GitHub (@shriyash2006)</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-500" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-300 hover:text-brand-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>LinkedIn (shriyash-sahu)</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-500" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ name: "resume_click", format: "pdf" })}
                  className="text-brand-300 hover:text-brand-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Curriculum Vitae (PDF)</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-500" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.resumePng}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ name: "resume_click", format: "png" })}
                  className="text-brand-500 hover:text-brand-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Resume Image Archive</span>
                  <ArrowUpRight className="w-3 h-3 text-brand-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tech */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-brand-500">
          <div>
            © 2026 {siteConfig.name}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>BUILT WITH NEXT.JS 15 & TYPESCRIPT</span>
            <span>•</span>
            <span>STRICT MONOCHROME</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
