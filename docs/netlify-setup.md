# Netlify setup

The site is already deployed; this connects it to the content pipeline, so editing in
the admin and pressing **Publish** updates the live site.

Order matters: Netlify builds from GitHub, so the configuration below only takes
effect once the branch is merged. Steps 1 and 2 can be done at any time — they just
sit there waiting.

---

## 1. Environment variables

**Site configuration → Environment variables → Add a variable.**

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | `https://qafjggphmjpnrezqjgma.supabase.co` |
| `SUPABASE_SECRET_KEY` | your `sb_secret_…` key |

Scope them to **Builds** only. They are read by `npm run sync:content`, which runs on
the server and needs to bypass row level security to read every row.

Never prefix either with `VITE_`: that would inline them into the JavaScript every
visitor downloads.

> If these are missing the build still succeeds and uses the committed snapshot,
> saying so in the log. A missing credential costs an update, never a deploy.

---

## 2. Build hook

**Site configuration → Build & deploy → Build hooks → Add build hook.**

- **Name**: `admin-publish`
- **Branch to build**: `main`

Copy the URL. It goes into Supabase, not into Netlify and not into this repository:

```bash
supabase secrets set NETLIFY_BUILD_HOOK_URL="https://api.netlify.com/build_hooks/…"
```

Anyone holding that URL can trigger builds, which is why it lives as a function
secret and never reaches a browser.

---

## 3. Publish the branch

Nothing above changes the live site until the code is on `main`:

```bash
cd portfolio-v2
git push -u origin chore/post-pivot-cleanup
```

Then open a pull request and merge it, or merge locally and push `main`.

The first build after that will:

1. run `sync:content`, pulling the content from Supabase
2. type-check and compile
3. download Puppeteer's Chromium (once; it is cached afterwards)
4. prerender `/` and `/en/` and write the sitemap

Expect the first build to take a few minutes longer than usual because of the
browser download.

### Check the build settings are not overriding the repository

`netlify.toml` sets the build command, the publish directory and the Node version,
and it wins over the UI. If **Site configuration → Build & deploy → Build settings**
shows a build command, make sure it is `npm run build` — a bare `vite build` would
skip both the content sync and the prerender.

---

## 4. Deploy the publish function

See [the admin's publishing setup](../../portfolio-admin/docs/publishing-setup.md).
In short, from the admin repository:

```bash
brew install supabase/tap/supabase
supabase login
supabase link --project-ref qafjggphmjpnrezqjgma
supabase secrets set NETLIFY_BUILD_HOOK_URL="…"
supabase functions deploy publish
node scripts/check-publish.mjs
```

---

## What to check once it is live

| | |
|---|---|
| `https://…/` | Spanish, `<html lang="es">` |
| `https://…/en/` | English, `<html lang="en">` |
| `https://…/sitemap.xml` | both URLs with alternates |
| View source on `/en/` | the full page in English, not an empty `<div id="app">` |
| Admin → edit → Save → Publish | a build starts; the change is live a minute later |

That last line is the whole point: the content you edit is what visitors read, and
nothing in between runs at request time.
