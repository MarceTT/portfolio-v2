// Non-translatable project data, read from the committed content snapshot.
// Visible copy (title, category, description, problem, solution, metric labels,
// highlights) lives in src/i18n.

export type ProjectMetricData = {
  id: string
  value: string
}

export type ProjectData = {
  id: string
  image: string
  metrics: ProjectMetricData[]
  tech: string[]
  /** Public URL of the live product, or `null` when it is not public. */
  link: string | null
  github: string
  year: string
  /** Renders the year as "2024 - Present" in the active locale. */
  ongoing?: boolean
}

export { projects } from '@/content/snapshot'
