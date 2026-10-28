// Non-translatable project data. Visible copy (title, category, description,
// problem, solution, metric labels, highlights) lives in src/i18n, joined by `id`.

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

const GITHUB_PROFILE = 'https://github.com/MarceTT'

export const projects: ProjectData[] = [
  {
    id: 'nurturing',
    image: '/images/projects/nurturing.png',
    metrics: [
      { id: 'emailsPerCampaign', value: '830,013' },
      { id: 'deliveryRate', value: '94.61%' },
      { id: 'openRate', value: '14.82%' },
      { id: 'parallelWorkers', value: '20' },
    ],
    tech: ['Laravel 12', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'GCP', 'Docker', 'Zustand', 'TanStack Query'],
    link: null,
    github: GITHUB_PROFILE,
    year: '2024',
    ongoing: true,
  },
  {
    id: 'match-my-course',
    image: '/images/projects/matchmycourse.png',
    metrics: [
      { id: 'monthlyUsers', value: '5,000+' },
      { id: 'uptime', value: '99.9%' },
      { id: 'apiResponse', value: '<200ms' },
      { id: 'trafficGrowth', value: '300%' },
    ],
    tech: ['Next.js 15', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS S3', 'CloudFront', 'Tailwind CSS'],
    link: 'https://matchmycourse.com',
    github: GITHUB_PROFILE,
    year: '2025',
  },
  {
    id: 'cable-color-back-office',
    image: '/images/projects/back_office.png',
    metrics: [
      { id: 'loadTime', value: '-60%' },
      { id: 'productivity', value: '+40%' },
      { id: 'branches', value: '6' },
      { id: 'teamSize', value: '4' },
    ],
    tech: ['Laravel 10', 'React 18', 'TypeScript', 'Redux', 'TanStack Query', 'MySQL', 'Tailwind CSS', 'JWT'],
    link: null,
    github: GITHUB_PROFILE,
    year: '2024',
  },
  {
    id: 'chile-pasajes',
    image: '/images/projects/pasajes.png',
    metrics: [
      { id: 'destinations', value: '2,000+' },
      { id: 'countries', value: '2' },
      { id: 'cacheHit', value: '95%' },
      { id: 'response', value: '<300ms' },
    ],
    tech: ['Laravel 11', 'PHP 8.3', 'Vue.js', 'Laravel Nova', 'MySQL', 'Redis', 'Tailwind CSS'],
    link: 'https://chilepasajes.cl',
    github: GITHUB_PROFILE,
    year: '2024',
  },
]
