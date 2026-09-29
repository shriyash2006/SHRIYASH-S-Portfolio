"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface SignatureProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Signature({
  className,
  width = 240,
  height = 96,
}: SignatureProps) {
  return (
    <div
      className={cn("relative inline-block opacity-90 hover:opacity-100 transition-opacity", className)}
      style={{ width, height }}
      aria-label="SHRIYASH SAHU — Personal Signature"
    >
      {/* Light theme signature: Black ink on white */}
      <Image
        src="/profile/signature-light.png"
        alt="Shriyash Sahu Signature"
        width={width}
        height={height}
        className="block dark:hidden object-contain w-full h-full mix-blend-multiply"
      />
      {/* Dark theme signature: White ink on black */}
      <Image
        src="/profile/signature-dark.png"
        alt="Shriyash Sahu Signature"
        width={width}
        height={height}
        className="hidden dark:block object-contain w-full h-full mix-blend-screen"
      />
    </div>
  );
}
