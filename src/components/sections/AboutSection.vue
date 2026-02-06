<script setup lang="ts">
import { ref } from 'vue'

const avatarHovered = ref(false)

const achievements = [
  { 
    value: '830K+', 
    label: 'Emails Processed', 
    description: 'High-volume email system with 94.61% delivery rate',
    icon: 'mail',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  { 
    value: '40%', 
    label: 'Faster Load Time', 
    description: 'Performance boost with SSR + CloudFront CDN',
    icon: 'bolt',
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  { 
    value: '4x', 
    label: 'API Speed Boost', 
    description: 'Optimized from 800ms to 200ms response time',
    icon: 'rocket',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  { 
    value: '300%', 
    label: 'Traffic Growth', 
    description: 'Organic traffic increase via technical SEO',
    icon: 'chart',
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

const getIconPath = (icon: string) => {
  const icons: Record<string, string> = {
    mail: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    bolt: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    rocket: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
    chart: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
    globe: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418',
    chat: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z',
    plane: 'M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5',
  }
  return icons[icon] || icons.mail
}
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
            <svg class="h-5 w-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath('globe')" />
            </svg>
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
              <svg class="h-6 w-6 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath(achievement.icon)" />
              </svg>
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
            <svg class="h-5 w-5 text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath('chat')" />
            </svg>
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
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath('plane')" />
                </svg>
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
