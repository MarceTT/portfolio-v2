// Spanish translations, built from the committed content snapshot.
//
// The strings themselves are edited in the admin, not here. The shape is pinned by
// TranslationSchema in ./types.

import { buildTranslations } from '@/content/snapshot'
import type { TranslationSchema } from './types'

export const es: TranslationSchema = buildTranslations('es')

// Re-exported so existing imports from '@/i18n/es' keep resolving.
export type {
  TranslationSchema,
  ServiceItem,
  MetricItem,
  LanguageItem,
  ServiceOption,
  SkillCategoryCopy,
  ExperienceCopy,
  ProjectCopy,
} from './types'
