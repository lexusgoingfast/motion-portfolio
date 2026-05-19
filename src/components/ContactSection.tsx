import { useRef } from 'react'
import { useIsMobile } from '../useIsMobile'
import { motion, useInView } from 'motion/react'
import { useLang } from '../LangContext'
import { t } from '../lang'

const linkStyle: React.CSSProperties = {
  color: 'var(--text)',
  borderBottom: '1px solid var(--border)',
  textDecoration: 'none',
  cursor: 'none',
}

export default function ContactSection() {
  const { lang } = useLang()
  const tx = t[lang]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isMobile = useIsMobile()

  const contacts = [
    { label: tx.contact_email_label, href: `mailto:${tx.email}`, text: tx.email },
    { label: tx.contact_telegram_label, href: tx.telegramUrl, text: tx.telegram, external: true },
    { label: tx.contact_phone_label, href: `tel:${tx.phone.replace(/\s/g, '')}`, text: tx.phone },
  ] as const

  return (
    <section ref={ref} id="contact">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          padding: isMobile ? 'var(--pad-section-y-mobile) var(--pad-x-mobile)' : 'var(--pad-section-y) var(--pad-x)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{tx.contact_label}</span>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>05</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.05 }}
        style={{
          padding: isMobile ? '48px var(--pad-x-mobile)' : '88px var(--pad-x)',
          maxWidth: 560,
        }}
      >
        <p style={{
          fontSize: 18,
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.5,
          marginBottom: 24,
          whiteSpace: 'pre-line',
        }}>
          {tx.contact_title}
        </p>
        <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.9, whiteSpace: 'pre-line', marginBottom: 32 }}>
          {tx.contact_sub}
        </p>

        {contacts.map(({ label, href, text, ...rest }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              display: 'flex',
              gap: 16,
              padding: '9px 0',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <span style={{ width: 72, flexShrink: 0 }}>{label}</span>
            <a
              href={href}
              style={linkStyle}
              {...('external' in rest && rest.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {text}
            </a>
          </motion.div>
        ))}
      </motion.div>

      <div style={{
        padding: isMobile ? '24px var(--pad-x-mobile)' : '24px var(--pad-x)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 10,
        color: 'var(--muted)',
      }}>
        <span>alexey maximovskikh © {new Date().getFullYear()}</span>
      </div>
    </section>
  )
}
