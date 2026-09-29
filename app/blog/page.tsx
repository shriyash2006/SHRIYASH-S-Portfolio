import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer/footer";
import { blogPosts } from "@/content/blog";
import { formatDate } from "@/lib/utils";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Blog & Technical Notes",
  description:
    "Technical articles, distributed systems analyses, and AI workflow engineering by SHRIYASH SAHU.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <div className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          <SectionHeading
            number="07"
            label="TECHNICAL WRITING & ARCHIVE"
            title="Engineering Notes"
            subtitle="Deep-dives into software architectures, database design patterns, and automated AI systems."
          />

          {/* Articles List */}
          <div className="border-t border-border divide-y divide-border">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline group hover:bg-foreground/[0.015] transition-colors px-2 sm:px-4"
              >
                {/* Meta */}
                <div className="lg:col-span-3 flex flex-col gap-1 text-xs font-mono text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    /{post.category}/
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="lg:col-span-7 space-y-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block group-hover:underline underline-offset-4 decoration-1"
                  >
                    <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="subtle">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="lg:col-span-2 flex justify-start lg:justify-end">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-foreground hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
