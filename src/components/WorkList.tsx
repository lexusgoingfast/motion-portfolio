import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { useLang } from '../LangContext'
import { useIsMobile } from '../useIsMobile'
import { projects, getCasePagePath } from '../data/projects'

const viewLabel = { en: 'View project →', ru: 'Открыть →' }
const sectionLabel = { en: 'Work', ru: 'Работы' }

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
  const caseHref = getCasePagePath(work.slug)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: i * 0.06 }}
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <motion.div
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 'var(--gap-stack-sm)',
          padding: `${rowPadY} ${px}`,
          cursor: 'none',
          background: hovered ? 'var(--hover)' : 'transparent',
          transition: 'background 0.15s',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--gap-stack-md)',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                display: 'block',
                fontSize: 10,
                color: 'var(--muted)',
                letterSpacing: '0.12em',
                marginBottom: 10,
              }}
            >
              {work.index}
            </span>
            <h3
              style={{
                fontSize: isMobile ? 15 : 17,
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
                color: 'var(--text)',
              }}
            >
              {work.title}
            </h3>
          </div>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            style={{
              flexShrink: 0,
              fontSize: 15,
              color: 'var(--muted)',
              lineHeight: 1,
              marginTop: 18,
            }}
          >
            +
          </motion.span>
        </motion.div>

        <motion.div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--gap-stack-sm) var(--gap-stack-md)',
          }}
        >
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{work.category}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', opacity: 0.5 }}>·</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>{work.year}</span>
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
              whiteSpace: 'nowrap',
              marginLeft: isMobile ? 0 : 'auto',
            }}
          >
            {viewLabel[lang]}
          </a>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: `0 ${px} var(--gap-stack-lg)` }}>
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  lineHeight: 1.9,
                  maxWidth: 560,
                  marginBottom: 'var(--gap-stack-md)',
                }}
              >
                {work.desc}
              </p>
              <div style={{ display: 'flex', gap: 'var(--gap-tags)', flexWrap: 'wrap' }}>
                {work.tags.map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: '5px 12px',
                      border: '1px solid var(--border)',
                      borderRadius: 2,
                      fontSize: 10,
                      color: 'var(--muted)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function WorkList() {
  const { lang } = useLang()
  const isMobile = useIsMobile()
  const px = isMobile ? 'var(--pad-x-mobile)' : 'var(--pad-x)'
  const sectionPadY = isMobile ? 'var(--pad-section-y-mobile)' : 'var(--pad-section-y)'

  const works: WorkRowItem[] = projects.map(p => ({
    slug: p.slug,
    index: p.index,
    title: p[lang].title,
    year: p[lang].year,
    category: p[lang].category,
    desc: p[lang].desc,
    tags: p[lang].tags,
  }))

  return (
    <section id="work">
      <div
        style={{
          padding: `${sectionPadY} ${px}`,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'lowercase',
          }}
        >
          {sectionLabel[lang]}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {works.map((w, i) => (
          <WorkRow key={`${lang}-${w.slug}`} work={w} i={i} lang={lang} />
        ))}
      </div>
    </section>
  )
}
