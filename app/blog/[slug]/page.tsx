import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Share2, Terminal } from "lucide-react";
import { blogPosts, getBlogPostBySlug } from "@/content/blog";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer/footer";
import { formatDate } from "@/lib/utils";
import { constructMetadata } from "@/lib/metadata";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return constructMetadata({ title: "Article Not Found" });
  }

  return constructMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          {/* Back Navigation Bar */}
          <div className="mb-10 pb-4 border-b border-border flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </Link>
            <span className="font-mono text-xs text-muted-foreground">
              /{post.category.toUpperCase()}/
            </span>
          </div>

          {/* Article Header */}
          <header className="max-w-3xl mb-14 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tightest text-foreground leading-[1.12]">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-2">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Body */}
          <div className="max-w-3xl border-t border-border pt-12 space-y-12">
            {post.content.map((section, idx) => (
              <section key={idx} className="space-y-4">
                {section.sectionTitle && (
                  <h2 className="text-2xl font-medium tracking-tight text-foreground pt-4">
                    {section.sectionTitle}
                  </h2>
                )}
                {section.paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal"
                  >
                    {para}
                  </p>
                ))}

                {section.codeBlock && (
                  <div className="my-6 border border-border bg-card overflow-hidden">
                    <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground uppercase">
                      <span>{section.codeBlock.language}</span>
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-foreground bg-brand-950/20">
                      <code>{section.codeBlock.code}</code>
                    </pre>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Related Articles Footer */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-16 border-t border-border max-w-3xl space-y-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                CONTINUE READING
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="p-6 border border-border bg-card hover:border-foreground transition-colors group flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-1">
                        {related.category}
                      </span>
                      <h4 className="text-base font-medium text-foreground group-hover:underline">
                        {related.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground inline-flex items-center gap-1 group-hover:text-foreground">
                      <span>Read Note</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </>
  );
}
