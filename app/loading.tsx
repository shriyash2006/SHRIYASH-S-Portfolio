import { GeometricLogo } from "@/components/ui/geometric-logo";

export default function Loading() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" role="status" aria-live="polite">
      <div className="loader-grid grid-paper-pattern" aria-hidden="true" />

      <div className="loader-frame">
        <div className="flex items-center justify-between pb-5 border-b border-border">
          <div className="flex items-center gap-3">
            <GeometricLogo size={36} />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                SHRIYASH / 2026
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                Portfolio system
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">01—01</span>
        </div>

        <div className="py-8">
          <p className="editorial-tag text-muted-foreground">Preparing the archive</p>
          <p className="mt-3 text-2xl sm:text-3xl tracking-tightest font-medium">LOADING VIEW</p>
        </div>

        <div className="h-1 w-full bg-muted overflow-hidden" aria-hidden="true">
          <div className="loader-progress" />
        </div>

        <div className="flex items-center justify-between pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
          <span>Initializing interface</span>
          <span>Stand by</span>
        </div>
      </div>
    </div>
  );
}
