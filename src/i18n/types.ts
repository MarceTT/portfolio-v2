// The translation contract.
//
// These types describe the shape every locale must have. The content itself comes
// from src/content/content.json, which is produced by the admin and validated with
// Zod before it is written, so this file stays purely structural.

export type Locale = 'es' | 'en'

export type ServiceItem = {
  id: string
  title: string
  description: string
  features: string[]
  cta: string
}

export type MetricItem = {
  value: string
  label: string
}

export type LanguageItem = {
  name: string
  level: string
}

export type ServiceOption = {
  value: string
  label: string
}

// Translatable copy for a skill category. `id` matches an entry in src/data/skills.ts,
// which owns the non-translatable part (icon, colors, technology names).
export type SkillCategoryCopy = {
  id: string
  title: string
}

// Translatable copy for one role. `id` matches an entry in src/data/experience.ts,
// which owns dates, company name, work mode and tech stack.
export type ExperienceCopy = {
  id: string
  title: string
  location: string
  description: string
  highlights: string[]
}

// Translatable copy for one case study. `id` matches an entry in
// src/data/projects.ts, which owns the image, tech stack, links and metric values.
export type ProjectCopy = {
  id: string
  title: string
  category: string
  description: string
  problem: string
  solution: string
  metrics: { id: string; label: string }[]
  highlights: string[]
}

export type TranslationSchema = {
  nav: {
    home: string
    about: string
    skills: string
    projects: string
    experience: string
    contact: string
  }
  hero: {
    badge: string
    titlePart1: string
    titlePart2: string
    intro: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    marquee: string[]
  }
  services: {
    title: string
    subtitle: string
    items: ServiceItem[]
  }
  about: {
    title: string
    subtitle: string
    bio: string
    metrics: {
      items: MetricItem[]
    }
    languages: {
      title: string
      items: LanguageItem[]
    }
  }
  skills: {
    title: string
    subtitle: string
    categories: SkillCategoryCopy[]
  }
  experience: {
    title: string
    subtitle: string
    international: string
    viewEarlier: string
    employment: Record<'fullTime' | 'contract' | 'freelance', string>
    workMode: Record<'onSite' | 'remote' | 'hybrid', string>
    items: ExperienceCopy[]
    summary: MetricItem[]
  }
  projects: {
    title: string
    subtitle: string
    viewMore: string
    items: ProjectCopy[]
    labels: {
      problem: string
      solution: string
      metrics: string
      highlights: string
      technologies: string
      viewLive: string
      viewGithub: string
    }
  }
  contact: {
    title: string
    subtitle: string
    form: {
      name: string
      namePlaceholder: string
      email: string
      emailPlaceholder: string
      company: string
      companyPlaceholder: string
      service: string
      servicePlaceholder: string
      serviceOptions: ServiceOption[]
      message: string
      messagePlaceholder: string
      submit: string
      submitting: string
      success: string
      error: string
    }
    social: {
      title: string
    }
  }
  language: {
    label: string
  }
  common: {
    close: string
    present: string
  }
}
