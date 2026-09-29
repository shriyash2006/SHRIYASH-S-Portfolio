import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "dsc-vit",
    organization: "Data Science Club, VIT Bhopal",
    role: "Operations Manager / Panel Member",
    location: "VIT Bhopal, India",
    startDate: "Jul 2025",
    endDate: "Present",
    current: true,
    description:
      "Core operational leader driving flagship technical initiatives, large-scale hackathons, and technical workshops across the university community.",
    achievements: [
      "Led end-to-end execution for ORIGIN'26 — a flagship overnight hackathon with 650+ participants, 20+ core organizers, and 60+ student volunteers.",
      "Coordinated cross-functional workflows across technical problem statement curation, content, visual design, and event logistics.",
      "Mentored junior developers on git workflows, project ideation, and technical submission guidelines.",
    ],
    tags: [
      "Operations Management",
      "Hackathon Leadership",
      "Event Architecture",
      "ORIGIN'26",
      "Team Coordination",
    ],
  },
  {
    id: "gdg-ambassador",
    organization: "Google Student Developer Community",
    role: "Google Student Developer Ambassador",
    location: "VIT Bhopal, India",
    startDate: "Oct 2025",
    endDate: "Jul 2026",
    current: false,
    description:
      "Fostered peer-to-peer technical learning, practical workshops, and adoption of modern Google developer tooling and cloud platforms.",
    achievements: [
      "Drove AI literacy and Google Cloud / Vertex AI technology adoption across the student body through hands-on technical workshops.",
      "Facilitated developer sessions demystifying modern web development, prompt engineering, and cloud infrastructure.",
      "Synthesized participant feedback to continuously iterate and improve workshop curricula and learning outcomes.",
    ],
    tags: [
      "Community Leadership",
      "AI Literacy",
      "Google Technologies",
      "Developer Workshops",
      "Cloud Advocacy",
    ],
  },
  {
    id: "gssoc",
    organization: "GirlScript Summer of Code (GSSoC)",
    role: "Open Source Contributor",
    location: "Remote / Open Source",
    startDate: "May 2025",
    endDate: "Aug 2025",
    current: false,
    description:
      "Active contributor to collaborative open-source repositories, implementing features, fixing critical bugs, and refining project documentation.",
    achievements: [
      "Contributed to production open-source codebases via Git and GitHub utilizing issue-driven development methodologies.",
      "Authored clean pull requests, participated in peer code reviews, and resolved merge conflicts across distributed teams.",
      "Strengthened automated test coverage and documentation for developer onboarding.",
    ],
    tags: [
      "Open Source",
      "Git & GitHub",
      "Code Reviews",
      "Collaborative Engineering",
      "Issue Resolution",
    ],
  },
];
