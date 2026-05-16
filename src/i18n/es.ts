// Spanish translations (default language)

// Type definitions for translation structure
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
      title: string
      items: MetricItem[]
    }
    languages: {
      title: string
      items: LanguageItem[]
    }
  }
  projects: {
    title: string
    subtitle: string
    viewMore: string
    labels: {
      problem: string
      solution: string
      results: string
      technologies: string
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
    current: string
    switchTo: string
    label: string
  }
  common: {
    learnMore: string
    viewAll: string
    close: string
  }
}

export const es: TranslationSchema = {
  // Navigation
  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    experience: 'Experiencia',
    contact: 'Contacto',
  },

  // Hero Section
  hero: {
    badge: '10+ Años Construyendo Software',
    titlePart1: 'Construyo software que',
    titlePart2: 'transforma negocios',
    intro: 'Hola, soy Marcelo Toro, consultor de desarrollo de software',
    subtitle: 'Soluciones digitales a medida para empresas que buscan escalar, automatizar procesos y optimizar su operación.',
    ctaPrimary: 'Agendar Consulta',
    ctaSecondary: 'Ver Casos de Éxito',
    marquee: ['Escalable', 'Alto Rendimiento', 'Código Limpio', 'Enfocado en Resultados'],
  },

  // Services Section
  services: {
    title: 'Servicios',
    subtitle: 'Soluciones tecnológicas que impulsan tu negocio',
    items: [
      {
        id: 'custom-software',
        title: 'Software a Medida',
        description: 'Desarrollo de aplicaciones web y móviles diseñadas específicamente para las necesidades de tu negocio.',
        features: [
          'Aplicaciones web escalables',
          'APIs robustas y seguras',
          'Arquitectura limpia',
          'Interfaces modernas',
        ],
        cta: 'Consultar',
      },
      {
        id: 'automations',
        title: 'Automatizaciones',
        description: 'Optimiza tus procesos eliminando tareas manuales y conectando tus herramientas existentes.',
        features: [
          'Flujos de email masivos',
          'Integraciones con terceros',
          'Reducción de trabajo manual',
          'Workflows automatizados',
        ],
        cta: 'Automatizar mi negocio',
      },
      {
        id: 'consulting',
        title: 'Consultoría Técnica',
        description: 'Asesoramiento experto para tomar las mejores decisiones tecnológicas en tu empresa.',
        features: [
          'Revisión de arquitectura',
          'Optimización de performance',
          'Mentoría de equipos',
          'Code reviews',
        ],
        cta: 'Agendar consulta',
      },
    ],
  },

  // About Section
  about: {
    title: 'Sobre Mí',
    subtitle: 'Más de una década creando soluciones digitales',
    bio: 'Consultor de software con más de 10 años de experiencia construyendo soluciones escalables para clientes en LATAM y el mundo. Especializado en arquitectura frontend, automatizaciones y mentoría técnica.',
    metrics: {
      title: 'Resultados para Clientes',
      items: [
        { value: '50+', label: 'Proyectos Entregados' },
        { value: '10+', label: 'Años de Experiencia' },
        { value: '30+', label: 'Clientes Satisfechos' },
        { value: '99%', label: 'Tasa de Éxito' },
      ],
    },
    languages: {
      title: 'Idiomas',
      items: [
        { name: 'Español', level: 'Nativo' },
        { name: 'Inglés', level: 'Profesional' },
      ],
    },
  },

  // Projects Section
  projects: {
    title: 'Casos de Éxito',
    subtitle: 'Resultados reales para clientes reales',
    viewMore: 'Ver más proyectos',
    labels: {
      problem: 'Problema',
      solution: 'Solución',
      results: 'Resultados',
      technologies: 'Tecnologías',
    },
  },

  // Contact Section
  contact: {
    title: 'Hablemos de tu proyecto',
    subtitle: '¿Tenés una idea? Contame cómo puedo ayudarte',
    form: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      company: 'Empresa (opcional)',
      companyPlaceholder: 'Nombre de tu empresa',
      service: 'Servicio',
      servicePlaceholder: 'Selecciona un servicio',
      serviceOptions: [
        { value: 'software', label: 'Software a Medida' },
        { value: 'automations', label: 'Automatizaciones' },
        { value: 'consulting', label: 'Consultoría Técnica' },
        { value: 'other', label: 'Otro' },
      ],
      message: 'Mensaje',
      messagePlaceholder: 'Contame sobre tu proyecto...',
      submit: 'Enviar mensaje',
      submitting: 'Enviando...',
      success: '¡Mensaje enviado! Te responderé pronto.',
      error: 'Error al enviar. Por favor, intenta de nuevo.',
    },
    social: {
      title: 'También podés encontrarme en',
    },
  },

  // Language Toggle
  language: {
    current: 'ES',
    switchTo: 'EN',
    label: 'Cambiar a Inglés',
  },

  // Common
  common: {
    learnMore: 'Saber más',
    viewAll: 'Ver todo',
    close: 'Cerrar',
  },
}
