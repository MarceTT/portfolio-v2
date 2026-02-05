<script setup lang="ts">
const socialLinks = [
  {
    name: 'LinkedIn',
    handle: 'marcelo-toro-toro',
    href: 'https://www.linkedin.com/in/marcelo-toro-toro/',
    icon: 'linkedin',
    color: 'hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 hover:text-[#0A66C2]',
    primary: true,
  },
  {
    name: 'GitHub',
    handle: 'MarceTT',
    href: 'https://github.com/MarceTT',
    icon: 'github',
    color: 'hover:bg-neutral-500/20 hover:border-neutral-500/30 dark:hover:bg-white/10 dark:hover:border-white/30',
    primary: false,
  },
  {
    name: 'Email',
    handle: 'mtoro6@gmail.com',
    href: 'mailto:mtoro6@gmail.com',
    icon: 'email',
    color: 'hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-500 dark:hover:text-red-400',
    primary: false,
  },
]

const availability = {
  status: 'Available',
  notice: '4-6 weeks',
  locations: ['Spain', 'Ireland', 'Netherlands', 'Germany'],
  visa: 'EU Blue Card eligible',
  modes: ['Remote', 'Hybrid', 'On-site'],
}
</script>

<template>
  <section id="contact" class="relative py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-16 text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Let's Work Together
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Senior Full Stack Developer looking for opportunities in Europe with visa sponsorship
        </p>
      </div>

      <!-- Main Grid -->
      <div class="grid gap-6 md:grid-cols-2">
        
        <!-- Left: Availability Card -->
        <div class="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800 sm:p-8">
          <!-- Status Badge -->
          <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 ring-1 ring-emerald-500/30">
            <span class="relative flex h-2.5 w-2.5">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span class="text-sm font-medium text-emerald-600 dark:text-emerald-400">{{ availability.status }}</span>
          </div>

          <h3 class="mb-6 text-xl font-bold text-foreground">Availability Details</h3>

          <div class="space-y-4">
            <!-- Notice Period -->
            <div class="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-white/10">
              <span class="text-sm text-muted-foreground">Notice Period</span>
              <span class="font-medium text-foreground">{{ availability.notice }}</span>
            </div>

            <!-- Target Locations -->
            <div class="border-b border-neutral-200 pb-4 dark:border-white/10">
              <span class="text-sm text-muted-foreground">Target Locations</span>
              <div class="mt-2 flex flex-wrap gap-2">
                <span 
                  v-for="loc in availability.locations" 
                  :key="loc"
                  class="rounded-md bg-neutral-200/50 px-2.5 py-1 text-xs font-medium text-foreground ring-1 ring-neutral-300/50 dark:bg-white/5 dark:ring-white/10"
                >
                  {{ loc }}
                </span>
              </div>
            </div>

            <!-- Visa Status -->
            <div class="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-white/10">
              <span class="text-sm text-muted-foreground">Visa Status</span>
              <span class="rounded-md bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/30">
                {{ availability.visa }}
              </span>
            </div>

            <!-- Work Mode -->
            <div>
              <span class="text-sm text-muted-foreground">Work Mode</span>
              <div class="mt-2 flex flex-wrap gap-2">
                <span 
                  v-for="mode in availability.modes" 
                  :key="mode"
                  class="rounded-md bg-neutral-200/50 px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-neutral-300/50 dark:bg-white/5 dark:ring-white/10"
                >
                  {{ mode }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Connect Card -->
        <div class="rounded-3xl border border-neutral-200 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6 dark:border-white/10 dark:from-neutral-900 dark:to-neutral-800 sm:p-8">
          <h3 class="mb-6 text-xl font-bold text-foreground">Get in Touch</h3>
          
          <div class="space-y-3">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-100/50 p-4 transition-all duration-300 dark:border-white/10 dark:bg-white/5"
              :class="link.color"
            >
              <!-- Icon -->
              <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-200/50 transition-colors group-hover:bg-neutral-200 dark:bg-white/5 dark:group-hover:bg-white/10">
                <!-- LinkedIn -->
                <svg v-if="link.icon === 'linkedin'" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <!-- GitHub -->
                <svg v-else-if="link.icon === 'github'" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <!-- Email -->
                <svg v-else-if="link.icon === 'email'" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              
              <!-- Text -->
              <div class="flex-1 min-w-0">
                <div class="text-sm font-semibold text-foreground">{{ link.name }}</div>
                <div class="truncate text-sm text-muted-foreground group-hover:text-foreground/80">
                  {{ link.handle }}
                </div>
              </div>

              <!-- Arrow -->
              <svg class="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <!-- Footer note -->
          <p class="mt-6 text-center text-sm text-muted-foreground">
            Prefer LinkedIn for professional inquiries
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
