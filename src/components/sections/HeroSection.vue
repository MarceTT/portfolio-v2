<script setup lang="ts">
import { AuroraBackground } from '@/components/ui/aurora-background'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { BoxReveal } from '@/components/ui/box-reveal'

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  element?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative min-h-screen w-full overflow-hidden">
    <AuroraBackground class="absolute inset-0">
      <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div class="flex flex-col items-center gap-6 text-center">
          <BoxReveal :duration="0.5">
            <span class="rounded-full border border-neutral-300 bg-neutral-200/50 px-4 py-1.5 text-sm font-medium backdrop-blur-sm dark:border-white/20 dark:bg-white/10">
              Senior Full Stack Developer | 10+ Years
            </span>
          </BoxReveal>

          <BoxReveal :duration="0.5" :delay="0.2">
            <h1 class="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Marcelo Toro
            </h1>
          </BoxReveal>

          <BoxReveal :duration="0.5" :delay="0.4">
            <p class="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Building scalable, high-performance web applications. 
              Self-taught by conviction, passionate about clean code and collaborative teams.
            </p>
          </BoxReveal>

          <BoxReveal :duration="0.5" :delay="0.5">
            <div class="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
                Open to Relocation to Europe
              </span>
              <span class="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
                Visa Sponsorship
              </span>
            </div>
          </BoxReveal>

          <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
            <ShimmerButton
              class="shadow-2xl"
              @click="scrollToSection('projects')"
            >
              <span class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg">
                View Projects
              </span>
            </ShimmerButton>

            <button
              class="rounded-full border border-neutral-300 bg-neutral-200/50 px-6 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:bg-neutral-200 dark:border-white/20 dark:bg-white/5 dark:hover:bg-white/10 lg:text-base"
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
