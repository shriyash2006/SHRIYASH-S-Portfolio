import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Signature } from "@/components/ui/signature";
import { siteConfig } from "@/lib/site-config";

export function AboutPreview() {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-border">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="01"
          label="ABOUT ME"
          title="Building, learning and creating."
          subtitle="A computer science student dedicated to engineering reliable software and student-centric learning systems."
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
          >
            <span>View About</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          {/* Left Column: Bold statement & Focus points */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground leading-snug">
                I believe that good software combines rigorous backend design with intentional, restrained user experiences.
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Currently pursuing my B.Tech in Computer Science and Engineering at Vellore Institute of Technology (VIT Bhopal). My focus spans full-stack web applications, AI-driven educational technology, and backend system reliability.
              </p>
            </div>

            {/* Quick architectural spec sheet */}
            <div className="border border-border p-6 bg-card space-y-4">
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground pb-2 border-b border-border">
                ACADEMIC & TECHNICAL FOUNDATION
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground block font-mono">INSTITUTION</span>
                  <span className="font-semibold text-foreground">{siteConfig.university}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-mono">DEGREE</span>
                  <span className="font-semibold text-foreground">{siteConfig.degree}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-mono">CORE COURSEWORK</span>
                  <span className="text-foreground">DSA, DBMS, OS, Networks, System Design, AI</span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-mono">CURRENT FOCUS</span>
                  <span className="text-foreground">Next.js 15, FastAPI, RAG Pipelines, Scalable Microservices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Narrative, Leadership, and Signature */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-5 text-muted-foreground text-sm sm:text-base leading-relaxed">
              <p>
                My work as a developer is grounded in building products that solve tangible problems. With <strong className="text-foreground font-medium">ScriptLyra</strong>, I explored modern reading ergonomics, Supabase Row-Level Security, and minimalist publishing aesthetics.
              </p>
              <p>
                In EdTech, I engineered the <strong className="text-foreground font-medium">Missed Class Recovery Engine</strong>, creating automated NLP pipelines with n8n to ensure academic continuity for absent students. Additionally, through <strong className="text-foreground font-medium">AI-BUDDY / Campus TaaS</strong>, I designed matching architectures bridging students with early-stage venture mentorship.
              </p>
              <p>
                Beyond code, I actively organize and lead technical initiatives. As Operations Manager at the <strong className="text-foreground font-medium">Data Science Club, VIT Bhopal</strong>, I spearheaded the execution of <strong className="text-foreground font-medium">ORIGIN&apos;26</strong>, coordinating over 650 hackathon participants, 20 organizers, and 60 volunteers.
              </p>
            </div>

            {/* Authentic Signature */}
            <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  VERIFIED IDENTITY
                </span>
                <span className="text-sm font-semibold tracking-wide text-foreground">
                  {siteConfig.name}
                </span>
              </div>
              <Signature width={180} height={60} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
