<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import NavigationDock from '@/components/layout/NavigationDock.vue'
import { Marquee } from '@/components/ui/marquee'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>

    <!-- Open to Work Banner -->
    <div class="overflow-hidden border-y border-primary/20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 py-3">
      <Marquee :pause-on-hover="false" class="[--duration:15s]">
        <span class="mx-8 text-sm font-semibold uppercase tracking-widest text-primary">
          Open to Work
        </span>
        <span class="mx-8 text-sm font-semibold uppercase tracking-widest text-purple-500">
          Available for Hire
        </span>
        <span class="mx-8 text-sm font-semibold uppercase tracking-widest text-pink-500">
          Seeking Opportunities in EU
        </span>
        <span class="mx-8 text-sm font-semibold uppercase tracking-widest text-primary">
          Open to Work
        </span>
        <span class="mx-8 text-sm font-semibold uppercase tracking-widest text-purple-500">
          Available for Hire
        </span>
        <span class="mx-8 text-sm font-semibold uppercase tracking-widest text-pink-500">
          Seeking Opportunities in EU
        </span>
      </Marquee>
    </div>

    <NavigationDock />

    <!-- Footer -->
    <footer class="border-t border-border/50 bg-card/30 py-6">
      <div class="text-center">
        <p class="text-sm text-muted-foreground">
          © 2026 Marcelo Toro
        </p>
      </div>
    </footer>
  </div>
</template>
