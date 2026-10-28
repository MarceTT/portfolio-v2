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

  // Skills Section
  skills: {
    title: 'Tech Stack',
    subtitle: 'Technologies I work with daily',
    categories: [
      { id: 'frontend', title: 'Frontend' },
      { id: 'backend', title: 'Backend' },
      { id: 'database', title: 'Database' },
      { id: 'cloud', title: 'Cloud & DevOps' },
    ],
  },

  // Experience Section
  experience: {
    title: 'Experience',
    subtitle: '10+ years building web applications across 3 countries',
    present: 'Present',
    international: 'International',
    viewEarlier: 'View {count} earlier positions',
    employment: {
      fullTime: 'Full-time',
      contract: 'Contract',
      freelance: 'Freelance',
    },
    workMode: {
      onSite: 'On-site',
      remote: 'Remote',
      hybrid: 'Hybrid',
    },
    items: [
      {
        id: 'defensoria-del-deudor',
        title: 'Senior Full Stack Developer',
        location: 'Santiago, Chile',
        description: 'Leading development of “Nurturing” — a custom CRM platform with automated email marketing workflows and high-volume distributed processing.',
        highlights: [
          'Architected distributed system processing 789,000+ emails per campaign with 96% delivery rate',
          'Implemented 20 parallel workers with Redis queues for better throughput',
          'Built idempotency system with distributed Redis locks ensuring zero duplicate sends',
          'Fixed browser OOM issues on listings with 350,000+ records',
        ],
      },
      {
        id: 'match-my-course',
        title: 'Senior Full Stack Developer',
        location: 'Chile',
        description: 'Built end-to-end an educational marketplace connecting students with English courses in Ireland and New Zealand.',
        highlights: [
          'Architected full platform from scratch serving 5,000+ monthly users',
          'Reduced page load time by 40% with SSR + CloudFront CDN',
          'Optimized API response time from 800ms to 200ms',
          'Achieved 300% increase in organic traffic through technical SEO',
          'Implemented ISR for 500+ school pages with 95+ Lighthouse score',
        ],
      },
      {
        id: 'cable-color',
        title: 'Senior Full Stack Developer',
        location: 'Ovalle, Chile',
        description: 'Led full migration of legacy back office system for 10+ sales reps across 6 regional branches.',
        highlights: [
          'Reduced page load times by ~60% migrating to Laravel 10 + React 18',
          'Improved sales team productivity, reducing time-to-task by ~40%',
          'Built custom APIs with JWT authentication serving 6 branches real-time',
          'Led 4-developer team delivering migration on schedule',
        ],
      },
      {
        id: 'chile-pasajes',
        title: 'Full Stack Developer',
        location: 'Santiago, Chile',
        description: 'Backend systems with Laravel 11, Laravel Nova 4, and modern frontend with Vue.js.',
        highlights: [
          'Developed advanced features with Laravel Nova 4 + custom Vue.js tools',
          'Implemented JWT, Laravel Spatie, Laravel Excel integrations',
          'Optimized performance with Redis and Laravel query caching',
        ],
      },
      {
        id: 'dividing-zero',
        title: 'Full Stack Developer',
        location: 'Auckland, New Zealand',
        description: 'Maintained and updated NZVenues platform (nzvenues.co.nz).',
        highlights: [
          'Ensured platform remained functional, secure, and up-to-date',
          'Delivered responsive web applications with Laravel 6 + Vue.js 2',
        ],
      },
      {
        id: 'universidad-del-alba',
        title: 'IT Project Manager → Full Stack Developer',
        location: 'Santiago, Chile',
        description: 'Progressed from Full Stack Developer to IT Project Manager, leading university projects.',
        highlights: [
          'Directed IT projects ensuring adherence to budgets and timelines',
          'Developed custom solutions for faculties using Laravel 5.5-8 + Angular 8',
          'Managed project proposals, technology selection, and team coordination',
          'Provided technical support during new technology implementations',
        ],
      },
      {
        id: 'americas-car-group',
        title: 'Web Developer',
        location: 'Santiago, Chile',
        description: 'Analysis and development of requirements for corporation managers.',
        highlights: [
          'Database analysis, modeling and maintenance with PostgreSQL',
          'Developed systems using Laravel 5.5-5.6 + Bootstrap',
        ],
      },
      {
        id: 'mas-cerca',
        title: 'Web Developer',
        location: 'Santiago, Chile',
        description: 'Internal systems development for call center operations.',
        highlights: [
          'Built reporting dashboards and data analysis tools',
          'Implemented OOP backend solutions',
        ],
      },
      {
        id: 'nuestragencia',
        title: 'Junior Web Developer',
        location: 'Santiago, Chile',
        description: 'Web development for client projects at a digital agency.',
        highlights: [
          'Developed and maintained web applications',
          'Gained foundational full-stack development experience',
        ],
      },
    ],
    summary: [
      { value: '10+', label: 'Years Experience' },
      { value: '3', label: 'Countries Worked' },
      { value: '9', label: 'Companies' },
    ],
  },

  // Projects Section
  projects: {
    title: 'Case Studies',
    subtitle: 'Real results for real clients',
    viewMore: 'See more projects',
    labels: {
      problem: 'The Problem',
      solution: 'The Solution',
      metrics: 'Key Metrics',
      highlights: 'Highlights',
      technologies: 'Tech Stack',
      viewLive: 'View Live Site',
      viewGithub: 'View on GitHub',
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
