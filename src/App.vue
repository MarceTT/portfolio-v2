<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ServicesSection from '@/components/sections/ServicesSection.vue'
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
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </main>

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
