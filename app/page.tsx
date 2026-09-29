import { Hero } from "@/components/hero/hero";
import { AboutPreview } from "@/components/about/about-preview";
import { PortfolioSection } from "@/components/portfolio/portfolio-section";
import { ServicesSection } from "@/components/services/services-section";
import { ExperienceSection } from "@/components/experience/experience-section";
import { LeadershipSection } from "@/components/leadership/leadership-section";
import { SkillsSection } from "@/components/skills/skills-section";
import { BlogPreview } from "@/components/blog/blog-preview";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <PortfolioSection />
      <ServicesSection />
      <ExperienceSection />
      <LeadershipSection />
      <SkillsSection />
      <BlogPreview />
      <ContactSection />
      <Footer />
    </>
  );
}
