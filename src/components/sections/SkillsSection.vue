<script setup lang="ts">
import { Marquee } from '@/components/ui/marquee'

// Tech icons con URLs de Simple Icons (CDN)
const frontendTech = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF', color: '#FFFFFF' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E', color: '#F7DF1E' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D', color: '#4FC08D' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', color: '#06B6D4' },
]

const backendTech = [
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', color: '#5FA04E' },
  { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E', color: '#E0234E' },
  { name: 'Laravel', icon: 'https://cdn.simpleicons.org/laravel/FF2D20', color: '#FF2D20' },
  { name: 'PHP', icon: 'https://cdn.simpleicons.org/php/777BB4', color: '#777BB4' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/FFFFFF', color: '#FFFFFF' },
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#4169E1' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248', color: '#47A248' },
  { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/DC382D', color: '#DC382D' },
]

const devopsTech = [
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/FF9900', color: '#FF9900' },
  { name: 'Google Cloud', icon: 'https://cdn.simpleicons.org/googlecloud/4285F4', color: '#4285F4' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED' },
  { name: 'GitHub Actions', icon: 'https://cdn.simpleicons.org/githubactions/2088FF', color: '#2088FF' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', color: '#F05032' },
  { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1', color: '#4479A1' },
]

const skillCategories = [
  {
    title: 'Frontend',
    skills: ['React', 'Next.js 15', 'TypeScript', 'JavaScript', 'Vue.js', 'Tailwind CSS'],
    icon: 'frontend',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'NestJS', 'Laravel', 'PHP', 'Express.js', 'REST APIs'],
    icon: 'backend',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    icon: 'database',
    color: 'bg-purple-500/20 text-purple-400',
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3, CloudFront, RDS)', 'GCP (Cloud Run, Cloud SQL)', 'Docker', 'CI/CD', 'GitHub Actions'],
    icon: 'cloud',
    color: 'bg-orange-500/20 text-orange-400',
  },
]

const getIconPath = (icon: string) => {
  const icons: Record<string, string> = {
    frontend: 'M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42',
    backend: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    database: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
    cloud: 'M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z',
  }
  return icons[icon] || icons.frontend
}
</script>

<template>
  <section id="skills" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Tech Stack
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          Technologies I work with daily
        </p>
      </div>

      <!-- Tech Marquee -->
      <div class="relative mb-16 overflow-hidden rounded-2xl border border-border/50 bg-card/30 py-8">
        <!-- First row - Frontend -->
        <Marquee pause-on-hover class="[--duration:30s]">
          <div
            v-for="tech in frontendTech"
            :key="tech.name"
            class="mx-4 flex items-center gap-3 rounded-full border border-border/50 bg-background/80 px-5 py-2.5 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background"
          >
            <img :src="tech.icon" :alt="tech.name" class="h-6 w-6" />
            <span class="font-medium">{{ tech.name }}</span>
          </div>
        </Marquee>

        <!-- Second row - Backend (reverse) -->
        <Marquee reverse pause-on-hover class="mt-4 [--duration:35s]">
          <div
            v-for="tech in backendTech"
            :key="tech.name"
            class="mx-4 flex items-center gap-3 rounded-full border border-border/50 bg-background/80 px-5 py-2.5 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background"
          >
            <img :src="tech.icon" :alt="tech.name" class="h-6 w-6" />
            <span class="font-medium">{{ tech.name }}</span>
          </div>
        </Marquee>

        <!-- Third row - DevOps -->
        <Marquee pause-on-hover class="mt-4 [--duration:25s]">
          <div
            v-for="tech in devopsTech"
            :key="tech.name"
            class="mx-4 flex items-center gap-3 rounded-full border border-border/50 bg-background/80 px-5 py-2.5 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-background"
          >
            <img :src="tech.icon" :alt="tech.name" class="h-6 w-6" />
            <span class="font-medium">{{ tech.name }}</span>
          </div>
        </Marquee>

        <!-- Gradient overlays -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card/80 to-transparent" />
        <div class="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-card/80 to-transparent" />
      </div>

      <!-- Skill Categories Grid -->
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="category in skillCategories"
          :key="category.title"
          class="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80"
        >
          <div class="mb-4 flex items-center gap-3">
            <svg class="h-5 w-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath(category.icon)" />
            </svg>
            <h3 class="text-lg font-semibold">{{ category.title }}</h3>
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in category.skills"
              :key="skill"
              :class="['rounded-full px-3 py-1 text-sm font-medium', category.color]"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
