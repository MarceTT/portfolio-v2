<script setup lang="ts">
import { AppleCardCarousel, AppleCarouselItem, AppleCard } from '@/components/ui/apple-card-carousel'

// Proyectos con imágenes reales
// NOTA: Reemplazá estas URLs con las URLs finales de tus imágenes
const projects = [
  {
    id: 1,
    card: {
      src: '/images/projects/nurturing.png',
      title: 'Nurturing CRM',
      category: 'Email Marketing Platform',
    },
    description: 'Custom CRM platform with automated email marketing workflows and high-volume distributed processing for Defensoría del Deudor.',
    problem: 'The client needed a system capable of sending massive email campaigns to hundreds of thousands of recipients with high deliverability and real-time analytics.',
    solution: 'Architected a distributed system with 20 parallel workers, Redis queues, and intelligent circuit breakers to handle failures gracefully.',
    metrics: [
      { label: 'Emails/Campaign', value: '830,013' },
      { label: 'Delivery Rate', value: '94.61%' },
      { label: 'Open Rate', value: '14.82%' },
      { label: 'Parallel Workers', value: '20' },
    ],
    highlights: [
      'Distributed system processing 789,000+ emails per campaign',
      'Idempotency system with Redis locks ensuring zero duplicate sends',
      'Intelligent circuit breaker for SMTP provider failures',
      'Auto-recovery system for stalled pipeline stages',
      'Fixed browser OOM issues handling 350,000+ records',
    ],
    tech: ['Laravel 12', 'React 19', 'TypeScript', 'PostgreSQL', 'Redis', 'GCP', 'Docker', 'Zustand', 'TanStack Query'],
    link: null,
    github: 'https://github.com/MarceTT',
    year: '2024 - Present',
  },
  {
    id: 2,
    card: {
      src: '/images/projects/matchmycourse.png',
      title: 'MatchMyCourse',
      category: 'Educational Marketplace',
    },
    description: 'Full-stack educational marketplace connecting students with English courses in Ireland and New Zealand.',
    problem: 'Students struggled to find and compare English language courses across different countries, schools, and price ranges.',
    solution: 'Built an end-to-end platform with advanced search, filtering, and SEO optimization to help students discover the perfect course.',
    metrics: [
      { label: 'Monthly Users', value: '5,000+' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'API Response', value: '<200ms' },
      { label: 'Traffic Growth', value: '300%' },
    ],
    highlights: [
      'Architected full platform from scratch with Next.js 15',
      'Reduced page load time by 40% with SSR + CloudFront CDN',
      'API response optimization from 800ms to 200ms',
      'ISR implementation for 500+ school pages',
      '95+ Lighthouse performance score',
    ],
    tech: ['Next.js 15', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS S3', 'CloudFront', 'Tailwind CSS'],
    link: 'https://matchmycourse.com',
    github: 'https://github.com/MarceTT',
    year: '2025',
  },
  {
    id: 3,
    card: {
      src: '/images/projects/back_office.png',
      title: 'Cable Color Back Office',
      category: 'Enterprise Management System',
    },
    description: 'Complete migration of legacy back office system to modern tech stack for a telecom company with 6 regional branches.',
    problem: 'Legacy system was slow, difficult to maintain, and couldn\'t scale to support the growing sales team across multiple locations.',
    solution: 'Led full migration to Laravel + React, implementing modern UI/UX patterns and real-time data synchronization.',
    metrics: [
      { label: 'Load Time', value: '-60%' },
      { label: 'Productivity', value: '+40%' },
      { label: 'Branches', value: '6' },
      { label: 'Team Size', value: '4 devs' },
    ],
    highlights: [
      'Reduced page load times by ~60%',
      'Improved sales team productivity by ~40%',
      'Custom APIs with JWT serving 6 branches real-time',
      'Responsive dashboard for mobile field access',
      'Led 4-developer team delivering on schedule',
    ],
    tech: ['Laravel 10', 'React 18', 'TypeScript', 'Redux', 'TanStack Query', 'MySQL', 'Tailwind CSS', 'JWT'],
    link: null,
    github: 'https://github.com/MarceTT',
    year: '2024',
  },
  {
    id: 4,
    card: {
      src: '/images/projects/pasajes.png',
      title: 'Chile Pasajes',
      category: 'Travel Booking Platform',
    },
    description: 'Bus ticket booking platform serving 2,000+ destinations across Chile and Argentina.',
    problem: 'The platform needed modern backend architecture and improved performance to handle high traffic during peak travel seasons.',
    solution: 'Developed advanced Laravel Nova features, implemented caching strategies, and built custom Vue.js tools for the admin panel.',
    metrics: [
      { label: 'Destinations', value: '2,000+' },
      { label: 'Countries', value: '2' },
      { label: 'Cache Hit', value: '95%' },
      { label: 'Response', value: '<300ms' },
    ],
    highlights: [
      'Advanced features with Laravel Nova 4',
      'Custom Vue.js tools for admin panel',
      'JWT, Laravel Spatie, Laravel Excel integrations',
      'Redis caching for optimal performance',
      'Database optimization with query caching',
    ],
    tech: ['Laravel 11', 'PHP 8.3', 'Vue.js', 'Laravel Nova', 'MySQL', 'Redis', 'Tailwind CSS'],
    link: 'https://chilepasajes.cl',
    github: 'https://github.com/MarceTT',
    year: '2024',
  },
]
</script>

<template>
  <section id="projects" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Featured Projects
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          Real-world impact through code — click to see details
        </p>
      </div>

      <AppleCardCarousel>
        <AppleCarouselItem
          v-for="(project, index) in projects"
          :key="project.id"
          :index="index"
        >
          <AppleCard
            :card="project.card"
            :index="project.id"
          >
            <!-- Modal Content -->
            <div class="space-y-8">
              <!-- Description -->
              <div>
                <p class="text-lg text-neutral-600 dark:text-neutral-300">
                  {{ project.description }}
                </p>
                <span class="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {{ project.year }}
                </span>
              </div>

              <!-- Problem & Solution -->
              <div class="grid gap-6 md:grid-cols-2">
                <div class="rounded-xl bg-red-50 p-6 dark:bg-red-950/30">
                  <h4 class="mb-2 flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    The Problem
                  </h4>
                  <p class="text-sm text-red-600 dark:text-red-300">{{ project.problem }}</p>
                </div>
                <div class="rounded-xl bg-green-50 p-6 dark:bg-green-950/30">
                  <h4 class="mb-2 flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    The Solution
                  </h4>
                  <p class="text-sm text-green-600 dark:text-green-300">{{ project.solution }}</p>
                </div>
              </div>

              <!-- Metrics -->
              <div>
                <h4 class="mb-4 font-semibold text-neutral-800 dark:text-neutral-200">Key Metrics</h4>
                <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div
                    v-for="metric in project.metrics"
                    :key="metric.label"
                    class="rounded-xl border border-neutral-200 bg-white p-4 text-center dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <div class="text-2xl font-bold text-primary">{{ metric.value }}</div>
                    <div class="text-xs text-neutral-500 dark:text-neutral-400">{{ metric.label }}</div>
                  </div>
                </div>
              </div>

              <!-- Highlights -->
              <div>
                <h4 class="mb-4 font-semibold text-neutral-800 dark:text-neutral-200">Highlights</h4>
                <ul class="space-y-2">
                  <li
                    v-for="highlight in project.highlights"
                    :key="highlight"
                    class="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300"
                  >
                    <svg class="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{ highlight }}
                  </li>
                </ul>
              </div>

              <!-- Tech Stack -->
              <div>
                <h4 class="mb-4 font-semibold text-neutral-800 dark:text-neutral-200">Tech Stack</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tech in project.tech"
                    :key="tech"
                    class="rounded-full bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Links -->
              <div class="flex flex-wrap gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-700">
                <a
                  v-if="project.link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Live Site
                </a>
                <a
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View on GitHub
                </a>
              </div>
            </div>
          </AppleCard>
        </AppleCarouselItem>
      </AppleCardCarousel>

      <!-- CTA to GitHub -->
      <div class="mt-16 text-center">
        <a
          href="https://github.com/MarceTT"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-6 py-3 font-medium transition-all hover:border-primary/50 hover:bg-card"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          View all projects on GitHub
        </a>
      </div>
    </div>
  </section>
</template>
