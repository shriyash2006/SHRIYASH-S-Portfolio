import { Metadata } from "next";
import { siteConfig } from "./site-config";

interface PageMetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function constructMetadata({
  title,
  description = siteConfig.metaDescription,
  path = "",
  image = "/logo/ss-logo-dark.png",
}: PageMetadataProps = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.title;

  const url = `${siteConfig.siteUrl}${path}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical: url,
    },
    authors: [{ name: siteConfig.name, url: siteConfig.github }],
    creator: siteConfig.name,
    keywords: [
      "SHRIYASH SAHU",
      "Software Developer",
      "Computer Science Student",
      "VIT Bhopal",
      "Full-Stack Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "AI Systems",
      "EdTech",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: pageTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [image],
      creator: "@shriyash2006",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generatePersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    alternateName: "Shriyash Sahu",
    url: siteConfig.siteUrl,
    jobTitle: "Developer & Computer Science Student",
    affiliation: {
      "@type": "EducationalOrganization",
      name: "Vellore Institute of Technology (VIT Bhopal)",
    },
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Artificial Intelligence",
      "Distributed Systems",
    ],
  };
}

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.metaDescription,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };
}
