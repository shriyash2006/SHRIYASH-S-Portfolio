import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "./project-card";
import { projects } from "@/content/projects";

export function PortfolioSection() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="portfolio" className="py-20 md:py-28 border-b border-border">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="02"
          label="PORTFOLIO"
          title="Selected Works"
          subtitle="Production web applications, educational automations, and distributed backend architectures."
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
          >
            <span>All Projects ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </SectionHeading>

        {/* 2-Column Architectural Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} layout="grid" />
          ))}
        </div>

        {/* Bottom index link */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <span>SOURCE CODE VERIFIED ON GITHUB</span>
          <Link
            href="/projects"
            className="text-foreground uppercase tracking-widest font-semibold hover:underline inline-flex items-center gap-1.5"
          >
            <span>Explore All Architecture Blueprints</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
