import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { useLang } from '../LangContext'
import { useIsMobile } from '../useIsMobile'
import { projects, getCasePagePath } from '../data/projects'

const viewLabel = { en: 'View project →', ru: 'Открыть →' }

type WorkRowItem = {
  index: string
  slug: string
  title: string
  year: string
  category: string
  desc: string
  tags: string[]
}

function WorkRow({ work, i, lang }: { work: WorkRowItem; i: number; lang: 'en' | 'ru' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  const px = isMobile ? '20px' : '40px'
  const caseHref = getCasePagePath(work.slug)

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
          <a
            href={caseHref}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text)',
              borderBottom: '1px solid rgba(0,0,0,0.25)',
              paddingBottom: 1,
              lineHeight: 1.2,
              textDecoration: 'none',
              cursor: 'none',
            }}
          >
            {viewLabel[lang]}
          </a>
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
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
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
  const works: WorkRowItem[] = projects.map(p => ({
    slug: p.slug,
    index: p.index,
    title: p[lang].title,
    year: p[lang].year,
    category: p[lang].category,
    desc: p[lang].desc,
    tags: p[lang].tags,
  }))
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
          <span key={h} style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{h}</span>
        ))}
      </div>

      {works.map((w, i) => (
        <WorkRow key={`${lang}-${w.slug}`} work={w} i={i} lang={lang} />
      ))}
    </section>
  )
}
