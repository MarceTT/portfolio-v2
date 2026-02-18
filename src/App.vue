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
    <footer class="border-t border-border/50 bg-card/30 py-16">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <!-- CTA Section -->
        <div class="mb-12 text-center">
          <h2 class="text-2xl font-bold sm:text-3xl md:text-4xl">
            From Idea to Execution
          </h2>
          <p class="mt-2 text-xl font-semibold text-primary sm:text-2xl">
            Let's Build Something Real!
          </p>
          <p class="mx-auto mt-4 max-w-xl text-muted-foreground">
            I focus on shipping clean, scalable web solutions that support real users and growing products.
          </p>
          <a
            href="mailto:mtoro6@gmail.com"
            class="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
          >
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Get in Touch
          </a>
        </div>

        <!-- Links Grid -->
        <div class="grid gap-8 border-t border-border/50 pt-8 sm:grid-cols-3">
          <!-- Brand -->
          <div>
            <h3 class="text-lg font-bold">Marcelo Toro</h3>
            <p class="mt-2 text-sm text-muted-foreground">
              Senior Full Stack Developer with 10+ years building scalable web applications.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Navigation</h4>
            <ul class="mt-3 space-y-2">
              <li><a href="#hero" class="text-sm text-foreground/70 transition-colors hover:text-foreground">Home</a></li>
              <li><a href="#about" class="text-sm text-foreground/70 transition-colors hover:text-foreground">About</a></li>
              <li><a href="#projects" class="text-sm text-foreground/70 transition-colors hover:text-foreground">Projects</a></li>
              <li><a href="#experience" class="text-sm text-foreground/70 transition-colors hover:text-foreground">Experience</a></li>
              <li><a href="#contact" class="text-sm text-foreground/70 transition-colors hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <!-- Connect -->
          <div>
            <h4 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Connect</h4>
            <ul class="mt-3 space-y-2">
              <li>
                <a href="https://linkedin.com/in/marcelo-toro-toro" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground">
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/MarceTT" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground">
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="mailto:mtoro6@gmail.com" class="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground">
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  mtoro6@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="mt-8 border-t border-border/50 pt-8 text-center">
          <p class="text-sm text-muted-foreground">
            © {{ new Date().getFullYear() }} Marcelo Toro. Built with Vue 3 + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
