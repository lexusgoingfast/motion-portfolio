import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'motion/react'
import { useLang } from '../LangContext'
import { useIsMobile } from '../useIsMobile'
import { projects, getCasePagePath } from '../data/projects'
import EnterButton from './EnterButton'

const enterLabel = { en: 'Open', ru: 'открыть' }
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
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={open ? (lang === 'ru' ? 'Свернуть кейс' : 'Collapse case') : (lang === 'ru' ? 'Развернуть кейс' : 'Expand case')}
        className="work-row-toggle"
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(!open)
          }
        }}
        style={{
          padding: `${rowPadY} ${px}`,
          background: hovered ? 'var(--hover)' : 'transparent',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div className="work-row-toggle__head">
          <div className="work-row-toggle__main">
            <span className="work-row-toggle__index">{work.index}</span>
            <h3 className="work-row-toggle__title">{work.title}</h3>
          </div>
          <motion.span
            className="work-row-toggle__icon"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden
          >
            +
          </motion.span>
        </motion.div>

        <div className="work-row-meta">
          <span className="work-row-meta__cat">{work.category}</span>
          <span className="work-row-meta__year">{work.year}</span>
        </div>
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
            <motion.div style={{ padding: `0 ${px} var(--gap-stack-lg)` }}>
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
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--gap-tags)',
                  flexWrap: 'wrap',
                  marginBottom: 'var(--gap-stack-md)',
                }}
              >
                {work.tags.map(tag => (
                  <span
                    key={tag}
                    className="chip"
                    style={{
                      padding: '5px 12px',
                      border: '1px solid var(--border)',
                      fontSize: 10,
                      color: 'var(--muted)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <EnterButton
                  href={caseHref}
                  label={enterLabel[lang]}
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            </motion.div>
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
