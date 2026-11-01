import { ref, computed, watchEffect } from 'vue'
import { translations, defaultLocale, getNestedValue, type Locale, type TranslationSchema } from '@/i18n'

const STORAGE_KEY = 'portfolio-locale'

/** Each locale has its own URL, which is what makes both versions indexable. */
export const pathForLocale = (locale: Locale): string => (locale === 'en' ? '/en/' : '/')

/** Reads the locale from the current path: `/en/...` is English, anything else Spanish. */
const localeFromPath = (): Locale | null => {
  if (typeof location === 'undefined') return null

  return /^\/en(\/|$)/.test(location.pathname) ? 'en' : 'es'
}

// Detect browser language, default to Spanish
const detectBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return defaultLocale
  
  const browserLang = navigator.language?.split('-')[0]?.toLowerCase()
  
  if (browserLang === 'en') return 'en'
  // Default to Spanish for any other language
  return 'es'
}

/**
 * The URL wins.
 *
 * A visitor arriving from a search result or a shared link must get the language that
 * URL promises, whatever their browser or a previous visit says. Stored and detected
 * preferences only decide where a first visit to `/` is sent.
 */
const getInitialLocale = (): Locale => {
  const fromPath = localeFromPath()
  if (fromPath) return fromPath

  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') {
      return stored
    }
  }

  return detectBrowserLocale()
}

// Global reactive state
const locale = ref<Locale>(getInitialLocale())

// Current translations based on locale
const currentTranslations = computed<TranslationSchema>(() => translations[locale.value])

// Keep the document language in sync so assistive technology and search engines
// see the locale the visitor is actually reading.
watchEffect(() => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale.value
  }
})

/**
 * Get translation by key path (e.g., 'hero.title')
 * Placeholders written as `{name}` are replaced from `params`.
 * Returns the key itself if translation not found
 */
const t = (key: string, params?: Record<string, string | number>): string => {
  const value = getNestedValue(currentTranslations.value as Record<string, unknown>, key)
  
  if (typeof value === 'string') {
    if (!params) {
      return value
    }

    return value.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
      name in params ? String(params[name]) : placeholder,
    )
  }
  
  // Return key if not found or not a string
  console.warn(`[i18n] Missing translation for key: ${key}`)
  return key
}

const monthYearFormatter = computed(
  () => new Intl.DateTimeFormat(locale.value === 'es' ? 'es-ES' : 'en-US', {
    month: 'short',
    year: 'numeric',
  }),
)

/**
 * Format a `YYYY-MM` string as a localized month and year, e.g. 'Nov 2025'.
 * Returns the input unchanged when it is not a valid month.
 */
const formatMonthYear = (isoMonth: string): string => {
  const [year, month] = isoMonth.split('-').map(Number)

  if (!year || !month || month < 1 || month > 12) {
    return isoMonth
  }

  // Build the date in local time: `new Date('2025-11')` is parsed as UTC and can
  // shift to the previous month in negative offsets such as Chile's.
  const formatted = monthYearFormatter.value
    .format(new Date(year, month - 1, 1))
    .replace('.', '')

  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

/**
 * Get raw translation value (for objects/arrays like services.items)
 */
const tRaw = <T = unknown>(key: string): T => {
  const value = getNestedValue(currentTranslations.value as Record<string, unknown>, key)
  return value as T
}

/**
 * Set locale and persist to localStorage
 */
const setLocale = (newLocale: Locale): void => {
  locale.value = newLocale
  
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, newLocale)
  }
}

/**
 * Switch language by going to that language's URL.
 *
 * A full navigation, not a state change: the other locale is a different document
 * with its own prerendered HTML and metadata, and the address bar has to agree with
 * what is on screen so the page can be shared or bookmarked.
 */
const toggleLocale = (): void => {
  const next: Locale = locale.value === 'es' ? 'en' : 'es'

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, next)
  }

  if (typeof location === 'undefined') {
    locale.value = next
    return
  }

  location.assign(`${pathForLocale(next)}${location.hash}`)
}

export function useI18n() {
  return {
    locale,
    t,
    tRaw,
    formatMonthYear,
    setLocale,
    toggleLocale,
    currentTranslations,
  }
}
