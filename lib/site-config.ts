import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "SHRIYASH SAHU",
  fullName: "SHRIYASH SAHU",
  title: "SHRIYASH SAHU — Developer & Computer Science Student",
  roleDescription:
    "Computer Science student and developer building thoughtful digital products, software and technical experiences.",
  university: "VIT (Vellore Institute of Technology, Bhopal)",
  degree: "B.Tech Computer Science & Engineering",
  location: "India",
  email: "shriyashsahu2006@gmail.com",
  phone: "+91-7974749890",
  github: "https://github.com/shriyash2006",
  linkedin: "https://www.linkedin.com/in/shriyash-sahu/",
  resumePdf: "/resume/shriyash-sahu-resume.pdf",
  resumePng: "/resume/shriyash-sahu-resume.png",
  metaDescription:
    "Personal portfolio of SHRIYASH SAHU — Computer Science student and developer at VIT. Specialized in full-stack web applications, AI systems, backend architecture, and technical leadership.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://shriyashsahu.com",
};

export const navigationLinks = [
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Skills", href: "/#skills" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const socialLinks = [
  {
    name: "GitHub",
    url: siteConfig.github,
    label: "github.com/shriyash2006",
  },
  {
    name: "LinkedIn",
    url: siteConfig.linkedin,
    label: "linkedin.com/in/shriyash-sahu",
  },
  {
    name: "Email",
    url: `mailto:${siteConfig.email}`,
    label: siteConfig.email,
  },
  {
    name: "Resume",
    url: siteConfig.resumePdf,
    label: "Download PDF",
  },
];
