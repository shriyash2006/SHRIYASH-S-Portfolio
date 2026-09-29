import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { blogPosts } from "@/content/blog";
import { formatDate } from "@/lib/utils";

export function BlogPreview() {
  return (
    <section id="blog" className="py-20 md:py-28 border-b border-border">
      <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <SectionHeading
          number="07"
          label="BLOG"
          title="Technical Writings"
          subtitle="Reflections, architectural case studies, and engineering notes on modern software systems."
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold border-b border-foreground pb-1 hover:opacity-70 transition-opacity"
          >
            <span>View All Articles</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </SectionHeading>

        {/* Editorial Articles List */}
        <div className="border-t border-border divide-y divide-border">
          {blogPosts.map((post, idx) => (
            <article
              key={post.slug}
              className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline group hover:bg-foreground/[0.015] transition-colors px-2 sm:px-4"
            >
              {/* Meta */}
              <div className="lg:col-span-3 flex flex-col gap-1 text-xs font-mono text-muted-foreground">
                <span className="font-semibold text-foreground">
                  /{post.category}/
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="lg:col-span-7 space-y-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group-hover:underline underline-offset-4 decoration-1"
                >
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-foreground">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
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
                  <span>Read Post</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
