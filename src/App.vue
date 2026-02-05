<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import NavigationDock from '@/components/layout/NavigationDock.vue'
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

    <NavigationDock />

    <!-- Footer -->
    <footer class="border-t border-border/50 py-8 text-center">
      <p class="text-sm text-muted-foreground">
        {{ new Date().getFullYear() }} Marcelo Toro. Hecho con Vue 3 + Inspira UI
      </p>
    </footer>
  </div>
</template>
