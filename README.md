# Portfolio

A fast, config-driven developer portfolio built with Next.js 15, React 19, and Tailwind CSS v4. Edit one file to make it yours — no component hunting.

Built by [Affan Thameem](https://www.linkedin.com/in/affanthameem)

## Features

- **Single-file config** — all content (bio, experience, projects, skills, education, map pins) lives in `app/config/portfolio.ts`. Both views render from it.
- **Two views** — a split-pane main page with section switching + a live clock, and an interactive `/terminal` page that renders the same data as a command-line UI.
- **Travel map** — Leaflet map of places you've lived/visited, driven by the config.
- **Monospace aesthetic** — Geist Mono, dark theme, Framer Motion transitions.

## Tech Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · HeroUI · Framer Motion · React Leaflet · Lucide icons. Package manager: pnpm.

## Quick Start

```bash
git clone https://github.com/thameem-a/portfolio.git
cd portfolio
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Make It Yours

1. **Edit `app/config/portfolio.ts`** — replace `personal`, `experience`, `projects`, `skillCategories`, `certifications`, `education`, and `mapLocations` with your own.
2. **Swap assets** in `public/` — add your `resume.pdf`, replace `favicon.ico` and any images.
3. **Update metadata** in `app/layout.tsx` (page title + description).
4. Deploy to [Vercel](https://vercel.com/new) (zero config) or any Node host: `pnpm build && pnpm start`.

## Project Structure

```
app/
  config/portfolio.ts   # ← edit this: all your content
  page.tsx              # main split-pane view
  terminal/page.tsx     # interactive terminal view
  components/TravelMap.tsx
  layout.tsx            # metadata + fonts
  globals.css           # theme tokens
public/                 # resume, favicon, images
```

## License & Reuse

The **code** is MIT licensed — fork it, modify it, use it commercially. See [LICENSE](LICENSE).

> [!IMPORTANT]
> **Content is not covered by the MIT license.** The personal content in this repo — bio, work experience, project descriptions, photos, resume, and any text in `app/config/portfolio.ts` — belongs to Affan Thameem and is **not** licensed for reuse. If you fork this, replace all personal content with your own before publishing.
