import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLang } from '../LangContext'
import { useTheme } from '../ThemeContext'
import { t } from '../lang'


export default function Sidebar() {
  const { lang, toggle } = useLang()
  const { theme, toggle: toggleTheme } = useTheme()
  const tx = t[lang]
  const [active, setActive] = useState(tx.nav[0])
  const [infoOpen, setInfoOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = (
    <>
      {tx.nav.map((item, i) => (
        <motion.a
          key={item}
          href={`#${t.en.nav[i].toLowerCase().replace(/\s/g, '-')}`}
          onClick={() => { setActive(item); setMobileOpen(false) }}
          whileHover={{ backgroundColor: theme === 'dark' ? '#f0f0f0' : '#181818', color: theme === 'dark' ? '#111111' : '#ffffff' }}
          transition={{ duration: 0.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: isMobile ? '12px 24px' : '9px 24px 9px 10px',
            fontSize: 12,
            fontWeight: active === item ? 500 : 400,
            color: active === item ? 'var(--text)' : 'var(--muted)',
            cursor: 'none',
          }}
        >
          {item}
        </motion.a>
      ))}
    </>
  )

  /* ── MOBILE ── */
  if (isMobile) {
    return (
      <>
        <header style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 200,
          height: 52,
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '-0.02em' }}>
            {tx.name.split('\n')[0]}
          </span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {(['ru', 'en'] as const).map(l => (
              <button key={l} onClick={toggle} style={{
                background: 'none', border: 'none', padding: 0,
                fontSize: 11, fontFamily: 'inherit',
                color: lang === l ? 'var(--text)' : 'var(--muted)',
                fontWeight: lang === l ? 500 : 400,
                cursor: 'none',
                textDecoration: lang === l ? 'underline' : 'none',
                textUnderlineOffset: 3,
              }}>
                {l}
              </button>
            ))}
            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', padding: 0, cursor: 'none', display: 'flex', alignItems: 'center', color: 'var(--muted)' }}>
              {theme === 'light' ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'none', color: 'var(--text)', lineHeight: 1 }}
            >
              {mobileOpen ? '✕' : '☰'}
            </motion.button>
          </div>
        </header>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 52, left: 0, right: 0,
                zIndex: 199,
                background: 'var(--bg)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              <nav>{navItems}</nav>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  /* ── DESKTOP ── */
  return (
    <aside style={{
      position: 'sticky',
      top: 0,
      height: '100vh',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '0 0 24px',
      overflowY: 'hidden',
    }}>
      {/* Photo */}
      <div style={{ padding: '10px 10px 0' }}>
        <img src="/me.png" alt="" style={{ width: 150, height: 225, objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'grayscale(100%)' }} />
      </div>

      {/* Name */}
      <div style={{ padding: '20px 10px 0' }}>
        {tx.name.split('\n').map((line, i) => (
          <div key={i} style={{
            fontSize: i === 0 ? 13 : 11,
            fontWeight: i === 0 ? 600 : 0,
            letterSpacing: i === 0 ? '-0.02em' : '0',
            lineHeight: i === 0 ? 1.3 : 1.6,
            color: i === 0 ? 'var(--text)' : 'var(--muted)',
            marginTop: i === 1 ? 6 : 0,
          }}>
            {line}
          </div>
        ))}
      </div>

      {/* Scroll progress ruler */}
      <div style={{ padding: '14px 10px 4px' }}>
        <div style={{ position: 'relative', height: 10 }}>
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, height: 1, background: 'var(--muted)', opacity: 0.25 }} />
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0, width: `${scrollProgress * 100}%`, height: 1, background: 'var(--muted)', transition: 'width 0.1s linear' }} />
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'var(--muted)', opacity: 0.4 }} />
          <div style={{ position: 'absolute', left: 'calc(50% - 0.5px)', top: '20%', bottom: '20%', width: 1, background: 'var(--muted)', opacity: 0.4 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, background: 'var(--muted)', opacity: 0.4 }} />
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: 0, flex: 1 }}>{navItems}</nav>

      {/* Bottom */}
      <div style={{ padding: '0 10px' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'center' }}>
          {(['ru', 'en'] as const).map(l => (
            <button key={l} onClick={toggle} style={{
              background: 'none', border: 'none', padding: 0,
              fontSize: 11, fontFamily: 'inherit',
              color: lang === l ? 'var(--text)' : 'var(--muted)',
              fontWeight: lang === l ? 500 : 400,
              cursor: 'none',
              textDecoration: lang === l ? 'underline' : 'none',
              textUnderlineOffset: 3,
            }}>
              {l}
            </button>
          ))}
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', padding: 0, cursor: 'none', display: 'flex', alignItems: 'center', color: 'var(--muted)' }}>
            {theme === 'light' ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>

        <div onClick={() => setInfoOpen(!infoOpen)} style={{ fontSize: 11, color: 'var(--muted)', cursor: 'none', marginBottom: 8, userSelect: 'none' }}>
          [ {tx.info} {infoOpen ? '−' : '+'} ]
        </div>

        <AnimatePresence>
          {infoOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.9, paddingBottom: 16 }}>
                {tx.available}<br />
                {tx.location}<br /><br />
                <a href={`mailto:${tx.email}`} style={{ borderBottom: '1px solid var(--border)', cursor: 'none' }}>{tx.email}</a><br />
                <span>{tx.telegram}</span><br />
                <a href="https://www.are.na/alexey-maximovskikh-6txsyyonlgg/channels" target="_blank" rel="noreferrer" style={{ borderBottom: '1px solid var(--border)', cursor: 'none' }}>Are.na</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.2)', marginTop: 12 }}>© {new Date().getFullYear()}</div>
      </div>
    </aside>
  )
}
