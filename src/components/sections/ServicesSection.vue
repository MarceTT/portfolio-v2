<script setup lang="ts">
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { BoxReveal } from '@/components/ui/box-reveal'
import { useI18n } from '@/composables/useI18n'
import type { ServiceItem } from '@/i18n/es'

const { t, tRaw } = useI18n()

// Get services from translations
const services = tRaw<ServiceItem[]>('services.items')

// Icon paths (Heroicons outline)
const DEFAULT_ICON = 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5' // code bracket

const getIconPath = (serviceId: string): string => {
  const icons: Record<string, string> = {
    'custom-software': 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5', // code bracket
    'automations': 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495', // cog/settings
    'consulting': 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18', // lightbulb
  }
  return icons[serviceId] ?? DEFAULT_ICON
}

// Scroll to contact section
const scrollToContact = (): void => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="services" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <BoxReveal :delay="0.1">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {{ t('services.title') }}
          </h2>
        </BoxReveal>
        <BoxReveal :delay="0.2">
          <p class="mt-4 text-lg text-muted-foreground">
            {{ t('services.subtitle') }}
          </p>
        </BoxReveal>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <CardSpotlight
          v-for="(service, index) in services"
          :key="service.id"
          class="h-full border-border/50"
          slot-class="flex h-full flex-col p-6 sm:p-8"
          :gradient-color="index === 0 ? '#3b82f6' : index === 1 ? '#8b5cf6' : '#f59e0b'"
          :gradient-opacity="0.15"
        >
          <BoxReveal :delay="0.1 + index * 0.1">
            <!-- Icon -->
            <div 
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              :class="[
                index === 0 ? 'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20' : '',
                index === 1 ? 'bg-purple-500/10 text-purple-500 dark:bg-purple-500/20' : '',
                index === 2 ? 'bg-amber-500/10 text-amber-500 dark:bg-amber-500/20' : '',
              ]"
            >
              <svg 
                class="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                stroke-width="1.5"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  :d="getIconPath(service.id)" 
                />
              </svg>
            </div>
          </BoxReveal>

          <BoxReveal :delay="0.15 + index * 0.1">
            <!-- Title -->
            <h3 class="text-xl font-bold text-foreground sm:text-2xl">
              {{ service.title }}
            </h3>
          </BoxReveal>

          <BoxReveal :delay="0.2 + index * 0.1">
            <!-- Description -->
            <p class="mt-3 text-sm text-muted-foreground sm:text-base">
              {{ service.description }}
            </p>
          </BoxReveal>

          <!-- Features List -->
          <BoxReveal :delay="0.25 + index * 0.1">
            <ul class="mt-6 flex-1 space-y-3">
              <li 
                v-for="feature in service.features" 
                :key="feature"
                class="flex items-start gap-2 text-sm text-foreground/80"
              >
                <svg 
                  class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  stroke-width="2"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    d="M4.5 12.75l6 6 9-13.5" 
                  />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </BoxReveal>

          <!-- CTA Button -->
          <BoxReveal :delay="0.3 + index * 0.1">
            <button
              type="button"
              class="mt-8 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              @click="scrollToContact"
            >
              {{ service.cta }}
            </button>
          </BoxReveal>
        </CardSpotlight>
      </div>
    </div>
  </section>
</template>
