"use client";

import * as React from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [activeRow, setActiveRow] = React.useState<string | null>("01");

  return (
    <section id="services" className="py-20 md:py-28 border-b border-border">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="03"
          label="SERVICES"
          title="What I Work On"
          subtitle="Specialized engineering competencies bridging full-stack software, data systems, and technical execution."
        />

        {/* Interactive Rows */}
        <div className="border-t border-border divide-y divide-border">
          {services.map((item) => {
            const isOpen = activeRow === item.number;

            return (
              <div
                key={item.number}
                onMouseEnter={() => setActiveRow(item.number)}
                onClick={() =>
                  setActiveRow((prev) => (prev === item.number ? null : item.number))
                }
                className={cn(
                  "cursor-pointer transition-colors duration-200 group py-8 px-2 sm:px-6",
                  isOpen
                    ? "bg-foreground/[0.02]"
                    : "hover:bg-foreground/[0.01]"
                )}
              >
                <div className="flex items-start sm:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="font-mono text-sm sm:text-base text-muted-foreground font-semibold">
                      /{item.number}/
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-foreground transition-transform duration-200 group-hover:translate-x-1">
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden md:inline-block font-mono text-xs text-muted-foreground max-w-sm text-right truncate">
                      {item.shortDesc}
                    </span>
                    <button
                      type="button"
                      aria-label={`Toggle details for ${item.title}`}
                      className="p-2 border border-border group-hover:border-foreground transition-colors"
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-foreground" />
                      ) : (
                        <Plus className="w-4 h-4 text-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Content Area */}
                {isOpen && (
                  <div className="mt-8 pt-6 border-t border-border/60 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
                    <div className="lg:col-span-6 space-y-4">
                      <p className="text-base text-foreground font-normal leading-relaxed">
                        {item.longDesc}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.techStack.map((tech) => (
                          <Badge key={tech} variant="default">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-6 border-l lg:border-border lg:pl-8 space-y-3">
                      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
                        DELIVERABLES & CAPABILITIES
                      </span>
                      <ul className="space-y-2 text-sm text-muted-foreground font-mono">
                        {item.capabilities.map((cap, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-foreground inline-block" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
