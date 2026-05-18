import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'cases')

const projects = [
  {
    slug: 'mosaic-concept-store',
    index: '01',
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
      desc: "Visual digital communications, AI-driven visual production, UX/UI for internal products, and presentation design for one of Russia's largest real estate developers.",
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

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function tagsHtml(tags) {
  return tags.map(t => `      <span class="case__tag">${esc(t)}</span>\n`).join('')
}

const labels = {
  ru: {
    htmlLang: 'ru',
    back: '← К работам',
    langAria: 'Язык',
  },
  en: {
    htmlLang: 'en',
    back: '← Back to work',
    langAria: 'Language',
  },
}

function page(p, locale) {
  const data = p[locale]
  const other = locale === 'ru' ? 'en' : 'ru'
  const l = labels[locale]
  const selfPath = locale === 'ru' ? `${p.slug}.html` : `${p.slug}.en.html`
  const otherPath = other === 'ru' ? `${p.slug}.html` : `${p.slug}.en.html`
  const title = esc(data.title)
  return `<!DOCTYPE html>
<html lang="${l.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — AM</title>
  <link rel="alternate" hreflang="ru" href="/cases/${p.slug}.html" />
  <link rel="alternate" hreflang="en" href="/cases/${p.slug}.en.html" />
  <link rel="stylesheet" href="./case.css" />
  <script>
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        document.documentElement.setAttribute('data-theme', 'dark');
    } catch (e) {}
  </script>
</head>
<body>
  <main class="case">
    <header class="case__header">
      <div class="case__header-top">
        <a class="case__back" href="/#work">${esc(l.back)}</a>
        <nav class="case__lang-switch" aria-label="${esc(l.langAria)}">
          ${
            locale === 'ru'
              ? `<span aria-current="true">RU</span>\n          <a href="./${otherPath}" hreflang="en">EN</a>`
              : `<a href="./${otherPath}" hreflang="ru">RU</a>\n          <span aria-current="true">EN</span>`
          }
        </nav>
      </div>
      <span class="case__idx">${esc(p.index)}</span>
      <h1 class="case__title">${title}</h1>
      <div class="case__meta">
        <span>${esc(data.category)}</span>
        <span>${esc(data.year)}</span>
      </div>
    </header>
    <div class="case__body">
      <section class="case__block">
        <p class="case__desc">${esc(data.desc)}</p>
        <div class="case__tags">
${tagsHtml(data.tags)}        </div>
      </section>
    </div>
  </main>
</body>
</html>
`
}

const handBuiltSlugs = new Set(['mosaic-concept-store'])

for (const p of projects) {
  if (handBuiltSlugs.has(p.slug)) {
    console.log('skip hand-built', p.slug)
    continue
  }
  for (const locale of ['ru', 'en']) {
    const filename = locale === 'ru' ? `${p.slug}.html` : `${p.slug}.en.html`
    const fp = path.join(outDir, filename)
    fs.writeFileSync(fp, page(p, locale), 'utf8')
    console.log('wrote', path.relative(path.join(__dirname, '..'), fp))
  }
}
