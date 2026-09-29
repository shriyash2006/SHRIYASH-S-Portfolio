import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, Award, BookOpen, Sparkles, Terminal, FileDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Signature } from "@/components/ui/signature";
import { Footer } from "@/components/footer/footer";
import { siteConfig } from "@/lib/site-config";
import { constructMetadata } from "@/lib/metadata";
import { leadershipItems } from "@/content/leadership";

export const metadata: Metadata = constructMetadata({
  title: "About",
  description:
    "Learn about SHRIYASH SAHU — Computer Science student at VIT Bhopal, software developer, and hackathon leader.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <div className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Page Header */}
          <SectionHeading
            number="01"
            label="BIOGRAPHY & DOSSIER"
            title="About Shriyash Sahu"
            subtitle="Developer, student leader, and computer science undergraduate building resilient systems."
          />

          {/* Hero Bio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-6">
            {/* Left: Profile Portrait with architectural accents */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 border border-border bg-card p-4 space-y-4">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-950 grayscale contrast-110">
                  <Image
                    src="/profile/shriyash-sahu.png"
                    alt="SHRIYASH SAHU"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground uppercase">IDENTITY SPEC</span>
                  <span className="font-semibold text-foreground">SHRIYASH SAHU</span>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">SIGNATURE</span>
                  <Signature width={140} height={42} />
                </div>
                <div className="pt-2">
                  <a
                    href={siteConfig.resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-foreground text-background font-mono text-xs uppercase tracking-wider font-semibold border border-foreground hover:bg-background hover:text-foreground transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download Curriculum Vitae (PDF)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Narrative Dossier */}
            <div className="lg:col-span-7 space-y-12">
              {/* Introduction */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  01 // INTRODUCTION
                </h3>
                <h4 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground leading-snug">
                  Engineering software with architectural precision, clean codebases, and student-focused utility.
                </h4>
                <div className="space-y-4 text-muted-foreground text-base leading-relaxed pt-2">
                  <p>
                    I am an undergraduate student at <strong className="text-foreground font-medium">Vellore Institute of Technology (VIT Bhopal)</strong> pursuing a Bachelor of Technology in Computer Science & Engineering.
                  </p>
                  <p>
                    My technical curiosity centers on building full-stack web applications, AI-enabled educational technology, and scalable backend services. I appreciate clean typography, minimal design systems, and software architectures that prioritize reliability and simplicity over superficial complexity.
                  </p>
                </div>
              </div>

              {/* Education Section */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>02 // ACADEMIC INSTITUTION & DEGREE</span>
                </h3>

                <div className="p-6 border border-border bg-card space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h5 className="text-lg font-medium text-foreground">
                      Vellore Institute of Technology (VIT Bhopal)
                    </h5>
                    <span className="font-mono text-xs text-muted-foreground">
                      2024 — Present
                    </span>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-foreground">
                    B.Tech in Computer Science and Engineering
                  </p>
                  <div className="pt-2 border-t border-border/80">
                    <span className="font-mono text-xs text-muted-foreground block mb-1">
                      CORE COURSEWORK:
                    </span>
                    <p className="text-sm text-foreground font-mono">
                      Data Structures & Algorithms, Database Management Systems (DBMS), Operating Systems, Computer Networks, Software Engineering, System Design, Artificial Intelligence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Interests */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>03 // TECHNICAL INTERESTS & RESEARCH</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-border bg-card space-y-1">
                    <span className="font-mono text-xs font-semibold text-foreground uppercase">
                      Full-Stack Architecture
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Next.js 15 App Router, React Server Components, TypeScript type-safety, and Tailwind CSS design systems.
                    </p>
                  </div>

                  <div className="p-4 border border-border bg-card space-y-1">
                    <span className="font-mono text-xs font-semibold text-foreground uppercase">
                      EdTech & AI Automation
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Lecture synthesis, automated learning recovery workflows with n8n, NLP extraction, and personalized student tracks.
                    </p>
                  </div>

                  <div className="p-4 border border-border bg-card space-y-1">
                    <span className="font-mono text-xs font-semibold text-foreground uppercase">
                      Backend & Storage Systems
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      FastAPI microservices, Supabase Row-Level Security, PostgreSQL modeling, Redis caching, and Docker containerization.
                    </p>
                  </div>

                  <div className="p-4 border border-border bg-card space-y-1">
                    <span className="font-mono text-xs font-semibold text-foreground uppercase">
                      Distributed Systems
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Event-driven streaming with Apache Kafka, cache-aside patterns, database replication, and system reliability trade-offs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Achievements */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>04 // VERIFIED COMPETITIVE ACHIEVEMENTS</span>
                </h3>

                <div className="border border-border divide-y divide-border bg-card">
                  {leadershipItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-xs text-muted-foreground block mb-0.5">
                          {item.organization} · {item.date}
                        </span>
                        <h5 className="text-sm font-semibold text-foreground">
                          {item.title}
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1 max-w-lg">
                          {item.description}
                        </p>
                      </div>
                      <span className="font-mono text-xs uppercase px-2 py-0.5 border border-border text-foreground shrink-0 self-start sm:self-auto">
                        {item.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Focus */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>05 // CURRENT FOCUS</span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Currently expanding my knowledge of distributed database internals, writing technical case studies for the Distributed Systems Playbook, and advancing production capabilities for ScriptLyra. Active problem solver on LeetCode and Codeforces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
