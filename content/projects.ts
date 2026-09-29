import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "scriptlyra",
    number: "01",
    title: "ScriptLyra",
    subtitle: "Modern Content Publishing & Long-Form Reading Platform",
    category: "Full-Stack Web",
    year: "2026",
    description:
      "A Medium-inspired content publishing platform designed for publishing, reading, and discovering technical articles and long-form publications with rich typography and low-latency delivery.",
    overview:
      "ScriptLyra was built to bridge the gap between technical writing and frictionless publishing. Engineered with Next.js App Router, React, TypeScript, and Supabase, it provides an authoring experience with instant draft synchronization, markdown support, and fine-grained access control.",
    problem:
      "Modern technical blogging platforms either suffer from bloat, distracting advertisements, and invasive trackers, or lack proper authentication and robust database querying for independent publication authors.",
    solution:
      "Implemented a clean, minimalist reading interface paired with Supabase authentication and Row-Level Security (RLS) policies on PostgreSQL. REST APIs handle draft state caching, article versioning, and community discovery with near-zero latency.",
    contribution: [
      "Engineered full-stack architecture using Next.js 15, TypeScript, and Tailwind CSS.",
      "Designed and deployed PostgreSQL schemas with Supabase Row-Level Security (RLS) guaranteeing strict multi-tenant data isolation.",
      "Built clean reading and authoring interfaces focused on typography, responsive readability, and fast page loads.",
      "Integrated secure authentication flows, session handling, and draft auto-saving via REST endpoints.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "REST APIs",
    ],
    image: "/projects/scriptlyra-banner.png",
    bannerImage: "/projects/scriptlyra-banner.png",
    liveUrl: "https://scriptlyra.vercel.app/",
    githubUrl: "https://github.com/shriyash2006/ScriptLyra",
    featured: true,
    architectureNotes: [
      "Next.js App Router with Server-Side Rendering for static article pages",
      "PostgreSQL on Supabase with Row-Level Security (RLS) for data governance",
      "Optimistic UI updates for article drafting and bookmarking",
      "Vercel Edge caching for sub-100ms global article delivery",
    ],
    metrics: [
      { label: "Deployment", value: "Vercel Production" },
      { label: "Auth & DB", value: "Supabase RLS" },
      { label: "Architecture", value: "Server Components" },
    ],
  },
  {
    slug: "ai-buddy",
    number: "02",
    title: "AI-BUDDY / Campus TaaS",
    subtitle: "Full-Stack AI EdTech Platform & Talent Matching Ecosystem",
    category: "AI & EdTech",
    year: "2025 – 2026",
    description:
      "An end-to-end AI platform connecting students, startups, and mentors with intelligent skill verification, automated matching pipelines, and structured learning tracks.",
    overview:
      "Built as a comprehensive Talent-as-a-Service (TaaS) ecosystem for university campuses. The platform combines Next.js 15, FastAPI, PostgreSQL, Redis, and Docker to evaluate student capabilities, recommend tailored mentorship roadmaps, and match candidates to emerging startup opportunities.",
    problem:
      "University students frequently struggle to discover relevant mentorship and venture opportunities tailored to their evolving skillset, while early-stage startups spend excessive time vetting junior talent.",
    solution:
      "Engineered an automated matching and learning platform utilizing asynchronous FastAPI microservices, Redis caching for active session states, and PostgreSQL for relational profile analytics.",
    contribution: [
      "Architected end-to-end web application combining Next.js 15, TypeScript, Tailwind CSS, FastAPI, and Docker.",
      "Designed high-performance REST APIs in FastAPI with Redis caching to support real-time workflows and low-latency search.",
      "Developed a reusable React component library adhering to strict design guidelines for responsive dashboards.",
      "Constructed AI-driven talent matching algorithms evaluating student project history and technical coursework.",
    ],
    technologies: [
      "Next.js 15",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Tailwind CSS",
      "REST APIs",
    ],
    image: "/profile/shriyash-sahu.png",
    githubUrl: "https://github.com/shriyash2006/AI-BUDDY",
    featured: true,
    architectureNotes: [
      "FastAPI asynchronous backend containerized with Docker",
      "Redis in-memory caching for query acceleration and rate-limiting",
      "PostgreSQL schema modeling student skill trees and mentor availability",
      "Next.js 15 frontend with client-side optimistic interaction handling",
    ],
    metrics: [
      { label: "Backend", value: "FastAPI + Docker" },
      { label: "Caching", value: "Redis Tier" },
      { label: "Frontend", value: "Next.js 15" },
    ],
  },
  {
    slug: "missed-class-recovery",
    number: "03",
    title: "Missed Class Recovery Engine",
    subtitle: "AI-Powered EdTech Automation & Lecture Synthesis System",
    category: "Automation",
    year: "2025 – 2026",
    description:
      "Automated educational recovery pipeline that identifies absent lecture sessions, extracts curriculum audio/transcripts, synthesizes key concepts with NLP, and distributes personalized summaries.",
    overview:
      "An intelligent automation pipeline engineered to solve academic continuity challenges. When student absence is recorded, the engine ingests lecture slides, transcriptions, and curriculum nodes, running them through NLP summarization routines before delivering structured recaps directly to students.",
    problem:
      "When students miss classes due to health, hackathons, or family events, catching up requires piecing together fragmented classmate notes, often resulting in missed conceptual fundamentals.",
    solution:
      "Created an automated pipeline integrating n8n workflow orchestrations with Node.js and Python microservices, leveraging MongoDB for unstructured transcript storage and PostgreSQL for relational curriculum indexing.",
    contribution: [
      "Orchestrated event-driven workflows in n8n connecting student attendance logs to content extraction pipelines.",
      "Implemented Python-based NLP summarization microservices to generate concise bullet-point lecture recaps and actionable study notes.",
      "Engineered dual-database architecture: PostgreSQL for student records and MongoDB for raw syllabus documents.",
      "Integrated automated transactional email delivery keeping students informed within hours of class completion.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "n8n Automation",
      "NLP Summarization",
      "Email Automation",
    ],
    image: "/profile/shriyash-sahu.png",
    githubUrl: "https://github.com/shriyash2006/Missed-Class-Recovery-Engine",
    featured: true,
    architectureNotes: [
      "n8n webhook triggers triggered on attendance status changes",
      "Python NLP workers executing text summarization and keyword extraction",
      "MongoDB document store for unstructured lecture transcripts and slides",
      "PostgreSQL relational engine for attendance logs and student rosters",
    ],
    metrics: [
      { label: "Orchestration", value: "n8n Pipelines" },
      { label: "Intelligence", value: "Python NLP" },
      { label: "Storage", value: "Postgres + Mongo" },
    ],
  },
  {
    slug: "distributed-systems",
    number: "04",
    title: "Distributed Systems Architecture Playbook",
    subtitle: "Scalable Backend Design Reference & High-Throughput Patterns",
    category: "Systems & Architecture",
    year: "2025 – 2026",
    description:
      "An in-depth engineering reference covering scalable distributed architectures, event streaming with Kafka, caching hierarchies, and SQL vs NoSQL trade-offs.",
    overview:
      "A systematic collection of architectural blueprints, trade-off analyses, and benchmarked prototypes exploring distributed consistency, data replication, partitioned caching, and fault-tolerant system design.",
    problem:
      "Developing high-throughput, low-latency web services requires navigating complex trade-offs between consistency, availability, partition tolerance, and database access patterns.",
    solution:
      "Designed and documented comprehensive architecture models comparing synchronous REST vs asynchronous message queues, partitioned database indexing, and multi-level caching strategies.",
    contribution: [
      "Authored in-depth technical blueprints analyzing distributed patterns (CQRS, Event Sourcing, Circuit Breakers).",
      "Benchmarked Redis caching layers against direct PostgreSQL queries under simulated traffic spikes.",
      "Engineered sample pipeline architectures utilizing Apache Kafka for event-driven message dispatching.",
      "Documented trade-offs between ACID relational databases and partitioned distributed NoSQL stores.",
    ],
    technologies: [
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Apache Kafka",
      "Elasticsearch",
      "WebSockets",
      "Cassandra",
      "DynamoDB",
    ],
    image: "/projects/distributed-systems-architecture.png",
    bannerImage: "/projects/distributed-systems-architecture.png",
    githubUrl: "https://github.com/shriyash2006/System-Design",
    featured: true,
    architectureNotes: [
      "High-throughput event streaming paradigms with Apache Kafka",
      "Multi-tier cache invalidation strategies using Redis",
      "Horizontally partitioned data stores with Cassandra and DynamoDB",
      "Full-text search indexing topologies using Elasticsearch",
    ],
    metrics: [
      { label: "Domains", value: "Distributed Systems" },
      { label: "Streaming", value: "Kafka & Redis" },
      { label: "Databases", value: "SQL & NoSQL" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(currentSlug: string): Project {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const nextIndex = (currentIndex + 1) % projects.length;
  return projects[nextIndex];
}
