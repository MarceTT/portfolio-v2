import { ref } from 'vue'

const STORAGE_KEY = 'portfolio-theme'

// Check initial state from DOM (set by inline script in index.html)
const getInitialDark = () => {
  if (typeof document !== 'undefined') {
    return document.documentElement.classList.contains('dark')
  }
  return true
}

// Global reactive state - initialized from DOM
const isDark = ref(getInitialDark())

const applyTheme = () => {
  if (typeof document !== 'undefined') {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    console.log('Theme applied:', isDark.value ? 'dark' : 'light', '| HTML class:', document.documentElement.className)
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }
  applyTheme()
}

const initTheme = () => {
  // Sync ref with DOM state (in case it changed)
  if (typeof document !== 'undefined') {
    isDark.value = document.documentElement.classList.contains('dark')
  }
}

export function useTheme() {
  return {
    isDark,
    toggleTheme,
    initTheme,
  }
}
