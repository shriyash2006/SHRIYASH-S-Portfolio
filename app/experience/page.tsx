import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Award, CheckCircle2, FileDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer/footer";
import { experiences } from "@/content/experience";
import { leadershipItems } from "@/content/leadership";
import { siteConfig } from "@/lib/site-config";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Experience & Journey",
  description:
    "Documented engineering journey, leadership positions, and hackathon milestones of SHRIYASH SAHU.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <>
      <div className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <SectionHeading
            number="04"
            label="EXPERIENCE & MILESTONES"
            title="My Journey"
            subtitle="Documented leadership, community advocacy, and open-source contributions."
          >
            <a
              href={siteConfig.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2 border border-border hover:border-foreground transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </SectionHeading>

          {/* Core Roles & Timeline */}
          <div className="border-t border-border divide-y divide-border">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
              >
                {/* Left 4 Cols: Organization, Role, Metadata */}
                <div className="lg:col-span-4 space-y-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    /0{idx + 1}/
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                    {exp.organization}
                  </h2>
                  <p className="font-mono text-sm text-foreground uppercase tracking-wider font-semibold">
                    {exp.role}
                  </p>

                  <div className="flex flex-col gap-1.5 pt-3 text-xs font-mono text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {exp.startDate} — {exp.endDate}
                      </span>
                      {exp.current && (
                        <span className="text-[10px] bg-foreground text-background px-1.5 py-0.2 tracking-widest uppercase font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right 8 Cols: Detailed Achievements & Tags */}
                <div className="lg:col-span-8 space-y-6">
                  <p className="text-base sm:text-lg text-foreground font-normal leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block">
                      KEY DELIVERABLES & IMPACT
                    </span>
                    <ul className="space-y-3">
                      {exp.achievements.map((item, itemIdx) => (
                        <li
                          key={itemIdx}
                          className="text-sm sm:text-base text-muted-foreground flex items-start gap-3 leading-relaxed"
                        >
                          <span className="font-mono text-foreground shrink-0 mt-1">
                            ↳
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
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

          {/* Hackathon Honours & Competitive Placements */}
          <div className="mt-20 pt-16 border-t border-border space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="editorial-tag text-muted-foreground">
                  HONOURS & RECOGNITIONS
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground mt-2">
                  Competitive Engineering & Awards
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {leadershipItems.map((honour) => (
                <div
                  key={honour.id}
                  className="border border-border bg-card p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>/{honour.number}/</span>
                      <span>{honour.date}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      {honour.title}
                    </h4>
                    <span className="text-xs font-mono uppercase text-muted-foreground block">
                      {honour.organization}
                    </span>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
                      {honour.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/40 space-y-1">
                    {honour.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="text-xs font-mono text-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-foreground shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
