#!/usr/bin/env node
// Exercises the contact form's validation in a real browser.
//
// There is no test runner here, so this is a standalone script:
//   npm run dev        (in another terminal)
//   npm run test:form
//
// Note: the section contains two forms. Netlify needs a hidden one carrying the same
// field names so it can detect the form at deploy time, so every selector here is
// scoped to form[method="POST"] — the one a visitor actually types into.
//
// It types into the actual fields and reads the messages the visitor would see, so
// it describes behaviour rather than the schema that happens to produce it. That is
// what makes it usable as a before/after check across a validation library upgrade.

import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const ORIGIN = process.env.FORM_ORIGIN ?? 'http://localhost:5173'
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const debugPort = 9700 + Math.floor(Math.random() * 200)

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${join(tmpdir(), `form-test-${debugPort}`)}`,
  'about:blank',
])

const wait = (ms) => new Promise((done) => setTimeout(done, ms))

const pageSocketUrl = await (async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json()
      const page = targets.find((target) => target.type === 'page')
      if (page) return page.webSocketDebuggerUrl
    } catch {
      // still starting
    }
    await wait(300)
  }
  throw new Error('Chrome did not expose a page target')
})()

const socket = new WebSocket(pageSocketUrl)
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

// The CDP result is nested twice; reading one level returns undefined and every
// assertion then passes for the wrong reason.
const evaluate = async (expression) => {
  const message = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  })

  if (message.result?.exceptionDetails) {
    throw new Error(message.result.exceptionDetails.exception?.description ?? 'evaluation failed')
  }

  return message.result?.result?.value
}

await send('Page.enable')
await send('Runtime.enable')
await send('Page.navigate', { url: `${ORIGIN}/` })
await wait(4000)

/** Types into one field by its label and lets validation settle. */
const fill = async (fieldName, value) => {
  await evaluate(`
    (() => {
      // The visible form only: Netlify's hidden detection form repeats every name.
      const field = document.querySelector('#contact form[method="POST"] [name="${fieldName}"]')
      if (!field) return 'missing'
      const prototype = field.tagName === 'TEXTAREA' ? HTMLTextAreaElement : HTMLInputElement
      const setter = Object.getOwnPropertyDescriptor(prototype.prototype, 'value').set
      setter.call(field, ${JSON.stringify(value)})
      field.dispatchEvent(new Event('input', { bubbles: true }))
      field.dispatchEvent(new Event('blur', { bubbles: true }))
      return 'ok'
    })()
  `)
  await wait(350)
}

const formState = () =>
  evaluate(`
    (() => {
      const form = document.querySelector('#contact form[method="POST"]')
      if (!form) return { found: false }
      const submit = form.querySelector('button[type="submit"]')
      return {
        found: true,
        submitDisabled: submit?.disabled ?? null,
        errors: [...form.querySelectorAll('p.text-red-500')].map((p) => p.textContent.trim()),
      }
    })()
  `)

let failures = 0

const check = (name, passed, detail = '') => {
  if (!passed) failures += 1
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name.padEnd(38)} ${detail}`)
}

// The form exists and starts closed
const initial = await formState()
check('form renders', initial.found === true)
check('submit starts disabled', initial.submitDisabled === true)

// An invalid email is reported
await fill('name', 'Marcelo')
await fill('email', 'not-an-email')
await fill('message', 'This message is definitely long enough.')

let state = await formState()
check(
  'invalid email is rejected',
  state.errors.some((error) => /valid email/i.test(error)),
  state.errors.join(' | ') || '(no error shown)',
)
check('submit stays disabled on invalid email', state.submitDisabled === true)

// A short message is reported
await fill('email', 'someone@example.com')
await fill('message', 'short')

state = await formState()
check(
  'short message is rejected',
  state.errors.some((error) => /10 characters/i.test(error)),
  state.errors.join(' | ') || '(no error shown)',
)

// A short name is reported
await fill('name', 'M')
await fill('message', 'This message is definitely long enough.')

state = await formState()
check(
  'short name is rejected',
  state.errors.some((error) => /2 characters/i.test(error)),
  state.errors.join(' | ') || '(no error shown)',
)

// Everything valid: the form opens up
await fill('name', 'Marcelo Toro')
await fill('email', 'marcelo@example.com')
await fill('message', 'I would like to discuss a project with you.')

state = await formState()
check('valid input clears every error', state.errors.length === 0, state.errors.join(' | '))
check('submit enables when valid', state.submitDisabled === false)

// Optional fields stay optional
await fill('company', '')
state = await formState()
check('company is optional', state.submitDisabled === false)

socket.close()
chrome.kill()

console.log(
  failures === 0
    ? '\nThe contact form validates exactly as described.'
    : `\n${failures} check(s) failed.`,
)

process.exit(failures === 0 ? 0 : 1)
