# Feature: portfolio-cleanup-b2b

Close the three defects left open by the B2B pivot: missing social/favicon assets,
half-finished i18n, and non-indexable English content. Preparation step for a future
content admin: all section content moves out of `.vue` files into the data layer.

## Specs

S1. Deliver the referenced-but-missing assets so social previews and favicons stop
returning 404: `public/favicon-32x32.png`, `public/favicon-16x16.png`,
`public/apple-touch-icon.png`, `public/images/og-image.png`.
The OG image follows `og-image-brief.md` exactly: 1200x630 PNG, dark background
(`#0a0a0a`/`#111111`), name "Marcelo Toro" large in white, tagline
"Software & Automatización" with a purple/blue/pink gradient, minimal, no photo,
no technology logos, subtle aurora glow.

S2. Every visible section switches language with the toggle. `SkillsSection.vue`,
`ExperienceSection.vue` and the `ProjectsSection.vue` content (title, category,
description, problem, solution, metrics, highlights, labels) read from the i18n
layer instead of hardcoded English literals. `es.ts` and `en.ts` stay structurally
identical through `TranslationSchema`.

S3. Remove dead translation keys that no component reads: `about.metrics.title`,
`projects.labels.*` (only if still unused after S2), `common.learnMore`,
`common.viewAll`, `language.current`.

S4. Remove the production `console.log` in `src/composables/useTheme.ts`.

S5. The document language follows the active locale: `<html lang>` is updated when
the locale changes, instead of being fixed to `es` in `index.html`.

S6. The English version becomes indexable: a real URL per locale, `hreflang`
alternates, per-locale `og:locale`/title/description, and a sitemap listing both
locales. Routing approach is a decision recorded in the Log before T6 starts.

S7. `README.md` describes the current project: actual dependency versions, the B2B
consulting framing, and the Services / i18n / contact-form features.

## Tasks

| ID | Specs | Route | Commit |
|----|-------|-------|--------|
| T1 | S1 | inline — generate assets with headless Chrome, verify dimensions | |
| T2 | S2 | inline — extend TranslationSchema + es/en, refactor 3 sections | |
| T3 | S3, S4 | inline — dead key and log cleanup | |
| T4 | S5 | inline — locale side effect in useI18n | |
| T5 | S7 | inline — README rewrite | |
| T6 | S6 | inline — pending routing decision | |

## Log

L1. User request (verbatim): "Dale con el orden que me diste y luego que este todo
Ok, quiero ver para construir un admin para admoinistrar este portfolio"

L2. Agreed order from the analysis: (1) OG image + favicons, (2) complete i18n for
Skills/Experience/Projects, (3) bilingual SEO strategy. Admin design is discussed
after all three are green.

L3. Tooling: no rsvg/imagemagick/sharp available. Headless Chrome
(`/Applications/Google Chrome.app`) is used to rasterize SVG/HTML to PNG.

L4. S6 has a real architectural fork (SPA with query param vs vue-router + prerender)
and it interacts with the future admin, so T6 stops for a user decision.
