import { Metadata } from "next";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { constructMetadata } from "@/lib/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description:
    "Get in touch with SHRIYASH SAHU for software engineering, collaborations, and technical initiatives.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <div className="pt-8">
        <ContactSection />
      </div>
      <Footer />
    </>
  );
}
