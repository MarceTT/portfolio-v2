# Marcelo Toro — Software & Automation Consulting

[![Live Demo](https://img.shields.io/badge/Live_Demo-marcelo--toro--portfolio.netlify.app-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://marcelo-toro-portfolio.netlify.app/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)

Single-page consulting site offering custom software development, process
automation and technical consulting, backed by 10+ years of full-stack work.

**[View Live Demo →](https://marcelo-toro-portfolio.netlify.app/)**

## Features

- **Bilingual (ES/EN), indexable** — each language has its own URL (`/` and `/en/`),
  prerendered to static HTML with its own metadata and reciprocal `hreflang`
- **Editable without code** — content comes from a snapshot the
  [admin](https://github.com/MarceTT/portfolio-admin) syncs at build time
- **Contact form** — vee-validate + Zod validation, submitted to Netlify Forms
- **SEO** — Open Graph and Twitter cards, JSON-LD (`Person` + `ProfessionalService`),
  canonical URL, sitemap and robots
- **Dark/Light mode** — toggle persisted in `localStorage`, applied before first paint
- **Modern UI components** — [Inspira UI](https://inspira-ui.com/) primitives vendored
  into `src/components/ui/` (aurora background, dock, card spotlight, Apple-style
  carousel, marquee, box reveal)
- **Responsive** — mobile-first, with a reduced navigation dock on small screens

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Vue 3.5 (Composition API, `<script setup>`) |
| **Language** | TypeScript 5.9 (strict) |
| **Styling** | Tailwind CSS 4, CSS variables |
| **Build Tool** | Vite 7 |
| **UI Components** | Inspira UI, Motion-V |
| **Forms** | vee-validate 4, Zod, Netlify Forms |
| **Utilities** | VueUse, clsx, tailwind-merge |
| **Hosting** | Netlify |

## Project Structure

```
assets-src/          # HTML sources for generated images (see assets-src/README.md)
odd/tasks/           # Work tracking documents
public/              # Static assets, favicons, robots.txt, sitemap.xml
src/
├── components/
│   ├── layout/      # Navigation dock
│   ├── sections/    # Hero, About, Services, Skills, Projects, Experience, Contact
│   └── ui/          # Inspira UI primitives + ContactForm, LanguageToggle
├── composables/     # useI18n, useTheme
├── data/            # Non-translatable content (skills, experience, projects)
├── i18n/            # es.ts / en.ts translations + TranslationSchema
├── lib/             # cn() helper
└── style.css        # Global styles & theme variables
```

### Content model

All content lives in `src/content/content.json`, a committed snapshot. `src/data/*`
and `src/i18n/*` derive their exports from it, so components kept the shape they
already consumed.

**The site never queries a database at runtime.** The snapshot is refreshed during
the build by `npm run sync:content`, and every failure path keeps the committed copy
and exits 0 — an unreachable, paused or malformed database costs an update, never a
deploy.

```
admin ──save──▶ Postgres ──sync (build)──▶ src/content/content.json ──▶ static site
```

`TranslationSchema` (in `src/i18n/types.ts`) is the contract both languages satisfy.

### Localisation and SEO

The locale is read from the path first, so a shared link always shows the language it
promises, whatever the visitor's browser or previous visit says. Switching language
navigates to the other URL rather than mutating state.

`npm run prerender` renders the built SPA once per locale and writes each as complete
static HTML, so a crawler that never runs JavaScript still receives the whole page in
the right language:

| | |
|---|---|
| `dist/index.html` | Spanish, canonical `/` |
| `dist/en/index.html` | English, canonical `/en/` |
| `dist/sitemap.xml` | both locales with alternates |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/MarceTT/portfolio-v2.git
cd portfolio-v2

npm install           # install dependencies
npm run dev           # start development server
npm run build         # sync content, type-check, compile, prerender both locales
npm run preview       # preview the production build

npm run test:sync     # the content sync keeps the snapshot on every failure
npm run test:locales  # both locales render, cross-link and work without JavaScript
```

`npm run build` reads `SUPABASE_URL` and `SUPABASE_SECRET_KEY` to refresh the
content. Without them it builds from the committed snapshot and says so.
Prerendering needs Google Chrome; without it the build leaves the SPA shell in place.

> The contact form posts to Netlify Forms, which only exists on a deployed
> Netlify site. Locally the submission fails and the form shows its error state.

## Sections

1. **Hero** — aurora background, value-proposition marquee and primary CTA
2. **About** — bento grid with bio, client metrics and languages
3. **Services** — custom software, automations and technical consulting
4. **Skills** — technology marquee and categorized skill cards
5. **Projects** — Apple-style carousel with per-case-study problem, solution,
   metrics and highlights
6. **Experience** — 10+ years of roles, with earlier positions collapsed
7. **Contact** — validated contact form and direct channels

## Customization

### Theme colors

Edit the CSS variables in `src/style.css`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  /* ... */
}

.dark {
  --primary: oklch(0.922 0 0);
  --background: oklch(0.145 0 0);
  /* ... */
}
```

### Content

- **Copy, in both languages**: `src/i18n/es.ts` and `src/i18n/en.ts`
- **Projects, experience and skills data**: `src/data/`
- **Metadata, OG tags and JSON-LD**: `index.html`
- **OG image and favicons**: `assets-src/` (regeneration commands included)

## Quality

`npm run build` type-checks with `vue-tsc` before compiling, so type errors block the
build. There is no test runner; the two checks that matter run as standalone scripts:

- `npm run test:sync` — ten paths through the content sync, proving a content
  problem can never break a deploy
- `npm run test:locales` — fourteen checks over the prerendered output, including
  what a crawler without JavaScript receives

No linter or formatter is configured yet.

## License

MIT License — feel free to use this as a template for your own site.

## Contact

- **LinkedIn**: [marcelo-toro-toro](https://www.linkedin.com/in/marcelo-toro-toro/)
- **GitHub**: [MarceTT](https://github.com/MarceTT)
- **Email**: mtoro6@gmail.com

---

Built with Vue 3 + Inspira UI
