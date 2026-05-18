export const PROJECT_SLUGS = [
  'mosaic-concept-store',
  'ux-ui-ibls',
  'visual-digital-pik',
  'ai-visual-tape',
  'kinetic-glitch-type',
  'mosaic-logo-animation',
] as const

export type ProjectSlug = (typeof PROJECT_SLUGS)[number]

export type ProjectLocale = {
  title: string
  year: string
  category: string
  desc: string
  tags: string[]
}

export type ProjectDef = {
  slug: ProjectSlug
  index: string
  demoUrl?: string
  en: ProjectLocale
  ru: ProjectLocale
}

export const projects: ProjectDef[] = [
  {
    slug: 'mosaic-concept-store',
    index: '01',
    demoUrl: '/mosaic-animation/index.html',
    en: {
      title: 'MOSAIC — Concept Store',
      year: '2025 — present',
      category: 'Brand / Retail',
      desc: 'Art direction & full digital product design for a multi-brand concept store: visual identity, working interactive prototype, Figma design system on Variables (tokens · type · spacing · components with States & Variants), and AI-powered campaign concepts.',
      tags: ['Art Direction', 'UX/UI', 'Design System', 'AI'],
    },
    ru: {
      title: 'MOSAIC — Concept Store',
      year: '2025 — наст. время',
      category: 'Бренд / Ритейл',
      desc: 'Арт-дирекшн и полноценный продуктовый дизайн концепт-стора: айдентика, рабочий интерактивный прототип, дизайн-система в Figma на Variables (токены · типографика · spacing · компоненты со States и Variants) и AI-кампейны.',
      tags: ['Art Direction', 'UX/UI', 'Design System', 'AI'],
    },
  },
  {
    slug: 'ux-ui-ibls',
    index: '02',
    en: {
      title: 'UX/UI — IBLS',
      year: '2022–2024',
      category: 'Interfaces / Product',
      desc: 'Full-cycle UX/UI design for digital product: user research, information architecture, wireframes, UI components, and prototype delivery.',
      tags: ['UX/UI', 'Figma', 'Product Design'],
    },
    ru: {
      title: 'UX/UI — IBLS',
      year: '2022–2024',
      category: 'Интерфейсы / Продукт',
      desc: 'Полный цикл UX/UI дизайна для цифрового продукта: ресерч, информационная архитектура, вайрфреймы, UI-компоненты, прототипы.',
      tags: ['UX/UI', 'Figma', 'Product Design'],
    },
  },
  {
    slug: 'visual-digital-pik',
    index: '03',
    en: {
      title: 'Visual & Digital — ПИК',
      year: '2024–2026',
      category: 'Brand / Digital',
      desc: 'Visual digital communications, AI-driven visual production, UX/UI for internal products, and presentation design for one of Russia\'s largest real estate developers.',
      tags: ['Art Direction', 'AI Visual', 'UX/UI', 'Presentations'],
    },
    ru: {
      title: 'Visual & Digital — ПИК',
      year: '2024–2026',
      category: 'Бренд / Digital',
      desc: 'Визуальные digital-коммуникации, AI-визуал, UX/UI для внутренних продуктов и презентации для одного из крупнейших девелоперов России.',
      tags: ['Art Direction', 'AI Visual', 'UX/UI', 'Презентации'],
    },
  },
  {
    slug: 'ai-visual-tape',
    index: '04',
    en: {
      title: 'AI Visual — Tape Production',
      year: '2026',
      category: 'AI / Content',
      desc: 'AI-assisted visual production pipeline, YouTube thumbnail design, and video content direction.',
      tags: ['Midjourney', 'Kling', 'Content Design'],
    },
    ru: {
      title: 'AI Visual — Tape Production',
      year: '2026',
      category: 'AI / Контент',
      desc: 'AI-пайплайн для визуального производства, дизайн YouTube-превью, арт-дирекшн видеоконтента.',
      tags: ['Midjourney', 'Kling', 'Content Design'],
    },
  },
  {
    slug: 'kinetic-glitch-type',
    index: '05',
    demoUrl: '/kinetic/typo-glitch/',
    en: {
      title: 'Kinetic Glitch Type',
      year: '2024',
      category: 'Motion / Experiment',
      desc: 'Real-time dot-matrix typography renderer with procedural glitch displacement. Configurable dot size, gap, colours, and glitch strength.',
      tags: ['React', 'Canvas 2D', 'TypeScript'],
    },
    ru: {
      title: 'Kinetic Glitch Type',
      year: '2024',
      category: 'Моушн / Эксперимент',
      desc: 'Рендерер точечной типографики в реальном времени с процедуральным глич-смещением. Настраиваемые размер точек, отступы, цвета и сила глича.',
      tags: ['React', 'Canvas 2D', 'TypeScript'],
    },
  },
  {
    slug: 'mosaic-logo-animation',
    index: '06',
    demoUrl: '/mosaic-animation/index.html',
    en: {
      title: 'Mosaic Logo Animation',
      year: '2024',
      category: 'Motion / Experiment',
      desc: 'Canvas engine scattering and reassembling a logo from thousands of colour-matched particles with configurable easing and phase timing.',
      tags: ['Canvas 2D', 'Vanilla JS', 'Generative'],
    },
    ru: {
      title: 'Mosaic Logo Animation',
      year: '2024',
      category: 'Моушн / Эксперимент',
      desc: 'Canvas-движок, рассыпающий и собирающий логотип из тысяч частиц с настройкой easing и фазовым тайммингом.',
      tags: ['Canvas 2D', 'Vanilla JS', 'Generative'],
    },
  },
]

export function getProjectBySlug(slug: string): ProjectDef | undefined {
  return projects.find(p => p.slug === slug)
}

export function getCasePagePath(slug: string): string {
  return `/cases/${slug}.html`
}
