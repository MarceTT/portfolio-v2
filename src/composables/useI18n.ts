import { ref, computed } from 'vue'
import { translations, defaultLocale, getNestedValue, type Locale, type TranslationSchema } from '@/i18n'

const STORAGE_KEY = 'portfolio-locale'

// Detect browser language, default to Spanish
const detectBrowserLocale = (): Locale => {
  if (typeof navigator === 'undefined') return defaultLocale
  
  const browserLang = navigator.language?.split('-')[0]?.toLowerCase()
  
  if (browserLang === 'en') return 'en'
  // Default to Spanish for any other language
  return 'es'
}

// Get initial locale from localStorage or browser detection
const getInitialLocale = (): Locale => {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'es' || stored === 'en') {
      return stored
    }
  }
  // First visit: detect browser language
  return detectBrowserLocale()
}

// Global reactive state
const locale = ref<Locale>(getInitialLocale())

// Current translations based on locale
const currentTranslations = computed<TranslationSchema>(() => translations[locale.value])

/**
 * Get translation by key path (e.g., 'hero.title')
 * Returns the key itself if translation not found
 */
const t = (key: string): string => {
  const value = getNestedValue(currentTranslations.value as Record<string, unknown>, key)
  
  if (typeof value === 'string') {
    return value
  }
  
  // Return key if not found or not a string
  console.warn(`[i18n] Missing translation for key: ${key}`)
  return key
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
 * Toggle between Spanish and English
 */
const toggleLocale = (): void => {
  setLocale(locale.value === 'es' ? 'en' : 'es')
}

export function useI18n() {
  return {
    locale,
    t,
    tRaw,
    setLocale,
    toggleLocale,
    currentTranslations,
  }
}
