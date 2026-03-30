import { useRef, useState } from 'react'
import { useIsMobile } from '../useIsMobile'
import { motion, useInView } from 'motion/react'
import { useLang } from '../LangContext'
import { t } from '../lang'

export default function ContactSection() {
  const { lang } = useLang()
  const tx = t[lang]
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const isMobile = useIsMobile()

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text)',
    fontSize: 12,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <section ref={ref} id="contact">
      <div style={{ padding: isMobile ? '20px 24px' : '20px 48px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.08em' }}>{tx.contact_label}</span>
        <span style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '0.06em' }}>05</span>
      </div>

      <div style={{
        padding: isMobile ? '40px 24px' : '80px 48px',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 32 : 64,
        alignItems: 'start',
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
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

          {[
            ['email', tx.email],
            ['telegram', tx.telegram],
          ].map(([platform, handle]) => (
            <div key={platform} style={{
              fontSize: 11,
              color: 'var(--muted)',
              display: 'flex',
              gap: 16,
              padding: '9px 0',
              borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ width: 72, flexShrink: 0 }}>{platform}</span>
              <span style={{ color: 'var(--text)' }}>{handle}</span>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={(e) => { e.preventDefault(); setSent(true) }}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          {([
            ['name', tx.name_pl, 'name', 'text'],
            ['email', tx.email_pl, 'email', 'email'],
          ] as [string, string, keyof typeof form, string][]).map(([label, placeholder, field, type]) => (
            <div key={field}>
              <label style={{ display: 'block', fontSize: 10, color: 'var(--muted)', marginBottom: 6 }}>
                {label}
              </label>
              <input
                type={type}
                style={inputStyle}
                placeholder={placeholder}
                value={form[field]}
                onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                onFocus={e => (e.target.style.borderBottomColor = 'rgba(0,0,0,0.45)')}
                onBlur={e => (e.target.style.borderBottomColor = 'var(--border)')}
                required
              />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: 10, color: 'var(--muted)', marginBottom: 6 }}>
              message
            </label>
            <textarea
              rows={4}
              style={{ ...inputStyle, resize: 'none' }}
              placeholder={tx.msg_pl}
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              onFocus={e => (e.target.style.borderBottomColor = 'rgba(0,0,0,0.45)')}
              onBlur={e => (e.target.style.borderBottomColor = 'var(--border)')}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            style={{
              alignSelf: 'flex-start',
              padding: '10px 0',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.4)',
              fontSize: 12,
              fontWeight: 500,
              color: sent ? 'var(--muted)' : 'var(--text)',
              cursor: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            {sent ? tx.sent : tx.send}
          </motion.button>
        </motion.form>
      </div>

      <div style={{
        padding: '24px 48px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 10,
        color: 'rgba(0,0,0,0.22)',
      }}>
        <span>alexey maximovskikh © {new Date().getFullYear()}</span>
      </div>
    </section>
  )
}
