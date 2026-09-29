import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { projects } from "@/content/projects";
import { blogPosts } from "@/content/blog";

export async function GET() {
  const baseUrl = siteConfig.siteUrl;

  const staticUrls = [
    "",
    "/about",
    "/projects",
    "/experience",
    "/blog",
    "/contact",
  ];

  const projectUrls = projects.map((p) => `/projects/${p.slug}`);
  const blogUrls = blogPosts.map((b) => `/blog/${b.slug}`);

  const allUrls = [...staticUrls, ...projectUrls, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === "" ? "1.0" : "0.8"}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
