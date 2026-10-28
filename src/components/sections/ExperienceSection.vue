<script setup lang="ts">
import { computed } from 'vue'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/composables/useI18n'
import { experiences, VISIBLE_EXPERIENCE_COUNT } from '@/data/experience'
import type { ExperienceCopy, MetricItem } from '@/i18n'

const { isDark } = useTheme()
const { t, tRaw, formatMonthYear } = useI18n()

// Join each role with its translated copy and build the localized period and type lines
const localizedExperiences = computed(() => {
  const copy = tRaw<ExperienceCopy[]>('experience.items')

  return experiences.map((experience) => {
    const text = copy.find((item) => item.id === experience.id)
    const end = experience.end ? formatMonthYear(experience.end) : t('experience.present')

    return {
      ...experience,
      title: text?.title ?? experience.company,
      location: text?.location ?? '',
      description: text?.description ?? '',
      highlights: text?.highlights ?? [],
      period: `${formatMonthYear(experience.start)} - ${end}`,
      type: `${t(`experience.employment.${experience.employment}`)} · ${t(`experience.workMode.${experience.workMode}`)}`,
    }
  })
})

const visibleExperiences = computed(() => localizedExperiences.value.slice(0, VISIBLE_EXPERIENCE_COUNT))
const hiddenExperiences = computed(() => localizedExperiences.value.slice(VISIBLE_EXPERIENCE_COUNT))
const summary = computed(() => tRaw<MetricItem[]>('experience.summary'))
</script>

<template>
  <section id="experience" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {{ t('experience.title') }}
        </h2>
        <p class="mt-4 text-lg text-muted-foreground">
          {{ t('experience.subtitle') }}
        </p>
      </div>

      <div class="space-y-6">
        <!-- Main experiences -->
        <CardSpotlight
          v-for="exp in visibleExperiences"
          :key="exp.id"
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
                  {{ t('experience.international') }}
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
            <span>{{ t('experience.viewEarlier', { count: hiddenExperiences.length }) }}</span>
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
              :key="exp.id"
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
        <div
          v-for="item in summary"
          :key="item.label"
          class="rounded-xl border border-border/50 bg-card/30 p-4 text-center"
        >
          <div class="text-3xl font-bold text-primary">{{ item.value }}</div>
          <div class="text-sm text-muted-foreground">{{ item.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
