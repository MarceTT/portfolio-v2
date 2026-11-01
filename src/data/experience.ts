// Non-translatable experience data, read from the committed content snapshot.
// Visible copy (role title, location, description, highlights) lives in src/i18n.

export type EmploymentType = 'fullTime' | 'contract' | 'freelance'
export type WorkMode = 'onSite' | 'remote' | 'hybrid'

export type ExperienceData = {
  id: string
  company: string
  /** First month of the role, as `YYYY-MM`. */
  start: string
  /** Last month of the role, as `YYYY-MM`; `null` means it is current. */
  end: string | null
  employment: EmploymentType
  workMode: WorkMode
  tech: string[]
  international?: boolean
}

export { experiences } from '@/content/snapshot'

/** Number of roles shown before the "earlier positions" disclosure. */
export const VISIBLE_EXPERIENCE_COUNT = 4
