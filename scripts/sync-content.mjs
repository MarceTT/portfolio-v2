#!/usr/bin/env node
// Pulls content from Supabase into the committed snapshot at build time.
//
// The site never queries the database at runtime: this writes src/content/content.json
// and the build consumes that file. Every failure path keeps the previous snapshot and
// exits 0, so a database that is down, paused, or serving something malformed can
// never break a deploy — it only means the site ships the last good content.
//
// Required environment (Netlify build variables, never VITE_ prefixed):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//
// Usage: node scripts/sync-content.mjs

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const snapshotPath = resolve(root, 'src/content/content.json')
const imagesDir = resolve(root, 'public/images/projects')

const LOCALES = ['es', 'en']

/** Tables to pull, in snapshot key order, with the column ordering the site expects. */
const TABLES = [
  ['projects', 'projects', 'position'],
  ['experiences', 'experiences', 'position'],
  ['skill_categories', 'skillCategories', 'position'],
  ['tech_icons', 'techIcons', 'position'],
  ['services', 'services', 'position'],
  ['site_copy', 'siteCopy', 'key'],
]

const keep = (reason) => {
  console.warn(`[sync-content] ${reason}`)
  console.warn('[sync-content] Keeping the committed snapshot.')
  process.exit(0)
}

const url = process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  keep('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set.')
}

if (!existsSync(snapshotPath)) {
  console.error('[sync-content] No committed snapshot exists to fall back to.')
  process.exit(1)
}

// --- Fetch ------------------------------------------------------------------

const fetchTable = async (table, order) => {
  const endpoint = `${url.replace(/\/$/, '')}/rest/v1/${table}?select=*&order=${order}.asc`

  const response = await fetch(endpoint, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(20_000),
  })

  if (!response.ok) {
    throw new Error(`${table}: HTTP ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// --- Verification -----------------------------------------------------------
//
// The admin validates with Zod on write. This is the second gate: it refuses a
// snapshot that would render blank or half-translated, which is the only failure
// the build itself would not catch.

const fail = (message) => {
  throw new Error(message)
}

const bothLocales = (row, label) => {
  for (const locale of LOCALES) {
    const copy = row.translations?.[locale]
    if (copy === undefined || copy === null) fail(`${label}: missing "${locale}" translations`)
  }
}

const nonEmptyString = (value, label) => {
  if (typeof value !== 'string' || value.trim() === '') fail(`${label}: empty or not a string`)
}

const verify = (snapshot) => {
  for (const [, key] of TABLES) {
    if (!Array.isArray(snapshot[key])) fail(`${key}: not an array`)
  }

  if (snapshot.siteCopy.length === 0) fail('siteCopy: no rows, the site would render blank')

  for (const project of snapshot.projects) {
    const label = `project "${project.slug}"`
    bothLocales(project, label)

    const metricIds = (project.metrics ?? []).map((metric) => metric.id)

    for (const locale of LOCALES) {
      const copy = project.translations[locale]
      nonEmptyString(copy.title, `${label} [${locale}] title`)
      nonEmptyString(copy.description, `${label} [${locale}] description`)

      const labelled = (copy.metrics ?? []).map((metric) => metric.id)
      const missing = metricIds.filter((id) => !labelled.includes(id))
      if (missing.length > 0) {
        fail(`${label} [${locale}]: metrics without a label: ${missing.join(', ')}`)
      }
    }
  }

  for (const experience of snapshot.experiences) {
    const label = `experience "${experience.slug}"`
    bothLocales(experience, label)
    nonEmptyString(experience.company, `${label} company`)

    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(experience.start_month ?? '')) {
      fail(`${label}: start_month must be YYYY-MM`)
    }
    if (experience.end_month !== null && !/^\d{4}-(0[1-9]|1[0-2])$/.test(experience.end_month)) {
      fail(`${label}: end_month must be YYYY-MM or null`)
    }

    for (const locale of LOCALES) {
      nonEmptyString(experience.translations[locale].title, `${label} [${locale}] title`)
    }
  }

  for (const category of snapshot.skillCategories) {
    bothLocales(category, `skill category "${category.slug}"`)
  }

  for (const service of snapshot.services) {
    bothLocales(service, `service "${service.slug}"`)
  }

  for (const entry of snapshot.siteCopy) {
    bothLocales(entry, `site copy "${entry.key}"`)
  }

  // Every key the current snapshot has must survive, or a section loses its copy.
  const previous = JSON.parse(readFileSync(snapshotPath, 'utf8'))
  const previousKeys = new Set((previous.siteCopy ?? []).map((entry) => entry.key))
  const incomingKeys = new Set(snapshot.siteCopy.map((entry) => entry.key))
  const dropped = [...previousKeys].filter((key) => !incomingKeys.has(key))

  if (dropped.length > 0) {
    fail(`site copy keys disappeared: ${dropped.slice(0, 5).join(', ')}`)
  }
}

// --- Images -----------------------------------------------------------------

const downloadImages = async (snapshot) => {
  mkdirSync(imagesDir, { recursive: true })

  for (const project of snapshot.projects) {
    const name = project.image_path
    if (!name) continue

    const target = resolve(imagesDir, name)
    if (existsSync(target)) continue

    const endpoint = `${url.replace(/\/$/, '')}/storage/v1/object/public/project-images/${name}`

    try {
      const response = await fetch(endpoint, { signal: AbortSignal.timeout(30_000) })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      writeFileSync(target, Buffer.from(await response.arrayBuffer()))
      console.log(`[sync-content] Downloaded ${name}`)
    } catch (error) {
      // A missing image is a broken card, not a broken build.
      console.warn(`[sync-content] Could not download ${name}: ${error.message}`)
    }
  }
}

// --- Main -------------------------------------------------------------------

try {
  const results = await Promise.all(TABLES.map(([table, , order]) => fetchTable(table, order)))

  const snapshot = Object.fromEntries(TABLES.map(([, key], index) => [key, results[index]]))

  verify(snapshot)
  await downloadImages(snapshot)

  const serialized = `${JSON.stringify(snapshot, null, 2)}\n`

  if (serialized === readFileSync(snapshotPath, 'utf8')) {
    console.log('[sync-content] Content unchanged.')
    process.exit(0)
  }

  writeFileSync(snapshotPath, serialized)

  const counts = Object.entries(snapshot)
    .map(([key, rows]) => `${rows.length} ${key}`)
    .join(', ')

  console.log(`[sync-content] Updated snapshot: ${counts}`)
} catch (error) {
  keep(`Sync failed: ${error.message}`)
}
