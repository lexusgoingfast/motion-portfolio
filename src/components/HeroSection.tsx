import { useEffect, useRef } from 'react'
import { animate, stagger } from 'motion'
import { useLang } from '../LangContext'
import { t } from '../lang'
import { useIsMobile } from '../useIsMobile'

function RegMark({ size = 28 }: { size?: number }) {
  const r = size * 0.3
  const half = size / 2
  const gap = size * 0.14
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" stroke="currentColor" strokeWidth="0.75">
      <circle cx={half} cy={half} r={r} />
      <line x1={half} y1={0} x2={half} y2={half - r - gap} />
      <line x1={half} y1={half + r + gap} x2={half} y2={size} />
      <line x1={0} y1={half} x2={half - r - gap} y2={half} />
      <line x1={half + r + gap} y1={half} x2={size} y2={half} />
    </svg>
  )
}

export default function HeroSection() {
  const { lang } = useLang()
  const tx = t[lang]
  const isMobile = useIsMobile()
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const words = Array.from(ref.current.querySelectorAll<HTMLElement>('[data-word]'))
    words.forEach(w => { w.style.opacity = '0'; w.style.transform = 'translateY(6px)' })
    animate(words, { opacity: [0, 1], y: [6, 0] }, {
      delay: stagger(0.025),
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    })
  }, [lang])

  return (
    <section style={{
      padding: isMobile ? '36px 24px 48px' : '48px 48px 64px',
      borderBottom: '1px solid var(--border)',
    }}>

      <p
        ref={ref}
        style={{
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          fontWeight: 300,
          lineHeight: 1.75,
          letterSpacing: '-0.01em',
          maxWidth: 640,
          color: 'var(--text)',
        }}
      >
        {tx.hero.split(' ').map((word, i) => (
          <span key={`${lang}-${i}`}>
            <span data-word style={{ display: 'inline', opacity: 0 }}>{word}</span>
            {' '}
          </span>
        ))}
      </p>
    </section>
  )
}
