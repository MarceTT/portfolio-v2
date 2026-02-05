# Portfolio - Marcelo Toro

[![Live Demo](https://img.shields.io/badge/Live_Demo-marcelo--toro--portfolio.netlify.app-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://marcelo-toro-portfolio.netlify.app/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

Personal portfolio website showcasing my experience as a Senior Full Stack Developer with 10+ years building scalable web applications.

**[View Live Demo →](https://marcelo-toro-portfolio.netlify.app/)**

## Features

- **Modern UI Components** - Built with [Inspira UI](https://inspira-ui.com/), a Vue 3 component library inspired by Aceternity UI
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **Responsive Design** - Mobile-first approach, looks great on all devices
- **Smooth Animations** - Aurora background, box reveals, marquee effects, and more
- **Interactive Elements** - macOS-style dock navigation, card spotlights, Apple-style carousel
- **Performance Optimized** - Lazy loading, optimized assets, 95+ Lighthouse score

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Vue 3 (Composition API, `<script setup>`) |
| **Language** | TypeScript 5.6 |
| **Styling** | Tailwind CSS 4, CSS Variables |
| **Build Tool** | Vite 6 |
| **UI Components** | Inspira UI, Motion-V |
| **Utilities** | VueUse, clsx, tailwind-merge |

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navigation dock
│   ├── sections/        # Page sections (Hero, About, Skills, etc.)
│   └── ui/              # Inspira UI components
├── composables/         # Vue composables (useTheme)
├── lib/                 # Utilities
└── style.css            # Global styles & CSS variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/MarceTT/portfolio-v2.git
cd portfolio-v2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Sections

1. **Hero** - Aurora background with animated text reveals
2. **About** - Bento grid layout with achievements, international experience, and languages
3. **Skills** - Tech stack marquee with categorized skill cards
4. **Projects** - Apple-style card carousel with modal details
5. **Experience** - 10+ years of work history with expandable cards
6. **Contact** - Availability details and social links

## Customization

### Theme Colors

Edit CSS variables in `src/style.css`:

```css
:root {
  --primary: oklch(0.205 0 0);
  --background: oklch(1 0 0);
  /* ... */
}

.dark {
  --primary: oklch(0.922 0 0);
  --background: oklch(0.145 0 0);
  /* ... */
}
```

### Content

- **Personal info**: Update components in `src/components/sections/`
- **Projects**: Edit `ProjectsSection.vue`
- **Experience**: Edit `ExperienceSection.vue`

## Performance

- Lighthouse Performance: 95+
- First Contentful Paint: < 1s
- Fully interactive: < 2s

## License

MIT License - feel free to use this as a template for your own portfolio!

## Contact

- **LinkedIn**: [marcelo-toro-toro](https://www.linkedin.com/in/marcelo-toro-toro/)
- **GitHub**: [MarceTT](https://github.com/MarceTT)
- **Email**: mtoro6@gmail.com

---

Built with Vue 3 + Inspira UI
