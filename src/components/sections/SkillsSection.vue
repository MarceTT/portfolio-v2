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
    icon: '🎨',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'NestJS', 'Laravel', 'PHP', 'Express.js', 'REST APIs'],
    icon: '⚙️',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    title: 'Database',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
    icon: '🗃️',
    color: 'bg-purple-500/20 text-purple-400',
  },
  {
    title: 'Cloud & DevOps',
    skills: ['AWS (EC2, S3, CloudFront, RDS)', 'GCP (Cloud Run, Cloud SQL)', 'Docker', 'CI/CD', 'GitHub Actions'],
    icon: '☁️',
    color: 'bg-orange-500/20 text-orange-400',
  },
]
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
            <span class="text-2xl">{{ category.icon }}</span>
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
