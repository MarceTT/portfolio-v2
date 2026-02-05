<script setup lang="ts">
import { ref } from 'vue'

const avatarHovered = ref(false)

const achievements = [
  { 
    value: '830K+', 
    label: 'Emails Processed', 
    description: 'High-volume email system with 94.61% delivery rate',
    icon: '📧',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  { 
    value: '40%', 
    label: 'Faster Load Time', 
    description: 'Performance boost with SSR + CloudFront CDN',
    icon: '⚡',
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  { 
    value: '4x', 
    label: 'API Speed Boost', 
    description: 'Optimized from 800ms to 200ms response time',
    icon: '🚀',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  { 
    value: '300%', 
    label: 'Traffic Growth', 
    description: 'Organic traffic increase via technical SEO',
    icon: '📈',
    color: 'from-green-500/20 to-emerald-500/20'
  },
]

const internationalExp = [
  { country: 'Chile', flag: '🇨🇱', role: 'Native' },
  { country: 'New Zealand', flag: '🇳🇿', role: '1 year' },
  { country: 'Canada', flag: '🇨🇦', role: '8 months' },
]

const languages = [
  { lang: 'Spanish', level: 'Native', flag: '🇪🇸', percent: 100 },
  { lang: 'English', level: 'B1-B2', flag: '🇬🇧', percent: 70 },
  { lang: 'Italian', level: 'A2', flag: '🇮🇹', percent: 30 },
]
</script>

<template>
  <section id="about" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          About Me
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          10+ years solving complex problems with clean code
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[auto_auto_auto] lg:gap-6">
        
        <!-- Main Bio Card - Spans 4 columns -->
        <div 
          class="group relative col-span-1 row-span-1 overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 transition-all duration-500 hover:border-neutral-300 hover:shadow-2xl hover:shadow-primary/5 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800 dark:hover:border-white/20 md:col-span-4 md:p-8"
        >
          <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
            <!-- Avatar with hover effect -->
            <div 
              class="relative flex-shrink-0"
              @mouseenter="avatarHovered = true"
              @mouseleave="avatarHovered = false"
            >
              <div 
                class="relative h-28 w-28 overflow-hidden rounded-2xl transition-all duration-500 sm:h-32 sm:w-32"
                :class="avatarHovered ? 'scale-105 rotate-3' : ''"
              >
                <!-- Gradient border effect -->
                <div class="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500 opacity-75 blur transition-all duration-500 group-hover:opacity-100" />
                <div class="relative h-full w-full overflow-hidden rounded-2xl border-2 border-neutral-200 dark:border-neutral-800">
                  <img
                    src="/images/profile.jpeg"
                    alt="Marcelo Toro"
                    class="h-full w-full object-cover transition-transform duration-500"
                    :class="avatarHovered ? 'scale-110' : ''"
                  />
                </div>
              </div>
              <!-- Status badge -->
              <div class="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-600 ring-1 ring-green-500/30 dark:text-green-400">
                <span class="h-2 w-2 animate-pulse rounded-full bg-green-500 dark:bg-green-400" />
                Available
              </div>
            </div>

            <!-- Bio text -->
            <div class="flex-1">
              <h3 class="text-xl font-bold text-foreground sm:text-2xl">
                Marcelo Toro
              </h3>
              <p class="mt-1 text-sm font-medium text-primary">
                Senior Full Stack Developer
              </p>
              <p class="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Self-taught by conviction with <span class="text-foreground font-medium">10+ years of experience</span> building scalable, high-performance web applications. 
                Passionate about solving complex problems, writing clean code, and collaborating with teams where everyone learns and grows together.
              </p>
              
              <!-- Quick tech tags -->
              <div class="mt-4 flex flex-wrap gap-2">
                <span 
                  v-for="tech in ['React', 'Next.js', 'Vue', 'Node.js', 'TypeScript', 'AWS']"
                  :key="tech"
                  class="rounded-md bg-neutral-200/50 px-2 py-1 text-xs text-neutral-600 ring-1 ring-neutral-300/50 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:bg-white/5 dark:text-neutral-400 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- International Experience Card - Spans 2 columns -->
        <div 
          class="group relative col-span-1 overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 transition-all duration-500 hover:border-neutral-300 hover:shadow-2xl hover:shadow-primary/5 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800 dark:hover:border-white/20 md:col-span-2"
        >
          <div class="mb-4 flex items-center gap-2">
            <span class="text-2xl">🌍</span>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              International
            </h3>
          </div>
          <div class="space-y-3">
            <div 
              v-for="exp in internationalExp" 
              :key="exp.country"
              class="flex items-center justify-between rounded-xl bg-neutral-200/50 px-3 py-2 transition-all hover:bg-neutral-200 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ exp.flag }}</span>
                <span class="text-sm font-medium text-foreground">{{ exp.country }}</span>
              </div>
              <span class="text-xs text-muted-foreground">{{ exp.role }}</span>
            </div>
          </div>
        </div>

        <!-- Achievement Cards - 4 cards with better visual hierarchy -->
        <div 
          v-for="(achievement, index) in achievements"
          :key="achievement.label"
          class="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-5 transition-all duration-500 hover:border-neutral-300 hover:shadow-2xl hover:shadow-primary/5 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800 dark:hover:border-white/20 md:col-span-1"
          :class="index === 0 ? 'md:col-start-1' : ''"
        >
          <!-- Colored glow effect on hover -->
          <div 
            class="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            :class="achievement.color"
          />
          
          <div class="relative">
            <!-- Icon + Value row -->
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ achievement.icon }}</span>
              <div class="text-2xl font-bold text-foreground sm:text-3xl">
                {{ achievement.value }}
              </div>
            </div>
            <!-- Label -->
            <div class="mt-2 text-sm font-semibold text-foreground">
              {{ achievement.label }}
            </div>
            <!-- Description -->
            <div class="mt-1 text-xs leading-relaxed text-muted-foreground">
              {{ achievement.description }}
            </div>
          </div>
        </div>

        <!-- Languages Card - Spans 2 columns -->
        <div 
          class="group relative col-span-1 overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 transition-all duration-500 hover:border-neutral-300 hover:shadow-2xl hover:shadow-primary/5 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800 dark:hover:border-white/20 md:col-span-2"
        >
          <div class="mb-4 flex items-center gap-2">
            <span class="text-2xl">💬</span>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Languages
            </h3>
          </div>
          <div class="space-y-3">
            <div 
              v-for="lang in languages" 
              :key="lang.lang"
              class="space-y-1"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span>{{ lang.flag }}</span>
                  <span class="text-sm font-medium text-foreground">{{ lang.lang }}</span>
                </div>
                <span class="text-xs text-muted-foreground">{{ lang.level }}</span>
              </div>
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
                <div 
                  class="h-full rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000"
                  :style="{ width: `${lang.percent}%` }"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Open to Relocate Card -->
        <div 
          class="group relative col-span-1 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-neutral-50 to-neutral-100 p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 dark:via-neutral-900 dark:to-neutral-800 md:col-span-2"
        >
          <!-- Animated gradient background -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 opacity-50" />
          
          <div class="relative flex h-full flex-col justify-between">
            <div>
              <div class="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
                <span class="text-base">✈️</span>
                Open to Opportunities
              </div>
              <h3 class="mt-3 text-lg font-bold text-foreground sm:text-xl">
                Looking to Relocate
              </h3>
              <p class="mt-2 text-sm text-muted-foreground">
                Seeking opportunities in <span class="font-medium text-foreground">Spain</span> or the <span class="font-medium text-foreground">European Union</span> with visa sponsorship.
              </p>
            </div>
            <div class="mt-4 flex items-center gap-2">
              <span class="text-2xl">🇪🇺</span>
              <span class="text-2xl">🇪🇸</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
