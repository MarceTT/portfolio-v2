// Reads the committed content snapshot and exposes it in the shapes the app uses.
//
// content.json is produced by the admin (`npm run sync:content`) and committed, so
// the site never queries a database at runtime. If the sync fails, the previous
// snapshot is still here and the build still succeeds.

import type { Locale, TranslationSchema } from '@/i18n/types'
import raw from './content.json'

type Translated<T> = Record<Locale, T>

type ProjectSnapshot = {
  slug: string
  image_path: string | null
  link: string | null
  github: string | null
  year: string
  ongoing: boolean
  tech: string[]
  metrics: { id: string; value: string }[]
  position: number
  published: boolean
  translations: Translated<Omit<import('@/i18n/types').ProjectCopy, 'id'>>
}

type ExperienceSnapshot = {
  slug: string
  company: string
  start_month: string
  end_month: string | null
  employment: 'fullTime' | 'contract' | 'freelance'
  work_mode: 'onSite' | 'remote' | 'hybrid'
  international: boolean
  tech: string[]
  position: number
  published: boolean
  translations: Translated<Omit<import('@/i18n/types').ExperienceCopy, 'id'>>
}

type SkillCategorySnapshot = {
  slug: string
  icon: string
  color: string
  skills: string[]
  position: number
  translations: Translated<{ title: string }>
}

type TechIconSnapshot = {
  name: string
  icon_url: string
  row_group: 'frontend' | 'backend' | 'devops'
  position: number
}

type ServiceSnapshot = {
  slug: string
  icon: string
  accent: string
  position: number
  published: boolean
  translations: Translated<Omit<import('@/i18n/types').ServiceItem, 'id'>>
}

type SiteCopySnapshot = {
  key: string
  translations: Translated<unknown>
}

type Snapshot = {
  projects: ProjectSnapshot[]
  experiences: ExperienceSnapshot[]
  skillCategories: SkillCategorySnapshot[]
  techIcons: TechIconSnapshot[]
  services: ServiceSnapshot[]
  siteCopy: SiteCopySnapshot[]
}

const snapshot = raw as Snapshot

const byPosition = <T extends { position: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.position - b.position)

const published = <T extends { published: boolean }>(items: T[]): T[] =>
  items.filter((item) => item.published)

/** Rebuilds a nested object from dotted keys, e.g. `hero.badge`. */
const unflatten = (entries: [string, unknown][]): Record<string, unknown> => {
  const root: Record<string, unknown> = {}

  for (const [path, value] of entries) {
    const keys = path.split('.')
    let node = root

    keys.slice(0, -1).forEach((key) => {
      node[key] ??= {}
      node = node[key] as Record<string, unknown>
    })

    node[keys[keys.length - 1]!] = value
  }

  return root
}

/**
 * Builds one locale's translations: the flat site copy, with the entity lists
 * (services, projects, experience, skills) grafted back onto the tree so
 * `tRaw('projects.items')` keeps working exactly as before.
 */
export const buildTranslations = (locale: Locale): TranslationSchema => {
  const tree = unflatten(
    snapshot.siteCopy.map((entry) => [entry.key, entry.translations[locale]]),
  )

  /** Returns the named branch of the tree, creating it when the copy is empty. */
  const branch = (key: string): Record<string, unknown> => {
    const existing = tree[key]

    if (existing && typeof existing === 'object') {
      return existing as Record<string, unknown>
    }

    const created: Record<string, unknown> = {}
    tree[key] = created
    return created
  }

  branch('services').items = byPosition(published(snapshot.services)).map((service) => ({
    id: service.slug,
    ...service.translations[locale],
  }))

  branch('projects').items = byPosition(published(snapshot.projects)).map((project) => ({
    id: project.slug,
    ...project.translations[locale],
  }))

  branch('experience').items = byPosition(published(snapshot.experiences)).map((experience) => ({
    id: experience.slug,
    ...experience.translations[locale],
  }))

  branch('skills').categories = byPosition(snapshot.skillCategories).map((category) => ({
    id: category.slug,
    title: category.translations[locale].title,
  }))

  return tree as unknown as TranslationSchema
}

// --- Non-translatable data, in the shapes the components already consume -----

export const projects = byPosition(published(snapshot.projects)).map((project) => ({
  id: project.slug,
  image: project.image_path ? `/images/projects/${project.image_path}` : '',
  metrics: project.metrics,
  tech: project.tech,
  link: project.link,
  github: project.github ?? '',
  year: project.year,
  ongoing: project.ongoing,
}))

export const experiences = byPosition(published(snapshot.experiences)).map((experience) => ({
  id: experience.slug,
  company: experience.company,
  start: experience.start_month,
  end: experience.end_month,
  employment: experience.employment,
  workMode: experience.work_mode,
  tech: experience.tech,
  international: experience.international,
}))

export const skillCategories = byPosition(snapshot.skillCategories).map((category) => ({
  id: category.slug,
  icon: category.icon,
  color: category.color,
  skills: category.skills,
}))

const techRow = (group: TechIconSnapshot['row_group']) =>
  byPosition(snapshot.techIcons.filter((tech) => tech.row_group === group)).map((tech) => ({
    name: tech.name,
    icon: tech.icon_url,
  }))

export const frontendTech = techRow('frontend')
export const backendTech = techRow('backend')
export const devopsTech = techRow('devops')
