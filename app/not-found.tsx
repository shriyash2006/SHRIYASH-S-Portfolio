import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GeometricLogo } from "@/components/ui/geometric-logo";
import { Footer } from "@/components/footer/footer";

export default function NotFound() {
  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-5 sm:px-8 border-b border-border">
        <div className="max-w-md w-full border border-border bg-card p-8 sm:p-10 text-center space-y-6">
          <div className="flex justify-center">
            <GeometricLogo size={48} />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block">
              STATUS CODE 404 // NOT FOUND
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
              Looks like this page took a different route.
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The resource you requested does not exist or has been shifted in the directory structure.
          </p>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold border border-foreground hover:bg-background hover:text-foreground transition-all duration-200 inline-flex items-center justify-center gap-1.5"
            >
              <span>Back Home</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 py-3 bg-transparent text-foreground font-mono text-xs uppercase tracking-wider font-semibold border border-border hover:border-foreground transition-all duration-200 inline-flex items-center justify-center gap-1.5"
            >
              <span>View Projects</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
