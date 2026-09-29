import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    key: "languages",
    title: "LANGUAGES",
    description: "Core computational and programming languages for system development and algorithm design.",
    skills: ["Python", "C++", "Java", "TypeScript", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    key: "web",
    title: "WEB & FRONTEND",
    description: "Modern component-driven web frameworks, styling engines, and application state management.",
    skills: ["React.js", "Next.js (App Router)", "Tailwind CSS", "Node.js", "FastAPI", "Django", "REST APIs"],
  },
  {
    key: "data_ai",
    title: "DATA & AI",
    description: "Machine learning modeling, NLP pipelines, vector retrieval, and automated intelligence flows.",
    skills: [
      "Machine Learning",
      "Natural Language Processing (NLP)",
      "LLM Applications",
      "RAG Pipelines",
      "AI Automation",
      "Prompt Engineering",
      "Data Science",
    ],
  },
  {
    key: "cloud",
    title: "CLOUD & DATABASES",
    description: "Relational, document, and cache storage paired with scalable cloud infrastructure.",
    skills: [
      "PostgreSQL",
      "Supabase",
      "Redis",
      "MongoDB",
      "MySQL",
      "AWS",
      "Google Cloud Platform",
      "Vertex AI",
    ],
  },
  {
    key: "tools",
    title: "TOOLS & DEVOPS",
    description: "Tooling for containerization, workflow orchestration, version control, and API testing.",
    skills: ["Git", "GitHub", "Docker", "n8n Automation", "Postman", "Jupyter", "Vercel", "Linux / Shell"],
  },
  {
    key: "practices",
    title: "ENGINEERING PRACTICES",
    description: "Architectural disciplines and software principles guiding clean, maintainable engineering.",
    skills: [
      "System Design",
      "Agile Development",
      "Test & Debugging",
      "Version Control",
      "API Documentation",
      "Microservices",
    ],
  },
];
