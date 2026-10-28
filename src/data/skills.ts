// Non-translatable skills data. Visible copy (section title, category titles)
// lives in src/i18n; technology names are proper nouns and stay here.

export type TechIcon = {
  name: string
  icon: string
  color: string
}

export type SkillCategoryData = {
  id: string
  icon: string
  color: string
  skills: string[]
}

// Tech icons served by the Simple Icons CDN
export const frontendTech: TechIcon[] = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF', color: '#FFFFFF' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', color: '#F7DF1E' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D', color: '#4FC08D' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: '#06B6D4' },
]

export const backendTech: TechIcon[] = [
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', color: '#5FA04E' },
  { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E', color: '#E0234E' },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20', color: '#FF2D20' },
  { name: 'PHP', icon: 'https://cdn.simpleicons.org/php/777BB4', color: '#777BB4' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/FFFFFF', color: '#FFFFFF' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248', color: '#47A248' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D', color: '#DC382D' },
]

export const devopsTech: TechIcon[] = [
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/FF9900', color: '#FF9900' },
  { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4', color: '#4285F4' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED' },
  { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF', color: '#2088FF' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', color: '#F05032' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', color: '#4479A1' },
]

// `id` is the join key with skills.categories in src/i18n
export const skillCategories: SkillCategoryData[] = [
  {
    id: 'frontend',
    icon: 'frontend',
    color: 'bg-blue-500/20 text-blue-400',
    skills: ['React', 'Next.js 15', 'TypeScript', 'JavaScript', 'Vue.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    icon: 'backend',
    color: 'bg-green-500/20 text-green-400',
    skills: ['Node.js', 'NestJS', 'Laravel', 'PHP', 'Express.js', 'REST APIs'],
  },
  {
    id: 'database',
    icon: 'database',
    color: 'bg-purple-500/20 text-purple-400',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    id: 'cloud',
    icon: 'cloud',
    color: 'bg-orange-500/20 text-orange-400',
    skills: ['AWS (EC2, S3, CloudFront, RDS)', 'GCP (Cloud Run, Cloud SQL)', 'Docker', 'CI/CD', 'GitHub Actions'],
  },
]
