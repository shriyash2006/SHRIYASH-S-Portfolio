"use client";

import * as React from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Footer } from "@/components/footer/footer";
import { projects } from "@/content/projects";

const categories = [
  "All",
  "Full-Stack Web",
  "AI & EdTech",
  "Systems & Architecture",
  "Automation",
] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <>
      <div className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <SectionHeading
            number="02"
            label="PORTFOLIO ARCHIVE"
            title="Selected Works"
            subtitle="Curated collection of production web platforms, AI EdTech applications, and distributed system architectures."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-12 pb-6 border-b border-border">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors border ${
                    isSelected
                      ? "bg-foreground text-background border-foreground font-semibold"
                      : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} layout="grid" />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-xs font-mono text-muted-foreground border border-dashed border-border">
              No projects found matching category &quot;{selectedCategory}&quot;.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
