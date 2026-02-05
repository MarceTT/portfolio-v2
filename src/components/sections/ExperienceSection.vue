<script setup lang="ts">
import { computed } from 'vue'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const experiences = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Defensoría del Deudor Servicios Profesionales',
    location: 'Santiago, Chile',
    period: 'Nov 2025 - Present',
    type: 'Full-time · On-site',
    description: 'Leading development of "Nurturing" — a custom CRM platform with automated email marketing workflows and high-volume distributed processing.',
    highlights: [
      'Architected distributed system processing 789,000+ emails per campaign with 96% delivery rate',
      'Implemented 20 parallel workers with Redis queues for better throughput',
      'Built idempotency system with distributed Redis locks ensuring zero duplicate sends',
      'Fixed browser OOM issues on listings with 350,000+ records',
    ],
    tech: ['Laravel 12', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'GCP', 'Docker'],
  },
  {
    title: 'Senior Full Stack Developer',
    company: 'Match My Course',
    location: 'Chile · Remote',
    period: 'Jan 2025 - Oct 2025',
    type: 'Full-time · Remote',
    description: 'Built end-to-end an educational marketplace connecting students with English courses in Ireland and New Zealand.',
    highlights: [
      'Architected full platform from scratch serving 5,000+ monthly users',
      'Reduced page load time by 40% with SSR + CloudFront CDN',
      'Optimized API response time from 800ms to 200ms',
      'Achieved 300% increase in organic traffic through technical SEO',
      'Implemented ISR for 500+ school pages with 95+ Lighthouse score',
    ],
    tech: ['Next.js 15', 'Node.js', 'MongoDB', 'AWS S3', 'CloudFront', 'TypeScript'],
  },
  {
    title: 'Senior Full Stack Developer',
    company: 'Cable Color S.A.',
    location: 'Ovalle, Chile · Remote',
    period: 'Mar 2024 - Nov 2024',
    type: 'Full-time · Remote',
    description: 'Led full migration of legacy back office system for 10+ sales reps across 6 regional branches.',
    highlights: [
      'Reduced page load times by ~60% migrating to Laravel 10 + React 18',
      'Improved sales team productivity, reducing time-to-task by ~40%',
      'Built custom APIs with JWT authentication serving 6 branches real-time',
      'Led 4-developer team delivering migration on schedule',
    ],
    tech: ['Laravel 10', 'React 18', 'TypeScript', 'Redux', 'MySQL', 'Tailwind CSS'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Chile Pasajes S.A',
    location: 'Santiago, Chile · Hybrid',
    period: 'Mar 2024 - Aug 2024',
    type: 'Contract · Hybrid',
    description: 'Backend systems with Laravel 11, Laravel Nova 4, and modern frontend with Vue.js.',
    highlights: [
      'Developed advanced features with Laravel Nova 4 + custom Vue.js tools',
      'Implemented JWT, Laravel Spatie, Laravel Excel integrations',
      'Optimized performance with Redis and Laravel query caching',
    ],
    tech: ['Laravel 11', 'PHP 8.3', 'Vue.js', 'MySQL', 'Redis', 'Tailwind CSS'],
  },
  {
    title: 'Full Stack Developer',
    company: 'Dividing Zero',
    location: 'Auckland, New Zealand · Remote',
    period: 'Oct 2023 - Dec 2023',
    type: 'Freelance · Remote',
    description: 'Maintained and updated NZVenues platform (nzvenues.co.nz).',
    highlights: [
      'Ensured platform remained functional, secure, and up-to-date',
      'Delivered responsive web applications with Laravel 6 + Vue.js 2',
    ],
    tech: ['Laravel 6', 'PHP 7.2', 'Vue.js', 'Bootstrap 5', 'JavaScript'],
    international: true,
  },
  {
    title: 'IT Project Manager → Full Stack Developer',
    company: 'Universidad del Alba',
    location: 'Santiago, Chile',
    period: 'Mar 2018 - Jan 2023',
    type: 'Full-time · 4 yrs 11 mos',
    description: 'Progressed from Full Stack Developer to IT Project Manager, leading university projects.',
    highlights: [
      'Directed IT projects ensuring adherence to budgets and timelines',
      'Developed custom solutions for faculties using Laravel 5.5-8 + Angular 8',
      'Managed project proposals, technology selection, and team coordination',
      'Provided technical support during new technology implementations',
    ],
    tech: ['Laravel 5-8', 'Angular 8', 'PHP 7-8', 'TypeScript', 'MySQL', 'Bootstrap'],
  },
  {
    title: 'Web Developer',
    company: 'Americas Car Group',
    location: 'Santiago, Chile',
    period: 'Feb 2017 - Jan 2018',
    type: 'Full-time · 1 yr',
    description: 'Analysis and development of requirements for corporation managers.',
    highlights: [
      'Database analysis, modeling and maintenance with PostgreSQL',
      'Developed systems using Laravel 5.5-5.6 + Bootstrap',
    ],
    tech: ['Laravel 5.5', 'PHP', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
  },
  {
    title: 'Web Developer',
    company: 'Mas Cerca Call Center S.A.',
    location: 'Santiago, Chile',
    period: 'May 2016 - Jan 2017',
    type: 'Full-time · 9 mos',
    description: 'Internal systems development for call center operations.',
    highlights: [
      'Built reporting dashboards and data analysis tools',
      'Implemented OOP backend solutions',
    ],
    tech: ['PHP', 'MySQL', 'SQL Server', 'JavaScript', 'AJAX'],
  },
  {
    title: 'Junior Web Developer',
    company: 'nuestrAgencia',
    location: 'Santiago, Chile',
    period: 'May 2015 - Mar 2016',
    type: 'Full-time · 11 mos',
    description: 'Web development for client projects at a digital agency.',
    highlights: [
      'Developed and maintained web applications',
      'Gained foundational full-stack development experience',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
  },
]

// Show first 4 by default, expand to see all
const visibleExperiences = computed(() => experiences.slice(0, 4))
const hiddenExperiences = computed(() => experiences.slice(4))
</script>

<template>
  <section id="experience" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Experience
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          10+ years building web applications across 3 countries
        </p>
      </div>

      <div class="space-y-6">
        <!-- Main experiences -->
        <CardSpotlight
          v-for="exp in visibleExperiences"
          :key="exp.company + exp.period"
          class="p-6"
          :gradient-color="isDark ? '#262626' : '#e5e5e5'"
        >
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div class="flex-1">
              <div class="mb-2 flex flex-wrap items-center gap-2">
                <h3 class="text-xl font-semibold">{{ exp.title }}</h3>
                <span
                  v-if="exp.international"
                  class="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400"
                >
                  International
                </span>
              </div>
              <div class="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <span class="font-medium text-primary">{{ exp.company }}</span>
                <span class="text-muted-foreground">{{ exp.location }}</span>
              </div>
              <p class="mb-4 text-sm text-muted-foreground">
                {{ exp.description }}
              </p>
              <ul class="mb-4 space-y-1.5">
                <li
                  v-for="highlight in exp.highlights"
                  :key="highlight"
                  class="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span class="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/70" />
                  <span>{{ highlight }}</span>
                </li>
              </ul>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in exp.tech"
                  :key="tech"
                  class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
            <div class="flex-shrink-0 text-right">
              <span class="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
                {{ exp.period }}
              </span>
              <p class="mt-1 text-xs text-muted-foreground">{{ exp.type }}</p>
            </div>
          </div>
        </CardSpotlight>

        <!-- Earlier experiences (collapsed) -->
        <details class="group">
          <summary class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border/50 bg-card/30 px-4 py-3 text-sm font-medium transition-colors hover:bg-card/50">
            <span>View {{ hiddenExperiences.length }} earlier positions</span>
            <svg
              class="h-4 w-4 transition-transform group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div class="mt-4 space-y-4">
            <CardSpotlight
              v-for="exp in hiddenExperiences"
              :key="exp.company + exp.period"
              class="p-5"
              :gradient-color="isDark ? '#262626' : '#e5e5e5'"
            >
              <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div class="flex-1">
                  <h3 class="text-lg font-semibold">{{ exp.title }}</h3>
                  <div class="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span class="font-medium text-primary">{{ exp.company }}</span>
                    <span class="text-muted-foreground">{{ exp.location }}</span>
                  </div>
                  <p class="mb-3 text-sm text-muted-foreground">{{ exp.description }}</p>
                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-for="tech in exp.tech.slice(0, 5)"
                      :key="tech"
                      class="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
                <div class="flex-shrink-0 text-right">
                  <span class="text-sm font-medium text-muted-foreground">{{ exp.period }}</span>
                </div>
              </div>
            </CardSpotlight>
          </div>
        </details>
      </div>

      <!-- Career summary -->
      <div class="mt-12 grid gap-4 sm:grid-cols-3">
        <div class="rounded-xl border border-border/50 bg-card/30 p-4 text-center">
          <div class="text-3xl font-bold text-primary">10+</div>
          <div class="text-sm text-muted-foreground">Years Experience</div>
        </div>
        <div class="rounded-xl border border-border/50 bg-card/30 p-4 text-center">
          <div class="text-3xl font-bold text-primary">3</div>
          <div class="text-sm text-muted-foreground">Countries Worked</div>
        </div>
        <div class="rounded-xl border border-border/50 bg-card/30 p-4 text-center">
          <div class="text-3xl font-bold text-primary">9</div>
          <div class="text-sm text-muted-foreground">Companies</div>
        </div>
      </div>
    </div>
  </section>
</template>
