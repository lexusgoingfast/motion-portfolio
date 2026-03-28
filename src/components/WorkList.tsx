import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { useLang } from '../LangContext'
import { useIsMobile } from '../useIsMobile'

const worksData = {
  en: [
    {
      index: '01',
      title: 'UX/UI — IBLS',
      year: '2022–2024',
      category: 'Interfaces / Product',
      desc: 'Full-cycle UX/UI design for digital product: user research, information architecture, wireframes, UI components, and prototype delivery.',
      tags: ['UX/UI', 'Figma', 'Product Design'],
    },
    {
      index: '02',
      title: 'Visual & Digital — ПИК',
      year: '2024–2026',
      category: 'Brand / Digital',
      desc: 'Visual digital communications, AI-driven visual production, UX/UI for internal products, and presentation design for one of Russia\'s largest real estate developers.',
      tags: ['Art Direction', 'AI Visual', 'UX/UI', 'Presentations'],
    },
    {
      index: '03',
      title: 'AI Visual — Tape Production',
      year: '2026',
      category: 'AI / Content',
      desc: 'AI-assisted visual production pipeline, YouTube thumbnail design, and video content direction.',
      tags: ['Midjourney', 'Kling', 'Content Design'],
    },
    {
      index: '04',
      title: 'Kinetic Glitch Type',
      year: '2024',
      category: 'Motion / Experiment',
      desc: 'Real-time dot-matrix typography renderer with procedural glitch displacement. Configurable dot size, gap, colours, and glitch strength.',
      tags: ['React', 'Canvas 2D', 'TypeScript'],
      href: '../kinetic/typo-glitch/',
    },
    {
      index: '05',
      title: 'Mosaic Logo Animation',
      year: '2024',
      category: 'Motion / Experiment',
      desc: 'Canvas engine scattering and reassembling a logo from thousands of colour-matched particles with configurable easing and phase timing.',
      tags: ['Canvas 2D', 'Vanilla JS', 'Generative'],
      href: '../mosaic-animation/index.html',
    },
  ],
  ru: [
    {
      index: '01',
      title: 'UX/UI — IBLS',
      year: '2022–2024',
      category: 'Интерфейсы / Продукт',
      desc: 'Полный цикл UX/UI дизайна для цифрового продукта: ресерч, информационная архитектура, вайрфреймы, UI-компоненты, прототипы.',
      tags: ['UX/UI', 'Figma', 'Product Design'],
    },
    {
      index: '02',
      title: 'Visual & Digital — ПИК',
      year: '2024–2026',
      category: 'Бренд / Digital',
      desc: 'Визуальные digital-коммуникации, AI-визуал, UX/UI для внутренних продуктов и презентации для одного из крупнейших девелоперов России.',
      tags: ['Art Direction', 'AI Visual', 'UX/UI', 'Презентации'],
    },
    {
      index: '03',
      title: 'AI Visual — Tape Production',
      year: '2026',
      category: 'AI / Контент',
      desc: 'AI-пайплайн для визуального производства, дизайн YouTube-превью, арт-дирекшн видеоконтента.',
      tags: ['Midjourney', 'Kling', 'Content Design'],
    },
    {
      index: '04',
      title: 'Kinetic Glitch Type',
      year: '2024',
      category: 'Моушн / Эксперимент',
      desc: 'Рендерер точечной типографики в реальном времени с процедуральным глич-смещением. Настраиваемые размер точек, отступы, цвета и сила глича.',
      tags: ['React', 'Canvas 2D', 'TypeScript'],
      href: '../kinetic/typo-glitch/',
    },
    {
      index: '05',
      title: 'Mosaic Logo Animation',
      year: '2024',
      category: 'Моушн / Эксперимент',
      desc: 'Canvas-движок, рассыпающий и собирающий логотип из тысяч частиц с настройкой easing и фазовым тайммингом.',
      tags: ['Canvas 2D', 'Vanilla JS', 'Generative'],
      href: '../mosaic-animation/index.html',
    },
  ],
}

const viewLabel = { en: 'View project →', ru: 'Открыть →' }

function WorkRow({ work, i, lang }: { work: typeof worksData.en[0]; i: number; lang: 'en' | 'ru' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  const px = isMobile ? '20px' : '40px'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr auto' : '40px 1fr auto auto',
          gap: isMobile ? 12 : 24,
          alignItems: 'center',
          padding: `22px ${px}`,
          cursor: 'none',
          background: hovered ? 'var(--hover)' : 'transparent',
          transition: 'background 0.15s',
        }}
      >
        {!isMobile && <span style={{ fontSize: 10, color: 'var(--muted)' }}>{work.index}</span>}
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em' }}>{work.title}</span>
        {!isMobile && <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{work.category}</span>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{work.year}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1 }}
          >
            +
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: `0 ${px} 24px` }}>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.85, maxWidth: 500, marginBottom: 16 }}>
                {work.desc}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: work.href ? 16 : 0 }}>
                {work.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '3px 9px',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    fontSize: 10,
                    color: 'var(--muted)',
                    letterSpacing: '0.03em',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              {work.href && (
                <motion.a
                  href={work.href}
                  whileHover={{ x: 3 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--text)',
                    borderBottom: '1px solid rgba(0,0,0,0.25)',
                    paddingBottom: 1,
                    cursor: 'none',
                  }}
                >
                  {viewLabel[lang]}
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function WorkList() {
  const { lang } = useLang()
  const isMobile = useIsMobile()
  const works = worksData[lang]
  const headers = {
    en: ['#', 'title', 'type', 'year'],
    ru: ['#', 'название', 'тип', 'год'],
  }
  const mobileHeaders = { en: ['title', 'year'], ru: ['название', 'год'] }

  return (
    <section id="work">
      <div style={{
        padding: isMobile ? '20px 24px' : '20px 48px',
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr auto' : '40px 1fr auto auto',
        gap: isMobile ? 12 : 24,
      }}>
        {(isMobile ? mobileHeaders[lang] : headers[lang]).map(h => (
          <span key={h} style={{ fontSize: 10, color: 'var(--muted)',  }}>{h}</span>
        ))}
      </div>

      {works.map((w, i) => (
        <WorkRow key={`${lang}-${w.index}`} work={w} i={i} lang={lang} />
      ))}
    </section>
  )
}
