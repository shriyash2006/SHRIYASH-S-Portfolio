import { GeometricLogo } from "@/components/ui/geometric-logo";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <GeometricLogo size={44} />
        {/* Minimal geometric pulse line */}
        <div className="absolute -inset-1 border border-foreground/30 animate-ping rounded-none" />
      </div>

      <div className="flex flex-col items-center space-y-2">
        <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground animate-pulse">
          INITIALIZING VIEW // SHRIYASH SAHU
        </span>
        <div className="w-24 h-[1px] bg-border overflow-hidden">
          <div className="w-full h-full bg-foreground animate-progress origin-left" />
        </div>
      </div>
    </div>
  );
}
