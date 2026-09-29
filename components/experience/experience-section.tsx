import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/content/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-28 border-b border-border">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="04"
          label="EXPERIENCE"
          title="My Journey"
          subtitle="Documented leadership, community advocacy, and open-source contributions."
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
          >
            <span>Full Journey & Timeline</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </SectionHeading>

        {/* Editorial Timeline Grid */}
        <div className="border-t border-border divide-y divide-border">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              {/* Left Column: Organization, Role, Period, Location */}
              <div className="lg:col-span-4 space-y-3">
                <span className="font-mono text-xs text-muted-foreground">
                  /0{idx + 1}/
                </span>
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                  {exp.organization}
                </h3>
                <p className="font-mono text-xs sm:text-sm text-foreground uppercase tracking-wider font-semibold">
                  {exp.role}
                </p>

                <div className="flex flex-col gap-1.5 pt-2 text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {exp.startDate} — {exp.endDate}
                    </span>
                    {exp.current && (
                      <span className="text-[10px] bg-foreground text-background px-1.5 py-0.2 tracking-widest uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative, Bullet Points, and Tags */}
              <div className="lg:col-span-8 space-y-6">
                <p className="text-base text-foreground font-normal leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-3">
                  {exp.achievements.map((item, achievementIdx) => (
                    <li
                      key={achievementIdx}
                      className="text-sm text-muted-foreground flex items-start gap-3 leading-relaxed"
                    >
                      <span className="font-mono text-foreground shrink-0 mt-0.5">
                        ↳
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
