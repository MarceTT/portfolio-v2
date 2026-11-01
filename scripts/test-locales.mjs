#!/usr/bin/env node
// Checks the prerendered output the way visitors and crawlers meet it.
//
// There is no test runner in this project, so this is a standalone script:
//   npm run build && npm run test:locales
//
// It serves dist/ the way Netlify would and checks both locales: the rendered page,
// the language switch, and — the point of prerendering — what a crawler that never
// runs JavaScript receives.

import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { extname, join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, 'dist')
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

if (!existsSync(join(DIST, 'en', 'index.html'))) {
  console.error('dist/en/index.html is missing. Run `npm run build` first.')
  process.exit(1)
}

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.json': 'application/json',
}

// --- Static server, mirroring the Netlify rules in netlify.toml ---------------

const server = createServer((request, response) => {
  const path = new URL(request.url, 'http://localhost').pathname

  if (path === '/en') {
    response.writeHead(301, { Location: '/en/' })
    response.end()
    return
  }

  const file = path.endsWith('/') ? join(DIST, path, 'index.html') : join(DIST, path)

  if (!existsSync(file)) {
    response.writeHead(404)
    response.end('not found')
    return
  }

  response.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' })
  response.end(readFileSync(file))
})

const port = await new Promise((done) => server.listen(0, () => done(server.address().port)))
const origin = `http://127.0.0.1:${port}`

// --- Chrome over the DevTools Protocol ----------------------------------------

const debugPort = 9200 + Math.floor(Math.random() * 500)

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${join(DIST, '.locale-test-profile-' + debugPort)}`,
  'about:blank',
])

// The page target, not the browser one: the URL Chrome prints on stderr controls
// the browser session, where Runtime.evaluate has no document to evaluate against.
const debuggerUrl = await (async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json()
      const page = targets.find((target) => target.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch {
      // Chrome is still starting.
    }

    await new Promise((done) => setTimeout(done, 300))
  }

  throw new Error('Chrome did not expose a page target')
})()

const socket = new WebSocket(debuggerUrl)
await new Promise((done) => socket.addEventListener('open', done, { once: true }))

let nextId = 0
const pending = new Map()

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message)
    pending.delete(message.id)
  }
})

const send = (method, params = {}) =>
  new Promise((done) => {
    nextId += 1
    pending.set(nextId, done)
    socket.send(JSON.stringify({ id: nextId, method, params }))
  })

// The CDP result is nested twice; reading one level returns undefined and makes
// every assertion pass for the wrong reason.
const evaluate = async (expression) => {
  const message = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })

  return message.result?.result?.value
}

const wait = (ms) => new Promise((done) => setTimeout(done, ms))

const visit = async (path) => {
  await send('Page.navigate', { url: `${origin}${path}` })
  await wait(3500)
}

let failures = 0

const check = (name, passed, detail = '') => {
  if (!passed) failures += 1
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name.padEnd(36)} ${detail}`)
}

await send('Page.enable')
await send('Runtime.enable')

// Spanish
await visit('/')
check('/ renders Spanish', await evaluate(`document.body.innerText.includes('Stack Tecnológico')`))
check('/ html lang is es', (await evaluate(`document.documentElement.lang`)) === 'es')
check('/ has no English copy', await evaluate(`!document.body.innerText.includes('Tech Stack')`))

// Switching language is a navigation, not a state change
await evaluate(
  `[...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label')?.includes('Cambiar'))?.click(); true`,
)
await wait(3500)
check('switch goes to /en/', (await evaluate(`location.pathname`)) === '/en/')
check('/en/ renders English', await evaluate(`document.body.innerText.includes('Tech Stack')`))
check('/en/ html lang is en', (await evaluate(`document.documentElement.lang`)) === 'en')

await evaluate(
  `[...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label')?.includes('Switch'))?.click(); true`,
)
await wait(3500)
check('switch returns to /', (await evaluate(`location.pathname`)) === '/')

// A shared link must win over the visitor's own browser language
await send('Network.enable')
await send('Network.setExtraHTTPHeaders', { headers: { 'Accept-Language': 'es-CL,es;q=0.9' } })
await visit('/en/')
check(
  'the URL beats the browser language',
  await evaluate(`document.body.innerText.includes('Tech Stack')`),
)

socket.close()
chrome.kill()

// --- What a crawler without JavaScript receives --------------------------------

for (const [path, present, absent] of [
  ['/', 'Stack Tecnológico', 'Tech Stack'],
  ['/en/', 'Tech Stack', 'Stack Tecnológico'],
]) {
  const html = await (await fetch(`${origin}${path}`)).text()

  check(
    `raw HTML of ${path} is complete`,
    html.includes(present) && !html.includes(absent),
    `${(html.length / 1024).toFixed(0)} kB`,
  )
}

const esHtml = await (await fetch(`${origin}/`)).text()
const enHtml = await (await fetch(`${origin}/en/`)).text()

check('canonical per locale', esHtml.includes('canonical" href="https://marcelo-toro-portfolio.netlify.app/"') &&
  enHtml.includes('canonical" href="https://marcelo-toro-portfolio.netlify.app/en/"'))

check(
  'reciprocal hreflang',
  ['es', 'en'].every((code) => esHtml.includes(`hreflang="${code}"`) && enHtml.includes(`hreflang="${code}"`)),
)

check('/en redirects to /en/', (await fetch(`${origin}/en`, { redirect: 'manual' })).status === 301)

const sitemap = await (await fetch(`${origin}/sitemap.xml`)).text()
check(
  'sitemap lists both locales',
  sitemap.includes('<loc>https://marcelo-toro-portfolio.netlify.app/</loc>') &&
    sitemap.includes('<loc>https://marcelo-toro-portfolio.netlify.app/en/</loc>'),
)

server.close()

console.log(
  failures === 0
    ? '\nBoth locales render, cross-link and are complete without JavaScript.'
    : `\n${failures} check(s) failed.`,
)

process.exit(failures === 0 ? 0 : 1)
