<script setup lang="ts">
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { BoxReveal } from '@/components/ui/box-reveal'
import { Marquee } from '@/components/ui/marquee'

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: 'smooth' })
}

const valueProps = [
  'Scalable',
  'High-Performance',
  'Clean Code',
  'User-Focused',
  'SEO-Ready',
  'Production-Ready',
  'Well-Documented',
  'Maintainable',
]
</script>

<template>
  <section id="hero" class="relative min-h-screen w-full overflow-hidden">
    <AuroraBackground class="absolute inset-0">
      <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div class="flex flex-col items-center gap-6 text-center">
          <BoxReveal :duration="0.5">
            <span class="rounded-full border border-neutral-400 bg-neutral-200/50 px-4 py-1.5 text-sm font-medium text-neutral-800 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:text-white">
              Senior Full Stack Developer | 10+ Years
            </span>
          </BoxReveal>

          <BoxReveal :duration="0.5" :delay="0.2">
            <h1 class="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              I build products that
            </h1>
          </BoxReveal>

          <BoxReveal :duration="0.5" :delay="0.3">
            <span class="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              deliver real impact
            </span>
          </BoxReveal>

          <BoxReveal :duration="0.5" :delay="0.4">
            <p class="mt-2 text-lg text-neutral-700 dark:text-white/70 sm:text-xl">
              Hello, I'm <span class="font-semibold text-neutral-900 dark:text-white">Marcelo Toro</span>
            </p>
          </BoxReveal>

          <!-- Value Propositions Marquee -->
          <BoxReveal :duration="0.5" :delay="0.5">
            <div class="mt-2 w-full max-w-2xl overflow-hidden rounded-full border border-neutral-300 bg-neutral-100/50 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <Marquee :pause-on-hover="false" class="py-2 [--duration:20s]">
                <span
                  v-for="prop in valueProps"
                  :key="prop"
                  class="mx-3 flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-white/80"
                >
                  <svg class="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  {{ prop }}
                </span>
              </Marquee>
            </div>
          </BoxReveal>

          <BoxReveal :duration="0.5" :delay="0.6">
            <div class="mt-2 flex flex-wrap items-center justify-center gap-2">
              <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Open to Relocation to Europe
              </span>
              <span class="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-700 dark:text-blue-300">
                Visa Sponsorship
              </span>
            </div>
          </BoxReveal>

          <div class="mt-4 flex flex-wrap items-center justify-center gap-4">
            <ShimmerButton
              class="shadow-2xl"
              @click="scrollToSection('projects')"
            >
              <span class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                View Projects
              </span>
            </ShimmerButton>

            <button
              class="rounded-full border border-neutral-400 bg-neutral-200/50 px-6 py-3 text-sm font-medium text-neutral-800 backdrop-blur-sm transition-all hover:bg-neutral-300/50 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 lg:text-base"
              @click="scrollToSection('contact')"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </AuroraBackground>
  </section>
</template>
