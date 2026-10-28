# Feature: portfolio-admin (proposal — not started)

A Vue + TypeScript admin backed by a free hosted Postgres, so the portfolio content
can be edited without touching code. Proposal only: nothing here is implemented yet.

## Principle

**The public site never talks to the database at runtime.**

Content is pulled at build time into a JSON snapshot that is committed to the repo.
The site keeps consuming it exactly as it consumes `src/data` + `src/i18n` today.

Consequences:

- Visitors get a static site: no database latency, no runtime credentials, no cost.
- If the database is paused, unreachable, or wrong, the last committed snapshot still
  builds. The admin can break; the site cannot.
- Search engines get fully rendered HTML, which is what makes S6 (indexable English)
  solvable at all.

## Pieces

| Piece | What it is | Hosting |
|-------|------------|---------|
| Database | Postgres + Auth + Storage + row level security (Supabase) | Free tier |
| `admin` | Vue 3 + TS + Vite SPA: login, CRUD, image upload, publish | Netlify (private) |
| `portfolio-v2` | This repo, unchanged at runtime; gains a build-time sync script | Netlify (public) |

Why Supabase rather than a bare Postgres host: it bundles the three things an admin
needs anyway — authentication, file storage for project images, and row level
security — so there is no backend to write or maintain. Exact free-tier limits
(storage, project pausing on inactivity) must be confirmed when the account is
created; a paused project only blocks the admin, never the public site.

## Data model

One table per entity, with translations as a `jsonb` column keyed by locale, instead
of a separate `*_translations` table per entity. At this volume (4 projects, 9 roles)
the join-heavy schema buys nothing, and a single row is the unit the admin edits.

```
projects          id, slug, image_path, link, github, year, ongoing,
                  tech text[], metrics jsonb, position, published,
                  translations jsonb   -- { es: {...}, en: {...} }

experiences       id, slug, company, start_month, end_month, employment,
                  work_mode, international, tech text[], position,
                  translations jsonb

skill_categories  id, slug, icon, color, skills text[], position, translations jsonb

services          id, slug, icon, accent, position, translations jsonb

site_copy         key, translations jsonb   -- hero, about, contact, nav strings

tech_icons        id, name, icon_url, row, position   -- the skills marquee
```

The `translations` shape is validated with Zod in the admin and in the sync script,
so a half-translated row never reaches a build. The current `TranslationSchema` is
the starting contract.

Images live in a Storage bucket; `image_path` holds the key, and the sync script
downloads them into `public/images/projects/` at build time.

## Publish flow

1. Edit in the admin, which writes to Postgres.
2. Press **Publish**: a Supabase Edge Function calls the Netlify build hook (the hook
   URL stays server-side, so it is not exposed in the admin bundle).
3. Netlify build runs `npm run sync:content` first: fetch rows, validate with Zod,
   write `src/content/*.json`, download new images.
4. Build fails validation or fetch? The previous committed snapshot is used and the
   build still succeeds, with a warning.

## Security

- The admin ships only the anon key; every table denies access without an
  authenticated session (RLS).
- Single admin user; no public sign-up.
- The service role key exists only as a Netlify build environment variable, never in
  any browser bundle.

## Delivery slices

| Slice | Content |
|-------|---------|
| A1 | Supabase project, schema, RLS policies, seed script importing today's `src/data` + `src/i18n` |
| A2 | `sync:content` build script + snapshot fallback, public site reads the snapshot |
| A3 | Admin scaffold: Vue 3 + TS + Vite + shadcn-vue, Supabase auth, protected layout |
| A4 | CRUD per entity with ES/EN tabs and Zod validation (projects, experiences, skills, services, site copy) |
| A5 | Image upload to Storage, reordering, publish button + Edge Function |
| A6 | S6: vue-router with `/` (es) and `/en`, static generation of both, hreflang, per-locale sitemap and OG tags |

A1 and A2 are worth doing even if the admin stops there: they already decouple
content from code.

## Open question

Repository layout: a separate `portfolio-admin` repo, or an `admin/` workspace inside
this one. Separate keeps the public site's build and dependency surface untouched;
same repo keeps the shared content types in one place.
