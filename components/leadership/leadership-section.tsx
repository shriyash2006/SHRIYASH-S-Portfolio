import { SectionHeading } from "@/components/ui/section-heading";
import { leadershipItems } from "@/content/leadership";

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-20 md:py-28 border-b border-border bg-foreground/[0.01]">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="05"
          label="LEADERSHIP & ACTIVITIES"
          title="Events, Hackathons & Community"
          subtitle="Directing large-scale hackathons, building developer communities, and competitive technical problem solving."
        />

        {/* Large Editorial Numbered List */}
        <div className="border-t border-border divide-y divide-border">
          {leadershipItems.map((item) => (
            <div
              key={item.id}
              className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline group hover:bg-foreground/[0.015] transition-colors px-2 sm:px-4"
            >
              {/* Number */}
              <div className="lg:col-span-2">
                <span className="font-mono text-3xl sm:text-4xl text-muted-foreground group-hover:text-foreground transition-colors font-light">
                  {item.number}
                </span>
                <span className="block font-mono text-xs text-muted-foreground mt-1">
                  {item.date}
                </span>
              </div>

              {/* Title & Organization */}
              <div className="lg:col-span-4 space-y-1">
                <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {item.organization}
                </p>
                <span className="inline-block text-[11px] font-mono text-foreground font-semibold">
                  {item.role}
                </span>
              </div>

              {/* Description & Key Highlights */}
              <div className="lg:col-span-6 space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <div className="space-y-1.5 pt-1">
                  {item.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="text-xs font-mono text-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-foreground shrink-0" />
                      <span>{highlight}</span>
                    </div>
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
