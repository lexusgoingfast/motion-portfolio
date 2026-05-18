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
  const px = isMobile ? 'var(--pad-x-mobile)' : 'var(--pad-x)'
  const rowPadY = isMobile ? 'var(--pad-row-y-mobile)' : 'var(--pad-row-y)'
  const colGap = isMobile ? 'var(--gap-inline-mobile)' : 'var(--gap-inline)'
  const caseHref = getCasePagePath(work.slug)
  const desktopCols = '32px minmax(0,1fr) 180px 110px 70px 14px'

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
          gridTemplateColumns: isMobile ? '1fr auto' : desktopCols,
          columnGap: colGap,
          alignItems: 'center',
          padding: `${rowPadY} ${px}`,
          cursor: 'none',
          background: hovered ? 'var(--hover)' : 'transparent',
          transition: 'background 0.15s',
        }}
      >
        {!isMobile && <span style={{ fontSize: 10, color: 'var(--muted)' }}>{work.index}</span>}
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{work.title}</span>
        {!isMobile && (
          <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{work.category}</span>
        )}
        {!isMobile && (
          <a
            href={caseHref}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--text)',
              borderBottom: '1px solid var(--border)',
              paddingBottom: 1,
              lineHeight: 1.2,
              textDecoration: 'none',
              cursor: 'none',
              justifySelf: 'start',
              whiteSpace: 'nowrap',
            }}
          >
            {viewLabel[lang]}
          </a>
        )}
        {!isMobile && (
          <span style={{ fontSize: 11, color: 'var(--muted)', justifySelf: 'end', whiteSpace: 'nowrap' }}>{work.year}</span>
        )}
        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--gap-inline-mobile)' }}>
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{work.year}</span>
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1 }}
            >
              +
            </motion.span>
          </div>
        ) : (
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1, justifySelf: 'end' }}
          >
            +
          </motion.span>
        )}
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
            <div style={{ padding: `var(--gap-stack-sm) ${px} var(--gap-stack-lg)` }}>
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9, maxWidth: 520, marginBottom: 'var(--gap-stack-md)' }}>
                {work.desc}
              </p>
              <div style={{ display: 'flex', gap: 'var(--gap-tags)', flexWrap: 'wrap' }}>
                {work.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '5px 12px',
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
  const px = isMobile ? 'var(--pad-x-mobile)' : 'var(--pad-x)'
  const sectionPadY = isMobile ? 'var(--pad-section-y-mobile)' : 'var(--pad-section-y)'
  const colGap = isMobile ? 'var(--gap-inline-mobile)' : 'var(--gap-inline)'
  const works: WorkRowItem[] = projects.map(p => ({
    slug: p.slug,
    index: p.index,
    title: p[lang].title,
    year: p[lang].year,
    category: p[lang].category,
    desc: p[lang].desc,
    tags: p[lang].tags,
  }))
  const desktopCols = '32px minmax(0,1fr) 180px 110px 70px 14px'
  const headers = {
    en: ['#', 'title', 'type', '', 'year', ''],
    ru: ['#', 'название', 'тип', '', 'год', ''],
  }
  const mobileHeaders = { en: ['title', 'year'], ru: ['название', 'год'] }

  return (
    <section id="work">
      <div style={{
        padding: `${sectionPadY} ${px}`,
        borderBottom: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr auto' : desktopCols,
        columnGap: colGap,
      }}>
        {(isMobile ? mobileHeaders[lang] : headers[lang]).map((h, idx) => (
          <span
            key={`${h}-${idx}`}
            style={{
              fontSize: 10,
              color: 'var(--muted)',
              letterSpacing: '0.08em',
              textTransform: 'lowercase',
              justifySelf: !isMobile && idx === 4 ? 'end' : 'start',
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {works.map((w, i) => (
        <WorkRow key={`${lang}-${w.slug}`} work={w} i={i} lang={lang} />
      ))}
    </section>
  )
}
