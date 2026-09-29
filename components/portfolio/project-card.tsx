"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

interface ProjectCardProps {
  project: Project;
  layout?: "grid" | "featured";
}

export function ProjectCard({ project, layout = "featured" }: ProjectCardProps) {
  return (
    <article className="group border border-border bg-card hover:border-foreground/80 transition-colors duration-250 flex flex-col justify-between overflow-hidden">
      {/* Card Header: Project Number, Category, Year */}
      <div className="p-6 pb-4 flex items-center justify-between border-b border-border/80 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground tracking-wider">
            /{project.number}/
          </span>
          <span className="text-muted-foreground uppercase tracking-widest text-[11px]">
            {project.category}
          </span>
        </div>
        <span className="text-muted-foreground font-mono">{project.year}</span>
      </div>

      {/* Media Showcase: Image with 1.03-1.06 hover scale */}
      <Link
        href={`/projects/${project.slug}`}
        onClick={() => trackEvent({ name: "project_open", slug: project.slug })}
        className="relative block w-full aspect-[16/9] overflow-hidden bg-brand-950 border-b border-border group-hover:opacity-95 transition-opacity"
        aria-label={`View case study: ${project.title}`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
          className="object-cover object-center grayscale contrast-105 transition-transform duration-300 ease-out group-hover:scale-105"
        />
        {/* Subtle hover vignette / overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.04] transition-colors duration-200" />
      </Link>

      {/* Card Content: Title, Description, Tech Stack */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <Link
              href={`/projects/${project.slug}`}
              className="group-hover:underline underline-offset-4 decoration-1"
            >
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                {project.title}
              </h3>
            </Link>
            <Link
              href={`/projects/${project.slug}`}
              className="p-1.5 border border-border group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-200 shrink-0"
              aria-label={`Open ${project.title}`}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <p className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider mb-3">
            {project.subtitle}
          </p>

          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-6 font-normal">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="default">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="outline">+{project.technologies.length - 5}</Badge>
            )}
          </div>

          {/* Quick External Actions */}
          <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  title="View GitHub Repository"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  title="View Live Platform"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live</span>
                </a>
              )}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="text-foreground font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Case Study</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
