<script setup lang="ts">
import { onMounted } from 'vue'
import { Dock, DockIcon, DockSeparator } from '@/components/ui/dock'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme, initTheme } = useTheme()

onMounted(() => {
  // Clear old conflicting keys
  localStorage.removeItem('theme')
  localStorage.removeItem('vueuse-color-scheme')
  
  initTheme()
})

const navItems = [
  { icon: 'home', label: 'Home', href: '#hero' },
  { icon: 'user', label: 'About', href: '#about' },
  { icon: 'code', label: 'Skills', href: '#skills' },
  { icon: 'folder', label: 'Projects', href: '#projects' },
  { icon: 'briefcase', label: 'Experience', href: '#experience' },
  { icon: 'mail', label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: 'github', label: 'GitHub', href: 'https://github.com/MarceTT' },
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/marcelo-toro-toro/' },
]

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  element?.scrollIntoView({ behavior: 'smooth' })
}

const getIconPath = (icon: string) => {
  const icons: Record<string, string> = {
    home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    folder: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
    briefcase: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22',
    linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z',
  }
  return icons[icon] || icons.home
}
</script>

<template>
  <div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
    <Dock
      direction="middle"
      class="rounded-full border border-border/50 bg-background/80 px-4 shadow-xl backdrop-blur-md"
    >
      <!-- Navigation Items -->
      <DockIcon
        v-for="item in navItems"
        :key="item.label"
        class="cursor-pointer rounded-full bg-transparent p-2.5 transition-colors hover:bg-muted"
        :title="item.label"
        @click="scrollToSection(item.href)"
      >
        <svg
          class="h-5 w-5 text-foreground/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath(item.icon)" />
        </svg>
      </DockIcon>

      <DockSeparator />

      <!-- Social Links - Wrapped in <a> tags -->
      <DockIcon
        v-for="link in socialLinks"
        :key="link.label"
        class="cursor-pointer rounded-full bg-transparent p-2.5 transition-colors hover:bg-muted"
        :title="link.label"
      >
        <a
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center"
        >
          <svg
            class="h-5 w-5 text-foreground/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="getIconPath(link.icon)" />
          </svg>
        </a>
      </DockIcon>

      <DockSeparator />

      <!-- Dark/Light Mode Toggle -->
      <DockIcon
        class="cursor-pointer rounded-full bg-transparent p-2.5 transition-colors hover:bg-muted"
        :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        @click="toggleTheme"
      >
        <!-- Sun icon (shown in dark mode) -->
        <svg
          v-if="isDark"
          class="h-5 w-5 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
        <!-- Moon icon (shown in light mode) -->
        <svg
          v-else
          class="h-5 w-5 text-foreground/70"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </DockIcon>
    </Dock>
  </div>
</template>
