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

  // Skills Section
  skills: {
    title: 'Stack Tecnológico',
    subtitle: 'Tecnologías con las que trabajo a diario',
    categories: [
      { id: 'frontend', title: 'Frontend' },
      { id: 'backend', title: 'Backend' },
      { id: 'database', title: 'Bases de Datos' },
      { id: 'cloud', title: 'Cloud y DevOps' },
    ],
  },

  // Experience Section
  experience: {
    title: 'Experiencia',
    subtitle: '+10 años construyendo aplicaciones web en 3 países',
    international: 'Internacional',
    viewEarlier: 'Ver {count} posiciones anteriores',
    employment: {
      fullTime: 'Tiempo completo',
      contract: 'Contrato',
      freelance: 'Freelance',
    },
    workMode: {
      onSite: 'Presencial',
      remote: 'Remoto',
      hybrid: 'Híbrido',
    },
    items: [
      {
        id: 'defensoria-del-deudor',
        title: 'Desarrollador Full Stack Senior',
        location: 'Santiago, Chile',
        description: 'Liderando el desarrollo de “Nurturing”, una plataforma CRM a medida con flujos automatizados de email marketing y procesamiento distribuido de alto volumen.',
        highlights: [
          'Arquitectura de un sistema distribuido que procesa más de 789.000 emails por campaña con 96% de entregabilidad',
          'Implementación de 20 workers paralelos con colas Redis para mayor throughput',
          'Sistema de idempotencia con locks distribuidos en Redis que garantiza cero envíos duplicados',
          'Resolución de errores de memoria del navegador en listados de más de 350.000 registros',
        ],
      },
      {
        id: 'match-my-course',
        title: 'Desarrollador Full Stack Senior',
        location: 'Chile',
        description: 'Construcción de punta a punta de un marketplace educativo que conecta estudiantes con cursos de inglés en Irlanda y Nueva Zelanda.',
        highlights: [
          'Arquitectura completa de la plataforma desde cero, sirviendo a más de 5.000 usuarios mensuales',
          'Reducción del tiempo de carga en 40% con SSR + CDN de CloudFront',
          'Optimización del tiempo de respuesta de la API de 800ms a 200ms',
          'Aumento del 300% en tráfico orgánico mediante SEO técnico',
          'Implementación de ISR para más de 500 páginas de escuelas con score Lighthouse 95+',
        ],
      },
      {
        id: 'cable-color',
        title: 'Desarrollador Full Stack Senior',
        location: 'Ovalle, Chile',
        description: 'Lideré la migración completa del back office legado para más de 10 vendedores en 6 sucursales regionales.',
        highlights: [
          'Reducción de los tiempos de carga en ~60% migrando a Laravel 10 + React 18',
          'Mejora de la productividad del equipo comercial, reduciendo el tiempo por tarea en ~40%',
          'APIs a medida con autenticación JWT sirviendo a 6 sucursales en tiempo real',
          'Lideré un equipo de 4 desarrolladores entregando la migración en plazo',
        ],
      },
      {
        id: 'chile-pasajes',
        title: 'Desarrollador Full Stack',
        location: 'Santiago, Chile',
        description: 'Sistemas backend con Laravel 11, Laravel Nova 4 y frontend moderno con Vue.js.',
        highlights: [
          'Desarrollo de funcionalidades avanzadas con Laravel Nova 4 + herramientas Vue.js a medida',
          'Integraciones de JWT, Laravel Spatie y Laravel Excel',
          'Optimización de performance con Redis y caché de queries de Laravel',
        ],
      },
      {
        id: 'dividing-zero',
        title: 'Desarrollador Full Stack',
        location: 'Auckland, Nueva Zelanda',
        description: 'Mantenimiento y actualización de la plataforma NZVenues (nzvenues.co.nz).',
        highlights: [
          'Mantuve la plataforma funcional, segura y actualizada',
          'Entrega de aplicaciones web responsivas con Laravel 6 + Vue.js 2',
        ],
      },
      {
        id: 'universidad-del-alba',
        title: 'Jefe de Proyectos TI → Desarrollador Full Stack',
        location: 'Santiago, Chile',
        description: 'Progresé de Desarrollador Full Stack a Jefe de Proyectos TI, liderando proyectos universitarios.',
        highlights: [
          'Dirección de proyectos TI asegurando el cumplimiento de presupuestos y plazos',
          'Desarrollo de soluciones a medida para facultades con Laravel 5.5-8 + Angular 8',
          'Gestión de propuestas, selección de tecnologías y coordinación de equipos',
          'Soporte técnico durante la implementación de nuevas tecnologías',
        ],
      },
      {
        id: 'americas-car-group',
        title: 'Desarrollador Web',
        location: 'Santiago, Chile',
        description: 'Análisis y desarrollo de requerimientos para las gerencias de la corporación.',
        highlights: [
          'Análisis, modelado y mantenimiento de bases de datos con PostgreSQL',
          'Desarrollo de sistemas con Laravel 5.5-5.6 + Bootstrap',
        ],
      },
      {
        id: 'mas-cerca',
        title: 'Desarrollador Web',
        location: 'Santiago, Chile',
        description: 'Desarrollo de sistemas internos para la operación del call center.',
        highlights: [
          'Construcción de dashboards de reportería y herramientas de análisis de datos',
          'Implementación de soluciones backend orientadas a objetos',
        ],
      },
      {
        id: 'nuestragencia',
        title: 'Desarrollador Web Junior',
        location: 'Santiago, Chile',
        description: 'Desarrollo web para proyectos de clientes en una agencia digital.',
        highlights: [
          'Desarrollo y mantenimiento de aplicaciones web',
          'Base de experiencia en desarrollo full stack',
        ],
      },
    ],
    summary: [
      { value: '10+', label: 'Años de Experiencia' },
      { value: '3', label: 'Países' },
      { value: '9', label: 'Empresas' },
    ],
  },

  // Projects Section
  projects: {
    title: 'Casos de Éxito',
    subtitle: 'Resultados reales para clientes reales',
    viewMore: 'Ver más proyectos',
    items: [
      {
        id: 'nurturing',
        title: 'Nurturing CRM',
        category: 'Plataforma de Email Marketing',
        description: 'Plataforma CRM a medida con flujos automatizados de email marketing y procesamiento distribuido de alto volumen para Defensoría del Deudor.',
        problem: 'El cliente necesitaba un sistema capaz de enviar campañas masivas de email a cientos de miles de destinatarios, con alta entregabilidad y analítica en tiempo real.',
        solution: 'Diseñé un sistema distribuido con 20 workers paralelos, colas Redis y circuit breakers inteligentes para manejar fallas sin perder envíos.',
        metrics: [
          { id: 'emailsPerCampaign', label: 'Emails/Campaña' },
          { id: 'deliveryRate', label: 'Tasa de Entrega' },
          { id: 'openRate', label: 'Tasa de Apertura' },
          { id: 'parallelWorkers', label: 'Workers Paralelos' },
        ],
        highlights: [
          'Sistema distribuido que procesa más de 789.000 emails por campaña',
          'Sistema de idempotencia con locks en Redis que garantiza cero envíos duplicados',
          'Circuit breaker inteligente ante fallas del proveedor SMTP',
          'Sistema de auto-recuperación para etapas detenidas del pipeline',
          'Resolución de errores de memoria del navegador con más de 350.000 registros',
        ],
      },
      {
        id: 'match-my-course',
        title: 'MatchMyCourse',
        category: 'Marketplace Educativo',
        description: 'Marketplace educativo full-stack que conecta estudiantes con cursos de inglés en Irlanda y Nueva Zelanda.',
        problem: 'A los estudiantes les costaba encontrar y comparar cursos de inglés entre distintos países, escuelas y rangos de precio.',
        solution: 'Construí una plataforma de punta a punta con búsqueda avanzada, filtros y optimización SEO para que cada estudiante encuentre el curso indicado.',
        metrics: [
          { id: 'monthlyUsers', label: 'Usuarios Mensuales' },
          { id: 'uptime', label: 'Disponibilidad' },
          { id: 'apiResponse', label: 'Respuesta API' },
          { id: 'trafficGrowth', label: 'Crecimiento de Tráfico' },
        ],
        highlights: [
          'Arquitectura completa de la plataforma desde cero con Next.js 15',
          'Reducción del tiempo de carga en 40% con SSR + CDN de CloudFront',
          'Optimización de la API de 800ms a 200ms',
          'Implementación de ISR para más de 500 páginas de escuelas',
          'Score de performance Lighthouse 95+',
        ],
      },
      {
        id: 'cable-color-back-office',
        title: 'Cable Color Back Office',
        category: 'Sistema de Gestión Empresarial',
        description: 'Migración completa de un back office legado a un stack moderno para una empresa de telecomunicaciones con 6 sucursales regionales.',
        problem: 'El sistema legado era lento, difícil de mantener y no escalaba para soportar al equipo comercial en crecimiento distribuido en varias ubicaciones.',
        solution: 'Lideré la migración completa a Laravel + React, con patrones modernos de UI/UX y sincronización de datos en tiempo real.',
        metrics: [
          { id: 'loadTime', label: 'Tiempo de Carga' },
          { id: 'productivity', label: 'Productividad' },
          { id: 'branches', label: 'Sucursales' },
          { id: 'teamSize', label: 'Desarrolladores' },
        ],
        highlights: [
          'Reducción de los tiempos de carga en ~60%',
          'Mejora de la productividad del equipo comercial en ~40%',
          'APIs a medida con JWT sirviendo a 6 sucursales en tiempo real',
          'Dashboard responsivo para acceso móvil en terreno',
          'Lideré un equipo de 4 desarrolladores entregando en plazo',
        ],
      },
      {
        id: 'chile-pasajes',
        title: 'Chile Pasajes',
        category: 'Plataforma de Reservas de Viajes',
        description: 'Plataforma de venta de pasajes de bus con más de 2.000 destinos en Chile y Argentina.',
        problem: 'La plataforma necesitaba una arquitectura backend moderna y mejor performance para soportar el tráfico de las temporadas altas de viaje.',
        solution: 'Desarrollé funcionalidades avanzadas en Laravel Nova, implementé estrategias de caché y construí herramientas Vue.js a medida para el panel de administración.',
        metrics: [
          { id: 'destinations', label: 'Destinos' },
          { id: 'countries', label: 'Países' },
          { id: 'cacheHit', label: 'Aciertos de Caché' },
          { id: 'response', label: 'Respuesta' },
        ],
        highlights: [
          'Funcionalidades avanzadas con Laravel Nova 4',
          'Herramientas Vue.js a medida para el panel de administración',
          'Integraciones de JWT, Laravel Spatie y Laravel Excel',
          'Caché con Redis para performance óptima',
          'Optimización de base de datos con caché de queries',
        ],
      },
    ],
    labels: {
      problem: 'El Problema',
      solution: 'La Solución',
      metrics: 'Métricas Clave',
      highlights: 'Destacados',
      technologies: 'Stack Tecnológico',
      viewLive: 'Ver sitio en vivo',
      viewGithub: 'Ver en GitHub',
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
    label: 'Cambiar a Inglés',
  },

  // Common
  common: {
    close: 'Cerrar',
    present: 'Presente',
  },
}
