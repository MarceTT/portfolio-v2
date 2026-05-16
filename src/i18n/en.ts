// English translations
import type { TranslationSchema } from './es'

export const en: TranslationSchema = {
  // Navigation
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
  },

  // Hero Section
  hero: {
    badge: '10+ Years Building Software',
    titlePart1: 'I build software that',
    titlePart2: 'transforms businesses',
    intro: "Hi, I'm Marcelo Toro, a software development consultant",
    subtitle: 'Custom digital solutions for companies looking to scale, automate processes and optimize their operations.',
    ctaPrimary: 'Book Consultation',
    ctaSecondary: 'See Case Studies',
    marquee: ['Scalable', 'High Performance', 'Clean Code', 'Results-Driven'],
  },

  // Services Section
  services: {
    title: 'Services',
    subtitle: 'Technology solutions that drive your business',
    items: [
      {
        id: 'custom-software',
        title: 'Custom Software',
        description: 'Web and mobile application development designed specifically for your business needs.',
        features: [
          'Scalable web applications',
          'Robust and secure APIs',
          'Clean architecture',
          'Modern interfaces',
        ],
        cta: 'Get Started',
      },
      {
        id: 'automations',
        title: 'Automations',
        description: 'Optimize your processes by eliminating manual tasks and connecting your existing tools.',
        features: [
          'Mass email flows',
          'Third-party integrations',
          'Manual work reduction',
          'Automated workflows',
        ],
        cta: 'Automate my business',
      },
      {
        id: 'consulting',
        title: 'Technical Consulting',
        description: 'Expert advice to make the best technology decisions for your company.',
        features: [
          'Architecture review',
          'Performance optimization',
          'Team mentoring',
          'Code reviews',
        ],
        cta: 'Book a consultation',
      },
    ],
  },

  // About Section
  about: {
    title: 'About Me',
    subtitle: 'Over a decade creating digital solutions',
    bio: 'Software consultant with 10+ years of experience building scalable solutions for clients across LATAM and worldwide. Specialized in frontend architecture, automations and technical mentoring.',
    metrics: {
      title: 'Client Results',
      items: [
        { value: '50+', label: 'Projects Delivered' },
        { value: '10+', label: 'Years of Experience' },
        { value: '30+', label: 'Happy Clients' },
        { value: '99%', label: 'Success Rate' },
      ],
    },
    languages: {
      title: 'Languages',
      items: [
        { name: 'Spanish', level: 'Native' },
        { name: 'English', level: 'Professional' },
      ],
    },
  },

  // Projects Section
  projects: {
    title: 'Case Studies',
    subtitle: 'Real results for real clients',
    viewMore: 'See more projects',
    labels: {
      problem: 'Problem',
      solution: 'Solution',
      results: 'Results',
      technologies: 'Technologies',
    },
  },

  // Contact Section
  contact: {
    title: "Let's discuss your project",
    subtitle: 'Have an idea? Tell me how I can help',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      company: 'Company (optional)',
      companyPlaceholder: 'Your company name',
      service: 'Service',
      servicePlaceholder: 'Select a service',
      serviceOptions: [
        { value: 'software', label: 'Custom Software' },
        { value: 'automations', label: 'Automations' },
        { value: 'consulting', label: 'Technical Consulting' },
        { value: 'other', label: 'Other' },
      ],
      message: 'Message',
      messagePlaceholder: 'Tell me about your project...',
      submit: 'Send message',
      submitting: 'Sending...',
      success: 'Message sent! I will get back to you soon.',
      error: 'Error sending. Please try again.',
    },
    social: {
      title: 'You can also find me on',
    },
  },

  // Language Toggle
  language: {
    current: 'EN',
    switchTo: 'ES',
    label: 'Switch to Spanish',
  },

  // Common
  common: {
    learnMore: 'Learn more',
    viewAll: 'View all',
    close: 'Close',
  },
}
