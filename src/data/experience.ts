// Non-translatable experience data. Visible copy (role title, location,
// description, highlights) lives in src/i18n, joined by `id`.

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

export const experiences: ExperienceData[] = [
  {
    id: 'defensoria-del-deudor',
    company: 'Defensoría del Deudor Servicios Profesionales',
    start: '2025-11',
    end: null,
    employment: 'fullTime',
    workMode: 'onSite',
    tech: ['Laravel 12', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'GCP', 'Docker'],
  },
  {
    id: 'match-my-course',
    company: 'Match My Course',
    start: '2025-01',
    end: '2025-10',
    employment: 'fullTime',
    workMode: 'remote',
    tech: ['Next.js 15', 'Node.js', 'MongoDB', 'AWS S3', 'CloudFront', 'TypeScript'],
  },
  {
    id: 'cable-color',
    company: 'Cable Color S.A.',
    start: '2024-03',
    end: '2024-11',
    employment: 'fullTime',
    workMode: 'remote',
    tech: ['Laravel 10', 'React 18', 'TypeScript', 'Redux', 'MySQL', 'Tailwind CSS'],
  },
  {
    id: 'chile-pasajes',
    company: 'Chile Pasajes S.A',
    start: '2024-03',
    end: '2024-08',
    employment: 'contract',
    workMode: 'hybrid',
    tech: ['Laravel 11', 'PHP 8.3', 'Vue.js', 'MySQL', 'Redis', 'Tailwind CSS'],
  },
  {
    id: 'dividing-zero',
    company: 'Dividing Zero',
    start: '2023-10',
    end: '2023-12',
    employment: 'freelance',
    workMode: 'remote',
    tech: ['Laravel 6', 'PHP 7.2', 'Vue.js', 'Bootstrap 5', 'JavaScript'],
    international: true,
  },
  {
    id: 'universidad-del-alba',
    company: 'Universidad del Alba',
    start: '2018-03',
    end: '2023-01',
    employment: 'fullTime',
    workMode: 'onSite',
    tech: ['Laravel 5-8', 'Angular 8', 'PHP 7-8', 'TypeScript', 'MySQL', 'Bootstrap'],
  },
  {
    id: 'americas-car-group',
    company: 'Americas Car Group',
    start: '2017-02',
    end: '2018-01',
    employment: 'fullTime',
    workMode: 'onSite',
    tech: ['Laravel 5.5', 'PHP', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
  },
  {
    id: 'mas-cerca',
    company: 'Mas Cerca Call Center S.A.',
    start: '2016-05',
    end: '2017-01',
    employment: 'fullTime',
    workMode: 'onSite',
    tech: ['PHP', 'MySQL', 'SQL Server', 'JavaScript', 'AJAX'],
  },
  {
    id: 'nuestragencia',
    company: 'nuestrAgencia',
    start: '2015-05',
    end: '2016-03',
    employment: 'fullTime',
    workMode: 'onSite',
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
  },
]

/** Number of roles shown before the "earlier positions" disclosure. */
export const VISIBLE_EXPERIENCE_COUNT = 4
