#!/usr/bin/env node
// Verifies the sync script's contract: every failure keeps the committed snapshot
// and exits 0, and valid content is written.
//
// There is no test runner in this project, so this is a standalone script:
//   npm run test:sync
//
// It runs the sync script against a stub Supabase REST API. The stub lives in this
// same file but runs in its own process (`--stub`), because the sync script is
// executed synchronously and would otherwise block the stub's event loop — which
// silently turns every case into a timeout that looks like a pass.

import { createServer } from 'node:http'
import { spawn, execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SELF = fileURLToPath(import.meta.url)
const ROOT = resolve(dirname(SELF), '..')
const SNAPSHOT = resolve(ROOT, 'src/content/content.json')

const TABLE_KEYS = {
  projects: 'projects',
  experiences: 'experiences',
  skill_categories: 'skillCategories',
  tech_icons: 'techIcons',
  services: 'services',
  site_copy: 'siteCopy',
}

const NEW_BADGE_ES = 'CONTENIDO NUEVO DESDE LA BASE'

// --- Stub server ------------------------------------------------------------

const runStub = (port, mode, snapshotPath) => {
  const snapshot = JSON.parse(readFileSync(snapshotPath, 'utf8'))

  const server = createServer((request, response) => {
    if (mode === 'http-error') {
      response.writeHead(500).end('nope')
      return
    }

    const table = request.url.split('/rest/v1/')[1]?.split('?')[0]
    let rows = structuredClone(snapshot[TABLE_KEYS[table]] ?? [])

    if (mode === 'missing-locale' && table === 'projects') delete rows[0].translations.en
    if (mode === 'unlabelled-metric' && table === 'projects') rows[0].translations.en.metrics = []
    if (mode === 'bad-month' && table === 'experiences') rows[0].start_month = 'Nov 2025'
    if (mode === 'dropped-keys' && table === 'site_copy') rows = rows.slice(0, 3)
    if (mode === 'empty-copy' && table === 'site_copy') rows = []
    if (mode === 'changed' && table === 'site_copy') {
      const badge = rows.find((row) => row.key === 'hero.badge')
      badge.translations.es = NEW_BADGE_ES
      badge.translations.en = 'NEW CONTENT FROM THE DATABASE'
    }

    response.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(rows))
  })

  server.listen(Number(port), () => console.log('ready'))
}

if (process.argv[2] === '--stub') {
  runStub(process.argv[3], process.argv[4], process.argv[5])
} else {
  await runCases()
}

// --- Cases ------------------------------------------------------------------

async function runCases() {
  const original = readFileSync(SNAPSHOT, 'utf8')

  const startStub = (port, mode) =>
    new Promise((fulfil, reject) => {
      const child = spawn('node', [SELF, '--stub', String(port), mode, SNAPSHOT], {
        stdio: ['ignore', 'pipe', 'pipe'],
      })

      const timer = setTimeout(() => reject(new Error('the stub did not start')), 5000)

      child.stdout.on('data', (chunk) => {
        if (String(chunk).includes('ready')) {
          clearTimeout(timer)
          fulfil(child)
        }
      })
      child.stderr.on('data', (chunk) => {
        clearTimeout(timer)
        reject(new Error(`stub failed: ${chunk}`))
      })
      child.on('error', reject)
    })

  const runSync = (env) => {
    try {
      const stdout = execFileSync('node', ['scripts/sync-content.mjs'], {
        cwd: ROOT,
        env: { ...process.env, ...env },
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      })
      return { code: 0, output: stdout }
    } catch (error) {
      return { code: error.status ?? 1, output: `${error.stdout ?? ''}${error.stderr ?? ''}` }
    }
  }

  // name, stub mode (null runs without a stub), env override, expectation
  const cases = [
    ['no credentials', null, {}, 'keeps'],
    [
      'unreachable host',
      null,
      { SUPABASE_URL: 'http://127.0.0.1:5998', SUPABASE_SERVICE_ROLE_KEY: 'x' },
      'keeps',
    ],
    ['http 500', 'http-error', null, 'keeps'],
    ['missing en translations', 'missing-locale', null, 'keeps'],
    ['site copy keys dropped', 'dropped-keys', null, 'keeps'],
    ['site copy empty', 'empty-copy', null, 'keeps'],
    ['metric without label', 'unlabelled-metric', null, 'keeps'],
    ['invalid start month', 'bad-month', null, 'keeps'],
    ['valid, unchanged', 'valid', null, 'unchanged'],
    ['valid, new content', 'changed', null, 'writes'],
  ]

  let port = 5610
  let allPassed = true

  for (const [name, mode, envOverride, expectation] of cases) {
    let stub = null
    let env = envOverride ?? {}

    if (mode) {
      port += 1
      stub = await startStub(port, mode)
      env = { SUPABASE_URL: `http://127.0.0.1:${port}`, SUPABASE_SERVICE_ROLE_KEY: 'stub' }
    }

    const { code, output } = runSync(env)
    if (stub) stub.kill()

    const current = readFileSync(SNAPSHOT, 'utf8')
    const written = current !== original

    // A timeout would pass the "keeps" cases for the wrong reason.
    const timedOut = output.includes('aborted due to timeout')

    const expectations = {
      keeps: !written,
      unchanged: !written && output.includes('unchanged'),
      writes: written && current.includes(NEW_BADGE_ES),
    }

    const passed = code === 0 && !timedOut && expectations[expectation]
    allPassed &&= passed

    const reason = output.trim().split('\n').filter(Boolean).pop() ?? ''
    console.log(
      `${passed ? 'PASS' : 'FAIL'}  ${name.padEnd(24)} exit=${code} ` +
        `snapshot=${written ? 'written' : 'intact'}  ` +
        `${reason.replace('[sync-content] ', '').slice(0, 60)}`,
    )

    writeFileSync(SNAPSHOT, original)
  }

  console.log(
    allPassed
      ? '\nAll paths hold: every failure keeps the snapshot, valid content is written.'
      : '\nFAILURES above.',
  )

  process.exit(allPassed ? 0 : 1)
}
