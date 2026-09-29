import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/content/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28 border-b border-border">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="06"
          label="SKILLS"
          title="Technical Stack"
          subtitle="Core programming languages, application frameworks, databases, and DevOps practices."
        />

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((group, idx) => (
            <div
              key={group.key}
              className="border border-border bg-card p-6 sm:p-8 flex flex-col justify-between hover:border-foreground/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border text-xs font-mono">
                  <span className="text-muted-foreground">/0{idx + 1}/</span>
                  <span className="editorial-tag text-foreground tracking-widest">
                    {group.title}
                  </span>
                </div>

                <p className="mt-4 text-xs text-muted-foreground leading-relaxed mb-6 font-normal">
                  {group.description}
                </p>
              </div>

              {/* Skill Items */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center text-xs font-mono px-3 py-1.5 border border-border bg-foreground/[0.02] text-foreground hover:bg-foreground hover:text-background transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Rigor note without fake percentages */}
        <div className="mt-12 p-6 border border-border/70 bg-foreground/[0.015] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <span>* EVALUATED THROUGH PRODUCTION PROJECTS, HACKATHON PROTOCOLS, AND GITHUB COMMITS</span>
          <span className="text-foreground uppercase tracking-widest font-semibold">NO ARBITRARY PERCENTAGES</span>
        </div>
      </div>
    </section>
  );
}
