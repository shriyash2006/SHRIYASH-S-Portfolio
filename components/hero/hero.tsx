"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, FileDown } from "lucide-react";
import { HeroStats } from "./stats";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-8 sm:pt-12 pb-12 border-b border-border">
      {/* Background architectural corner coordinates */}
      <div className="absolute top-6 right-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden lg:block select-none">
        LOC: 23.07°N 76.85°E // VIT BHOPAL
      </div>

      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-6 sm:py-10">
          {/* Left Column: Typography, Identity, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Metadata Bar */}
            <div className="flex items-center gap-3 mb-6">
              <span className="editorial-tag text-muted-foreground tracking-[0.24em]">
                PERSONAL PORTFOLIO
              </span>
              <span className="text-muted-foreground font-mono text-xs">/</span>
              <span className="font-mono text-xs text-foreground tracking-wider font-semibold">
                2026
              </span>
              <span className="text-muted-foreground font-mono text-xs">/</span>
              <span className="font-mono text-xs text-muted-foreground uppercase hidden sm:inline-block">
                VIT CSE
              </span>
            </div>

            {/* Giant Architectural Headline */}
            <h1 className="text-hero-mobile sm:text-hero-tablet lg:text-hero-desktop font-medium tracking-tightest text-foreground uppercase mb-6">
              HELLO.
            </h1>

            {/* Sub-Headline / Identity */}
            <div className="mb-6 space-y-2">
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-muted-foreground font-semibold">
                I AM {siteConfig.name}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground font-normal max-w-2xl leading-relaxed tracking-tight">
                Computer Science student and developer building thoughtful digital products, software and technical experiences.
              </p>
            </div>

            {/* Factual Note */}
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed mb-8">
              Undergraduate at Vellore Institute of Technology (VIT Bhopal), specializing in full-stack web applications, AI-powered learning engines, and distributed systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#portfolio"
                className="px-6 py-3.5 bg-foreground text-background font-medium text-xs sm:text-sm tracking-wider uppercase border border-foreground hover:bg-background hover:text-foreground transition-all duration-200 flex items-center gap-2"
              >
                <span>View My Work</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <Link
                href="/contact"
                className="px-6 py-3.5 bg-transparent text-foreground font-medium text-xs sm:text-sm tracking-wider uppercase border border-border hover:border-foreground transition-all duration-200 flex items-center gap-2"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <a
                href={siteConfig.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent({ name: "resume_click", format: "pdf" })}
                className="px-4 py-3.5 bg-transparent text-muted-foreground hover:text-foreground font-medium text-xs sm:text-sm tracking-wider uppercase border border-transparent hover:border-border transition-all duration-200 flex items-center gap-2"
                title="Download Resume PDF"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden sm:inline">Resume</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-Res Supplied Profile Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] aspect-[4/5] border border-border bg-card p-3 sm:p-4 group">
              {/* Corner crosshairs */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-foreground" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-foreground" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-foreground" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-foreground" />

              <div className="relative w-full h-full overflow-hidden bg-brand-950 grayscale contrast-110">
                <Image
                  src="/profile/shriyash-sahu.png"
                  alt="SHRIYASH SAHU — Developer & Computer Science Student"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 420px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Photo Frame Footer */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <span>PORTRAIT // ARCHIVE</span>
                <span className="font-semibold text-foreground">VIT BHOPAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Verified Stats Grid */}
        <HeroStats />
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 w-full pt-8 flex items-center justify-between text-xs text-muted-foreground font-mono">
        <a
          href="#about"
          className="inline-flex items-center gap-2 hover:text-foreground transition-colors group"
        >
          <span>Scroll to explore</span>
          <span className="inline-block transition-transform duration-200 group-hover:translate-y-1">
            ↓
          </span>
        </a>
        <span className="hidden sm:inline-block">INDEX // 01-08</span>
      </div>
    </section>
  );
}
