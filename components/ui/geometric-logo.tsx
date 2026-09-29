"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GeometricLogoProps {
  size?: number;
  className?: string;
  href?: string;
  priority?: boolean;
}

export function GeometricLogo({
  size = 36,
  className,
  href = "/",
  priority = false,
}: GeometricLogoProps) {
  const content = (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-brand-800/30 dark:border-brand-200/20 bg-brand-white dark:bg-brand-black transition-transform duration-200 hover:scale-105",
        className
      )}
      style={{ width: size, height: size }}
      title="SHRIYASH SAHU — Interlocking SS Emblem"
    >
      {/* Light theme logo: Black mark on white */}
      <Image
        src="/logo/ss-logo-light.png"
        alt="SS Logo"
        width={size}
        height={size}
        priority={priority}
        className="block dark:hidden object-contain w-full h-full p-0.5"
      />
      {/* Dark theme logo: White mark on black */}
      <Image
        src="/logo/ss-logo-dark.png"
        alt="SS Logo"
        width={size}
        height={size}
        priority={priority}
        className="hidden dark:block object-contain w-full h-full p-0.5"
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-foreground"
        aria-label="SHRIYASH SAHU — Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
