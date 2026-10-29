import { es } from './es'
import { en } from './en'
import type { Locale, TranslationSchema } from './types'

export type {
  Locale,
  TranslationSchema,
  ServiceItem,
  MetricItem,
  LanguageItem,
  ServiceOption,
  SkillCategoryCopy,
  ExperienceCopy,
  ProjectCopy,
} from './types'

export const translations: Record<Locale, TranslationSchema> = {
  es,
  en,
}

export const defaultLocale: Locale = 'es'

export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
}

// Helper to get nested value from translation object
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

export { es, en }
