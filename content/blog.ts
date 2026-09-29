import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    slug: "architecting-ai-powered-learning-recovery-engine",
    title: "Architecting an AI-Powered Learning Recovery Engine with n8n and NLP",
    description:
      "A deep dive into building an automated academic continuity pipeline: combining attendance triggers, lecture transcription extraction, and bullet-point NLP synthesis.",
    date: "2026-02-14",
    readingTime: "6 min read",
    category: "EdTech & AI",
    tags: ["NLP", "Automation", "n8n", "PostgreSQL", "Python"],
    content: [
      {
        sectionTitle: "The Academic Continuity Gap",
        paragraphs: [
          "When students miss key lecture sessions due to competitive hackathons, collegiate events, or medical emergencies, they confront an uphill battle: reconciling fragmented peer notes, lost context, and disjointed presentation decks.",
          "To solve this, I designed the Missed Class Recovery Engine (MCRE). The objective was straightforward: automatically recognize an absent student, parse lecture transcripts and slides, synthesize key conceptual takeaways, and deliver a personalized briefing within hours of the session concluding.",
        ],
      },
      {
        sectionTitle: "Pipeline Orchestration with n8n and Microservices",
        paragraphs: [
          "Instead of a monolithic scheduled batch job, MCRE relies on event-driven webhooks. When the attendance logging layer updates an absence record in PostgreSQL, an n8n webhook triggers an extraction pipeline.",
          "The audio and presentation slides are passed to a Python NLP worker. Using contextual text chunking and abstractive summarization models, the pipeline extracts core mathematical definitions, code snippets, and follow-up homework requirements.",
        ],
        codeBlock: {
          language: "python",
          code: `# Simplified snippet of the lecture synthesis orchestrator
async def process_lecture_summary(lecture_id: str, student_email: str):
    transcript = await fetch_lecture_transcript(lecture_id)
    key_points = nlp_pipeline.extract_key_concepts(transcript.text, max_tokens=600)
    
    email_payload = {
        "recipient": student_email,
        "subject": f"Lecture Catch-up: {transcript.course_code} - {transcript.topic}",
        "summary": key_points,
        "action_items": transcript.assignments
    }
    return await dispatcher.send_recovery_brief(email_payload)`,
        },
      },
      {
        sectionTitle: "Dual-Database Strategy: PostgreSQL + MongoDB",
        paragraphs: [
          "Curriculum tracking, student enrollment, and attendance records demand strict relational integrity and transactional guarantees, making PostgreSQL the natural foundation.",
          "Conversely, lecture transcripts, slide JSONs, and model embeddings are unstructured and highly variable in size. Housing these in MongoDB preserved database speed while allowing arbitrary slide formats and raw text blocks without schema migration overhead.",
        ],
      },
      {
        sectionTitle: "Key Takeaways",
        paragraphs: [
          "Automating workflows is most effective when combining existing orchestration tooling (like n8n) with specialized microservices rather than writing bespoke cron wrappers.",
          "Keeping NLP prompts constrained to bullet points and actionable items yields significantly higher student comprehension than generating long discursive summaries.",
        ],
      },
    ],
  },
  {
    slug: "building-scriptlyra-rls-supabase-nextjs",
    title: "Building ScriptLyra: Row-Level Security and Content UX with Supabase & Next.js",
    description:
      "Engineering a Medium-inspired content publishing platform. How Row-Level Security in PostgreSQL simplifies multi-tenant authorization without application-tier leaks.",
    date: "2026-01-28",
    readingTime: "5 min read",
    category: "Full-Stack Web",
    tags: ["Next.js", "Supabase", "PostgreSQL", "RLS", "TypeScript"],
    content: [
      {
        sectionTitle: "The Philosophy Behind ScriptLyra",
        paragraphs: [
          "The modern web is inundated with cluttered reading experiences — modal popups, ad banners, and invasive trackers. With ScriptLyra, my goal was to build a sanctuary for long-form technical prose and thoughtful articles.",
          "The platform pairs a distraction-free editorial interface with a rock-solid security boundary built directly at the database layer.",
        ],
      },
      {
        sectionTitle: "Leveraging PostgreSQL Row-Level Security (RLS)",
        paragraphs: [
          "In conventional web applications, authorization logic is often scattered across API route handlers and middleware. A single missed check can lead to unauthorized data disclosure or article tampering.",
          "With Supabase, we define security declarative policies directly inside PostgreSQL. Even if a client performs a direct REST query, the database itself enforces tenant boundaries.",
        ],
        codeBlock: {
          language: "sql",
          code: `-- Declarative RLS for article mutations in ScriptLyra
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Public articles are viewable by everyone" 
ON articles FOR SELECT 
USING (status = 'published');

-- Authors can view all their own drafts
CREATE POLICY "Authors can view own drafts" 
ON articles FOR SELECT 
USING (auth.uid() = author_id);

-- Authors can modify only their own articles
CREATE POLICY "Authors can update own articles" 
ON articles FOR UPDATE 
USING (auth.uid() = author_id);`,
        },
      },
      {
        sectionTitle: "Next.js 15 Server Components & Typography",
        paragraphs: [
          "By rendering public articles through React Server Components, the initial HTML payload contains zero client-side JavaScript for the article text itself. This ensures near-instant First Contentful Paint (FCP) and optimal SEO indexing.",
          "The typography scale was fine-tuned for high legibility: generous line-height (1.75), crisp monochrome contrast, and responsive fluid type clamps.",
        ],
      },
    ],
  },
  {
    slug: "distributed-systems-caching-streaming-tradeoffs",
    title: "Distributed Systems: Event-Driven Streaming and Redis Cache Tiering Trade-offs",
    description:
      "Analyzing architectural trade-offs between synchronous REST vs asynchronous message queues, write-through vs cache-aside strategies, and database partitioning.",
    date: "2025-11-20",
    readingTime: "8 min read",
    category: "Systems & Architecture",
    tags: ["Distributed Systems", "Redis", "Kafka", "PostgreSQL", "System Design"],
    content: [
      {
        sectionTitle: "Beyond Simple Monolithic CRUD",
        paragraphs: [
          "As web applications scale from handling thousands of queries to millions of concurrent requests, direct database reads become an unsustainable bottleneck.",
          "In my Distributed Systems Architecture Playbook, I benchmarked the performance characteristics of multi-tier caching versus event-driven streaming patterns under volatile traffic patterns.",
        ],
      },
      {
        sectionTitle: "Cache Invalidation & Thundering Herd Protection",
        paragraphs: [
          "Cache-aside is simple to implement, but vulnerable to cache stampedes (thundering herd) when a high-traffic key expires simultaneously across hundreds of concurrent workers.",
          "Employing probabilistic early expiration or distributed mutex locks (e.g. Redlock or atomic Redis SETNX) guarantees that only a single worker queries the backing PostgreSQL instance while others await the freshly populated cache.",
        ],
        codeBlock: {
          language: "typescript",
          code: `// Resilient cache fetch pattern with single-flight mutex
async function getOrSetCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  // Acquire brief lock to prevent cache stampede
  const lockKey = \`lock:\${key}\`;
  const acquired = await redis.set(lockKey, "1", "EX", 5, "NX");
  
  if (!acquired) {
    await sleep(50);
    return getOrSetCached(key, fetcher, ttlSeconds);
  }

  try {
    const data = await fetcher();
    await redis.set(key, JSON.stringify(data), "EX", ttlSeconds);
    return data;
  } finally {
    await redis.del(lockKey);
  }
}`,
        },
      },
      {
        sectionTitle: "When to Introduce Apache Kafka",
        paragraphs: [
          "Message brokers like RabbitMQ excel at complex point-to-point routing, but when total event ordering, persistent replayability, and consumer group partitioning are mandatory, Apache Kafka becomes the definitive backbone.",
          "Decoupling analytical ingestion from user-facing request paths prevents slow database writes from cascading into frontend latency spikes.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
