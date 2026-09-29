import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Check, Layers, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { projects, getProjectBySlug, getNextProject } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer/footer";
import { constructMetadata } from "@/lib/metadata";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return constructMetadata({ title: "Project Not Found" });
  }

  return constructMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(project.slug);

  return (
    <>
      <article className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Back Navigation Bar */}
          <div className="mb-10 pb-4 border-b border-border flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Selected Works</span>
            </Link>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-muted-foreground">PROJECT</span>
              <span className="font-bold text-foreground">/{project.number}/</span>
            </div>
          </div>

          {/* Project Title Header */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="editorial-tag text-muted-foreground">
                {project.category}
              </span>
              <span className="text-muted-foreground font-mono text-xs">•</span>
              <span className="font-mono text-xs text-foreground font-semibold">
                {project.year}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tightest text-foreground">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {project.subtitle}
            </p>

            {/* Action Links (Live & GitHub) */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold border border-foreground hover:bg-background hover:text-foreground transition-all duration-200 inline-flex items-center gap-2"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-transparent text-foreground font-mono text-xs uppercase tracking-wider font-semibold border border-border hover:border-foreground transition-all duration-200 inline-flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Media Showcase */}
          <div className="mb-16 border border-border bg-card p-3 sm:p-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-950">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center grayscale contrast-105"
              />
            </div>
            <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>MEDIA EXHIBIT // {project.slug.toUpperCase()}</span>
              <span>YEAR {project.year}</span>
            </div>
          </div>

          {/* Metrics Row (if available) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-border py-6">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block">
                    {m.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-medium tracking-tight text-foreground block">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Core Case Study Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left 8 Cols: Overview, Problem, Solution, Contribution */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <section className="space-y-4">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  01 // OVERVIEW
                </h2>
                <p className="text-base sm:text-lg text-foreground leading-relaxed">
                  {project.overview}
                </p>
              </section>

              {/* Problem */}
              <section className="space-y-4 pt-8 border-t border-border">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  02 // THE PROBLEM
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </section>

              {/* Solution */}
              <section className="space-y-4 pt-8 border-t border-border">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  03 // ARCHITECTURAL SOLUTION
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </section>

              {/* Engineering Contributions */}
              <section className="space-y-4 pt-8 border-t border-border">
                <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  04 // CORE CONTRIBUTIONS
                </h2>
                <ul className="space-y-3">
                  {project.contribution.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm sm:text-base text-foreground flex items-start gap-3 leading-relaxed"
                    >
                      <span className="font-mono text-foreground shrink-0 mt-1">
                        ↳
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Architecture Notes */}
              {project.architectureNotes && (
                <section className="space-y-4 pt-8 border-t border-border">
                  <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    05 // SYSTEM BLUEPRINT & DESIGN CHOICES
                  </h2>
                  <div className="p-6 border border-border bg-card space-y-3">
                    {project.architectureNotes.map((note, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-muted-foreground">
                        <Terminal className="w-3.5 h-3.5 text-foreground shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right 4 Cols: Technology Stack & Specs */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-28 border border-border bg-card p-6 space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-3">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">CATEGORY</span>
                    <span className="font-semibold text-foreground">{project.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">YEAR</span>
                    <span className="font-semibold text-foreground">{project.year}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="text-muted-foreground">STATUS</span>
                    <span className="font-semibold text-foreground">Production Verified</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="w-full py-3 bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold border border-foreground hover:bg-background hover:text-foreground transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    <span>Discuss This Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Next Project Footer Bar */}
          <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block mb-1">
                NEXT CASE STUDY
              </span>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground hover:underline inline-flex items-center gap-2 group"
              >
                <span>{nextProject.title}</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            <Link
              href="/projects"
              className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              View Full Archive ({projects.length} Works)
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
