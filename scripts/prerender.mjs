#!/usr/bin/env node
// Renders the built site once per locale and writes the result as static HTML.
//
// The app is a client-rendered SPA, so the shipped index.html is an empty shell.
// A crawler that does not run JavaScript sees nothing, and one that does still only
// ever sees Spanish, because the language used to live in localStorage. Giving each
// locale its own URL and its own fully rendered document is what makes the English
// version findable at all.
//
//   dist/index.html      Spanish,  canonical https://…/
//   dist/en/index.html   English,  canonical https://…/en/
//
// Run after `vite build`. Requires Google Chrome.

import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { extname, join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
const SITE = 'https://marcelo-toro-portfolio.netlify.app'

/**
 * Finds a Chrome to render with.
 *
 * Puppeteer's bundled Chromium is what makes this work on a build server; the
 * installed browser is preferred locally because it is already there. Hard-coding
 * the macOS path would have let the build succeed on CI while quietly skipping the
 * prerender, shipping an empty shell to crawlers.
 */
const findChrome = async () => {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH

  // PRERENDER_USE_PUPPETEER lets a test exercise the path a Linux build server takes.
  if (process.env.PRERENDER_USE_PUPPETEER !== '1') {
    const local = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    if (existsSync(local)) return local
  }

  try {
    const { executablePath } = await import('puppeteer')
    // Recent Puppeteer resolves this asynchronously; older versions return a string.
    const path = await executablePath()
    if (path && existsSync(path)) return path
  } catch {
    // Puppeteer is not installed; fall through.
  }

  return null
}

const CHROME = await findChrome()

const LOCALES = [
  {
    code: 'es',
    path: '/',
    out: 'index.html',
    ogLocale: 'es_CL',
    alternate: 'en_US',
    acceptLanguage: 'es-CL',
    title: 'Marcelo Toro | Consultoría de Software & Automatización',
    description:
      'Desarrollo de software a medida, automatización de procesos y consultoría técnica para empresas. +10 años transformando ideas en soluciones.',
    metaDescription:
      'Consultoría de software y automatización. Desarrollo a medida, integración de sistemas y soluciones técnicas para empresas. +10 años de experiencia.',
  },
  {
    code: 'en',
    path: '/en/',
    out: 'en/index.html',
    ogLocale: 'en_US',
    alternate: 'es_CL',
    acceptLanguage: 'en-US',
    title: 'Marcelo Toro | Software & Automation Consulting',
    description:
      'Custom software development, process automation and technical consulting for companies. 10+ years turning ideas into working systems.',
    metaDescription:
      'Software and automation consulting. Custom development, systems integration and technical solutions for companies. 10+ years of experience.',
  },
]

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('[prerender] dist/index.html is missing. Run the build first.')
  process.exit(1)
}

if (!CHROME) {
  // Loud and fatal: a silent skip here means shipping a site that search engines
  // cannot read, which is the whole reason this script exists.
  console.error('[prerender] No Chrome available. Install puppeteer or set CHROME_PATH.')
  process.exit(1)
}

console.log(`[prerender] Using ${CHROME}`)

// --- Serve dist, mapping every locale path to the SPA shell --------------------

const shell = readFileSync(join(DIST, 'index.html'), 'utf8')

const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://localhost')
  const filePath = join(DIST, url.pathname)

  if (extname(url.pathname) && existsSync(filePath)) {
    response.writeHead(200, { 'Content-Type': MIME[extname(url.pathname)] ?? 'application/octet-stream' })
    response.end(readFileSync(filePath))
    return
  }

  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end(shell)
})

const port = await new Promise((done) => {
  server.listen(0, () => done(server.address().port))
})

// --- Render each locale --------------------------------------------------------

const renderLocale = (locale) =>
  new Promise((done, fail) => {
    const chrome = spawn(CHROME, [
      '--headless=new',
      '--disable-gpu',
      '--no-first-run',
      '--no-sandbox',
      `--user-data-dir=${join(DIST, '.prerender-profile', locale.code)}`,
      `--lang=${locale.acceptLanguage}`,
      `--accept-lang=${locale.acceptLanguage}`,
      '--virtual-time-budget=10000',
      '--dump-dom',
      `http://127.0.0.1:${port}${locale.path}`,
    ])

    let html = ''
    let stderr = ''

    chrome.stdout.on('data', (chunk) => (html += chunk))
    chrome.stderr.on('data', (chunk) => (stderr += chunk))

    chrome.on('error', fail)
    chrome.on('close', (code) => {
      if (code !== 0 || html.length < 1000) {
        fail(new Error(`Chrome exited ${code}: ${stderr.slice(0, 200)}`))
        return
      }

      done(html)
    })
  })

