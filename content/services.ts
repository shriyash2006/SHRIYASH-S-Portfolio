import { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    number: "01",
    title: "Web Development",
    shortDesc: "End-to-end full-stack web applications with modern typography and resilient architecture.",
    longDesc:
      "Crafting performant web experiences using Next.js App Router, React, TypeScript, and Tailwind CSS. Emphasizing semantic markup, accessibility, server components, and responsive, fluid design systems that balance aesthetic restraint with technical rigor.",
    capabilities: [
      "Next.js App Router architecture & Server Components",
      "TypeScript type-safety from database to client",
      "Tailwind CSS design systems & micro-interactions",
      "RESTful API design and third-party integrations",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    number: "02",
    title: "Data & AI",
    shortDesc: "Intelligent pipelines, NLP document summarization, and pragmatic ML modeling.",
    longDesc:
      "Building practical AI solutions that automate complex workflows. From integrating LLM prompt engineering and vector retrieval (RAG) to building document extraction microservices in Python, focusing on deterministic outputs and real-world utility.",
    capabilities: [
      "Natural language extraction & automated summarization",
      "LLM application design & structured output validation",
      "Computer vision & semantic segmentation experimentation",
      "n8n and webhook-based intelligent workflow automation",
    ],
    techStack: ["Python", "FastAPI", "NLP", "Vertex AI", "n8n"],
  },
  {
    number: "03",
    title: "Cloud & Infrastructure",
    shortDesc: "Scalable data stores, containerization, and modern edge deployments.",
    longDesc:
      "Designing robust backend foundations that remain reliable under load. Configuring relational PostgreSQL tables with Row-Level Security, Redis caching layers, Docker containerization, and cloud services across AWS and Google Cloud Platform.",
    capabilities: [
      "PostgreSQL schema modeling & Supabase RLS security",
      "In-memory Redis caching for query optimization",
      "Docker containerization for portable microservices",
      "Edge caching, CI/CD, and Vercel cloud deployments",
    ],
    techStack: ["PostgreSQL", "Supabase", "Redis", "Docker", "AWS", "GCP"],
  },
  {
    number: "04",
    title: "Technical Projects",
    shortDesc: "Hackathon execution, rapid software prototyping, and student developer leadership.",
    longDesc:
      "Taking zero-to-one concepts from technical problem formulation to functional prototypes under compressed timelines. Experienced in leading hackathon operations, coordinating multi-disciplinary teams, and championing developer communities.",
    capabilities: [
      "Hackathon prototyping & competitive technical execution",
      "System design trade-off evaluations & architecture playbooks",
      "Developer workshop instruction & AI literacy leadership",
      "Collaborative open-source contributions & Git workflows",
    ],
    techStack: ["System Design", "Agile Sprints", "Git / GitHub", "Team Leadership"],
  },
];
