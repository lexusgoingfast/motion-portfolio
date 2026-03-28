import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useLang } from '../LangContext'
import { t } from '../lang'
import { useIsMobile } from '../useIsMobile'

export default function ExperienceSection() {
  const { lang } = useLang()
  const tx = t[lang]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  const colItem = (label: string, role: string, period: string, last: boolean) => (
    <motion.div
      key={label + period}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
      style={{ padding: '18px 0', borderBottom: last ? 'none' : '1px solid var(--border)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em' }}>{label}</span>
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>{period}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.6 }}>{role}</div>
    </motion.div>
  )

  return (
    <section ref={ref} id="experience" style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{
        padding: isMobile ? '20px 24px' : '20px 48px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{tx.exp_label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {!isMobile && <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{tx.edu_label}</span>}
          <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>04</span>
        </div>
      </div>

      {isMobile ? (
        <div style={{ padding: '0 20px' }}>
          {tx.experience.map((item, i) => colItem(item.company, item.role, item.period, i === tx.experience.length - 1))}
          <div style={{ fontSize: 10, color: 'var(--muted)', padding: '20px 0 0' }}>{tx.edu_label}</div>
          {tx.education.map((item, i) => colItem(item.school, item.program, item.period, i === tx.education.length - 1))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '0 48px' }}>
          <div style={{ paddingRight: 40, borderRight: '1px solid var(--border)' }}>
            {tx.experience.map((item, i) => colItem(item.company, item.role, item.period, i === tx.experience.length - 1))}
          </div>
          <div style={{ paddingLeft: 40 }}>
            {tx.education.map((item, i) => colItem(item.school, item.program, item.period, i === tx.education.length - 1))}
          </div>
        </div>
      )}
    </section>
  )
}
