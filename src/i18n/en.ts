// English translations, built from the committed content snapshot.
// See ./es.ts; the strings are edited in the admin, not here.

import { buildTranslations } from '@/content/snapshot'
import type { TranslationSchema } from './types'

export const en: TranslationSchema = buildTranslations('en')
