import { useRef } from 'react'
import { useIsMobile } from '../useIsMobile'
import { motion, useInView } from 'motion/react'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import { t } from '../lang'

export default function AboutSection() {
  const { lang } = useLang()
  const { theme } = useTheme()
  const tx = t[lang]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()
  const p = isMobile ? '48px var(--pad-x-mobile)' : '88px var(--pad-x)'
  const lp = isMobile ? 'var(--pad-section-y-mobile) var(--pad-x-mobile)' : 'var(--pad-section-y) var(--pad-x)'

  return (
    <section ref={ref} id="about" style={{ borderBottom: '1px solid var(--border)' }}>
      <div style={{ padding: lp, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{tx.about_label}</span>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>02</span>
      </div>

      <div style={{
        padding: p,
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 40 : 72,
        alignItems: 'start',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontSize: 17, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.55, marginBottom: 'var(--gap-stack-md)' }}>
            {tx.about_title}
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9 }}>
            {tx.about_body}
          </p>

          <div style={{ marginTop: 'var(--gap-stack-lg)' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 'var(--gap-stack-sm)' }}>
              {tx.roles_label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--gap-tags)' }}>
              {tx.roles.map(role => (
                <motion.span
                  key={role}
                  className="chip"
                  whileHover={{ backgroundColor: theme === 'dark' ? '#f0f0f0' : '#181818', color: theme === 'dark' ? '#111111' : '#ffffff', borderColor: theme === 'dark' ? '#f0f0f0' : '#181818' }}
                  transition={{ duration: 0.15 }}
                  style={{
                    padding: '4px 10px',
                    border: '1px solid var(--border)',
                    fontSize: 11,
                    color: 'var(--muted)',
                    cursor: 'none',
                    display: 'inline-block',
                  }}
                >
                  {role}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {tx.about_table.map(([label, value]) => (
            <div key={label} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: '1px solid var(--border)',
              fontSize: 12,
              gap: 16,
            }}>
              <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{label}</span>
              <span style={{ color: 'var(--text)', textAlign: 'right' }}>{value}</span>
            </div>
          ))}

          <div style={{ marginTop: 'var(--gap-stack-md)' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 'var(--gap-stack-sm)' }}>
              {tx.approach_label}
            </div>
            {tx.approach.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                style={{
                  fontSize: 12,
                  color: 'var(--muted)',
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 8 }}>—</span>
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
