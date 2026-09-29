# SHRIYASH SAHU — Personal Portfolio

Production personal portfolio website for **SHRIYASH SAHU** — Computer Science student at Vellore Institute of Technology (VIT Bhopal), full-stack developer, and hackathon leader.

Engineered with Next.js 15 (App Router), TypeScript, Tailwind CSS, and strict monochrome aesthetics.

---

## ✦ Brand Identity & Visual Language

- **Monochrome Discipline**: Black (`#000000`) and White (`#FFFFFF`) palette with supporting slate-neutral scales. Absolutely no arbitrary color gradients, purple, blue, or saturated fills.
- **Interlocking Hexagonal SS Emblem**: Official geometric mark rendered across Light and Dark themes, favicons, and navigation.
- **Authentic Signature**: Preserved handwritten personal signature subtly incorporated into the dossier and contact modules.
- **High-Contrast Editorial Typography**: Built with Geist Sans and Geist Mono, emphasizing strong hierarchy, generous letter spacing (`0.24em`), and architectural layouts.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + PostCSS
- **Animations & Interactivity**: [Framer Motion](https://www.framer.com/motion/) & Lucide React
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Theme System**: [next-themes](https://github.com/pacocoursey/next-themes) (Persisted Dark & Light mode)
- **Email (Optional)**: [Resend](https://resend.com/) API Integration

---

## 📂 Project Structure

```bash
├── app/
│   ├── api/contact/route.ts       # Contact transmission endpoint (Zod + Resend)
│   ├── about/page.tsx             # Dossier, academic background & verified honours
│   ├── blog/                      # Technical writing index
│   │   └── [slug]/page.tsx        # Individual engineering case study view
│   ├── contact/page.tsx           # Contact console & direct communication
│   ├── projects/                  # Selected works portfolio
│   │   └── [slug]/page.tsx        # Deep-dive project case studies
│   ├── experience/page.tsx        # Comprehensive timeline & hackathon achievements
│   ├── globals.css                # CSS variables, monochrome palette, scrollbars
│   ├── layout.tsx                 # Root layout, Geist font, JSON-LD schemas
│   ├── loading.tsx                # Minimal geometric loading state
│   ├── not-found.tsx              # Monochrome 404 page
│   ├── page.tsx                   # Main homepage assembling all sections
│   ├── robots.ts                  # Robots.txt crawler directives
│   └── sitemap.ts                 # Dynamic sitemap generator
│
├── components/
│   ├── about/                     # AboutPreview component
│   ├── blog/                      # BlogPreview component
│   ├── command-menu/              # ⌘K / Ctrl+K keyboard command palette
│   ├── contact/                   # ContactSection component
│   ├── design-import/             # Stitch-style "Start with your design" modal
│   ├── experience/                # ExperienceSection component
│   ├── footer/                    # High-contrast dark footer
│   ├── hero/                      # Hero typography, portrait & verified metrics
│   ├── layout/                    # ClientShell managing global modals
│   ├── leadership/                # Leadership & Activities numbered list
│   ├── navbar/                    # Sticky responsive navigation & theme toggle
│   ├── portfolio/                 # ProjectCard & PortfolioSection
│   ├── providers/                 # ThemeProvider
│   ├── services/                  # "What I Work On" expandable interactive rows
│   ├── skills/                    # Technical stack categorized grid
│   └── ui/                        # Button, Badge, SectionHeading, GeometricLogo, Signature
│
├── content/
│   ├── blog.ts                    # Technical articles & engineering notes
│   ├── experience.ts              # Verified employment, community & open-source roles
│   ├── leadership.ts              # ORIGIN'26, hackathons, and student leadership
│   ├── projects.ts                # Verified projects: ScriptLyra, AI-BUDDY, MCRE, etc.
│   ├── services.ts                # Core engineering offerings
│   └── skills.ts                  # Technical stack organized into 6 domains
│
├── lib/
│   ├── analytics.ts               # Telemetry abstraction
│   ├── metadata.ts                # SEO metadata and JSON-LD builders
│   ├── site-config.ts             # Centralized personal info & URLs
│   └── utils.ts                   # Class name merger and formatters
│
├── public/
│   ├── logo/                      # Light and dark SS logo assets
│   ├── profile/                   # Portrait photo & light/dark signatures
│   ├── projects/                  # Project exhibit media & blueprints
│   ├── resume/                    # Resume PDF and PNG archives
│   ├── favicon.ico                # 32x32 favicon
│   └── apple-touch-icon.png       # 180x180 iOS touch icon
│
├── types/
│   └── index.ts                   # TypeScript interfaces
│
├── .env.example                   # Environment configuration template
├── package.json                   # Dependencies and build scripts
├── tailwind.config.ts             # Tailwind design tokens and layout rules
└── tsconfig.json                  # TypeScript compiler settings
```

---

## 🚀 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shriyash2006/SHRIYASH-S-Portfolio.git
   cd SHRIYASH-S-Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables (optional)**:
   ```bash
   cp .env.example .env.local
   ```
   Add your `RESEND_API_KEY` if you wish to receive form submissions via email. If omitted, submissions will be logged safely in development without breaking the application.

4. **Launch development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 🧪 Validation & Quality Checks

Run all verification scripts before pushing or deploying:

```bash
# TypeScript type check
npm run typecheck

# Production build test
npm run build
```

---

## 🌐 Deployment to Vercel

This repository is optimized for zero-configuration deployment on **Vercel**:

1. Push your changes to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: complete production portfolio for SHRIYASH SAHU"
   git push origin main
   ```
2. Connect your GitHub repository to [Vercel](https://vercel.com).
3. Set the optional environment variables (`RESEND_API_KEY`, `CONTACT_EMAIL`).
4. Click **Deploy**.

---

## 📄 License & Attribution

Designed and built for **SHRIYASH SAHU**.
All personal brand marks, logos, and signatures are proprietary to SHRIYASH SAHU.
All rights reserved © 2026.
