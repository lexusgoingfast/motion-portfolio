import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useLang } from '../LangContext'
import { projects, getCasePagePath } from '../data/projects'

const viewLabel = { en: 'Open', ru: 'Откр' }
const sectionLabel = { en: 'I work with', ru: 'Работаю с' }

type WorkCardItem = {
  index: string
  slug: string
  shortTitle: string
  desc: string
}

function WorkCard({ work, i, lang }: { work: WorkCardItem; i: number; lang: 'en' | 'ru' }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const caseHref = getCasePagePath(work.slug)

  return (
    <motion.article
      ref={ref}
      className="work-card"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: i * 0.05 }}
    >
      <h3 className="work-card__head">
        <span className="work-card__index">{work.index}</span>
        <span className="work-card__title">{work.shortTitle}</span>
      </h3>
      <p className="work-card__desc">{work.desc}</p>
      <a className="work-card__link" href={caseHref}>
        {viewLabel[lang]}
        <span className="work-card__arrow" aria-hidden>↗</span>
      </a>
    </motion.article>
  )
}

export default function WorkList() {
  const { lang } = useLang()

  const works: WorkCardItem[] = projects.map(p => ({
    slug: p.slug,
    index: p.index,
    shortTitle: p[lang].shortTitle,
    desc: p[lang].desc,
  }))

  return (
    <section id="work" className="work-section">
      <header className="work-section__head">
        <motion.div
          className="work-section__label"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="work-section__title">{sectionLabel[lang]}</span>
          <div className="work-section__lines" aria-hidden>
            <span />
            <span />
          </div>
        </motion.div>
      </header>

      <div className="work-grid">
        {works.map((w, i) => (
          <WorkCard key={`${lang}-${w.slug}`} work={w} i={i} lang={lang} />
        ))}
      </div>
    </section>
  )
}
