import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useLang } from '../LangContext'
import { t } from '../lang'
import { useIsMobile } from '../useIsMobile'

export default function ServicesSection() {
  const { lang } = useLang()
  const tx = t[lang]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()
  const px = isMobile ? 'var(--pad-x-mobile)' : 'var(--pad-x)'
  const sectionPadY = isMobile ? 'var(--pad-section-y-mobile)' : 'var(--pad-section-y)'

  return (
    <section ref={ref} id="services" style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ padding: `${sectionPadY} ${px}`, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{tx.services_label}</span>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>03</span>
      </div>

      {tx.services.map(([title, desc], i) => (
        <motion.div
          key={title}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 12 : 48,
            padding: isMobile ? `var(--pad-row-y-mobile) ${px}` : `var(--pad-row-y) ${px}`,
            borderBottom: '1px solid var(--border)',
            alignItems: 'start',
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text)' }}>{title}</span>
          <span style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</span>
        </motion.div>
      ))}

      <div style={{
        padding: `var(--gap-stack-md) ${px} var(--gap-stack-lg)`,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 12 : 48,
        alignItems: 'start',
      }}>
        <span style={{ fontSize: 10, color: 'var(--muted)',  }}>{tx.tools_label}</span>
        <span style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.9 }}>{tx.tools}</span>
      </div>
    </section>
  )
}
