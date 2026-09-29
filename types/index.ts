export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: "Full-Stack Web" | "AI & EdTech" | "Systems & Architecture" | "Automation";
  year: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  contribution: string[];
  technologies: string[];
  image: string;
  bannerImage?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  architectureNotes?: string[];
  metrics?: { label: string; value: string }[];
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  tags: string[];
}

export interface LeadershipItem {
  id: string;
  number: string;
  title: string;
  organization: string;
  date: string;
  role: string;
  description: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  key: "languages" | "web" | "data_ai" | "cloud" | "tools" | "practices";
  description: string;
  skills: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  content: {
    sectionTitle?: string;
    paragraphs: string[];
    codeBlock?: {
      language: string;
      code: string;
    };
  }[];
}

export interface ServiceItem {
  number: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  capabilities: string[];
  techStack: string[];
}

export interface SiteConfig {
  name: string;
  fullName: string;
  title: string;
  roleDescription: string;
  university: string;
  degree: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumePdf: string;
  resumePng: string;
  metaDescription: string;
  siteUrl: string;
}