/** Rewrites the head so each document describes its own language. */
const applyMetadata = (html, locale) => {
  const canonical = `${SITE}${locale.path}`
  const alternates = LOCALES.map(
    (other) =>
      `<link rel="alternate" hreflang="${other.code}" href="${SITE}${other.path}" />`,
  ).join('\n    ')

  return (
    html
      .replace(/<html lang="[^"]*"/, `<html lang="${locale.code}"`)
      .replace(/<title>[^<]*<\/title>/, `<title>${locale.title}</title>`)
      .replace(
        /<meta name="description" content="[^"]*"/,
        `<meta name="description" content="${locale.metaDescription}"`,
      )
      .replace(
        /<meta property="og:title" content="[^"]*"/,
        `<meta property="og:title" content="${locale.title}"`,
      )
      .replace(
        /<meta property="og:description" content="[^"]*"/,
        `<meta property="og:description" content="${locale.description}"`,
      )
      .replace(
        /<meta property="og:url" content="[^"]*"/,
        `<meta property="og:url" content="${canonical}"`,
      )
      .replace(
        /<meta property="og:locale" content="[^"]*"/,
        `<meta property="og:locale" content="${locale.ogLocale}"`,
      )
      .replace(
        /<meta property="og:locale:alternate" content="[^"]*"/,
        `<meta property="og:locale:alternate" content="${locale.alternate}"`,
      )
      .replace(
        /<meta name="twitter:title" content="[^"]*"/,
        `<meta name="twitter:title" content="${locale.title}"`,
      )
      .replace(
        /<meta name="twitter:description" content="[^"]*"/,
        `<meta name="twitter:description" content="${locale.description}"`,
      )
      // Canonical, plus one hreflang per locale and x-default pointing at Spanish.
      // Chrome normalises the DOM when it dumps it, so the self-closing slash from
      // the source HTML is gone by now: match the tag either way.
      .replace(
        /<link rel="canonical"[^>]*>/,
        [
          `<link rel="canonical" href="${canonical}" />`,
          alternates,
          `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
        ].join('\n    '),
      )
  )
}

/** Fails loudly rather than shipping a page that claims to be another one. */
const verify = (html, locale) => {
  const canonical = `${SITE}${locale.path}`
  const problems = []

  if (!html.includes(`<html lang="${locale.code}"`)) problems.push('wrong html lang')
  if (!html.includes(`<link rel="canonical" href="${canonical}"`)) problems.push('wrong canonical')
  if (!html.includes(`<title>${locale.title}</title>`)) problems.push('wrong title')

  for (const other of LOCALES) {
    if (!html.includes(`hreflang="${other.code}" href="${SITE}${other.path}"`)) {
      problems.push(`missing hreflang ${other.code}`)
    }
  }

  if (!html.includes('hreflang="x-default"')) problems.push('missing x-default')
  if (!html.includes('id="hero"')) problems.push('page body did not render')

  if (problems.length > 0) {
    throw new Error(`${locale.out}: ${problems.join(', ')}`)
  }
}

try {
  for (const locale of LOCALES) {
    const rendered = await renderLocale(locale)
    const html = applyMetadata(rendered, locale)

    verify(html, locale)

    const target = join(DIST, locale.out)

    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, html)

    console.log(`[prerender] ${locale.out} (${(html.length / 1024).toFixed(0)} kB, lang=${locale.code})`)
  }

  // Sitemap listing both locales, each with its alternates.
  const today = new Date().toISOString().slice(0, 10)

  const urls = LOCALES.map((locale) =>
    [
      '  <url>',
      `    <loc>${SITE}${locale.path}</loc>`,
      ...LOCALES.map(
        (other) =>
          `    <xhtml:link rel="alternate" hreflang="${other.code}" href="${SITE}${other.path}" />`,
      ),
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${locale.code === 'es' ? '1.0' : '0.9'}</priority>`,
      '  </url>',
    ].join('\n'),
  ).join('\n')

  writeFileSync(
    join(DIST, 'sitemap.xml'),
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
      '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
      urls,
      '</urlset>',
      '',
    ].join('\n'),
  )

  console.log('[prerender] sitemap.xml (2 locales)')
} catch (error) {
  console.error(`[prerender] ${error.message}`)
  console.error('[prerender] Leaving the built HTML as is.')
  process.exitCode = 1
} finally {
  server.close()
}
