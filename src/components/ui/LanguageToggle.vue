<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { locale, toggleLocale, t } = useI18n()
</script>

<template>
  <button
    type="button"
    class="group relative flex h-8 items-center gap-1 rounded-full border border-border/50 bg-background/80 px-3 text-xs font-medium text-foreground/70 backdrop-blur-sm transition-all hover:border-border hover:bg-muted hover:text-foreground"
    :aria-label="t('language.label')"
    @click="toggleLocale"
  >
    <!-- Globe Icon -->
    <svg
      class="h-3.5 w-3.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="1.5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418"
      />
    </svg>
    
    <!-- Current Locale -->
    <span class="uppercase">{{ locale }}</span>
    
    <!-- Switch Indicator -->
    <svg
      class="h-3 w-3 transition-transform group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </button>
</template>
