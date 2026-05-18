import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useIsMobile } from '../useIsMobile'

type EnterButtonProps = {
  href: string
  label: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const EASE = [0.16, 1, 0.3, 1] as const
const DURATION = 0.55

export default function EnterButton({ href, label, onClick }: EnterButtonProps) {
  const [hovered, setHovered] = useState(false)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.body.classList.toggle('enter-btn-hover', hovered)
    return () => document.body.classList.remove('enter-btn-hover')
  }, [hovered])

  return (
    <motion.a
      href={href}
      className="enter-btn"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-hovered={hovered || undefined}
      style={{ cursor: isMobile ? 'pointer' : 'none' }}
      whileTap={{ scale: 0.98 }}
    >
      {!reduceMotion && (
        <span className="enter-btn__clip" aria-hidden>
          <span className="enter-btn__surface" />
          <motion.span
            className="enter-btn__fill"
            initial={false}
            animate={{ scaleY: hovered ? 1 : 0 }}
            transition={{ duration: DURATION, ease: EASE }}
          />
        </span>
      )}
      <span className="enter-btn__content">
        <span className="enter-btn__label">
          <span className="enter-btn__viewport">
            <motion.span
              className="enter-btn__text-track"
              initial={false}
              animate={
                reduceMotion
                  ? { y: '0%' }
                  : hovered
                    ? { y: ['0%', '-115%', '115%', '0%'] }
                    : { y: '0%' }
              }
              transition={{
                duration: DURATION,
                ease: EASE,
                times: hovered ? [0, 0.36, 0.36, 1] : undefined,
              }}
            >
              <span className="enter-btn__text">{label}</span>
            </motion.span>
          </span>
          <motion.span
            className="enter-btn__arrow"
            aria-hidden
            initial={false}
            animate={
              reduceMotion
                ? { x: 0, y: 0 }
                : { x: hovered ? 2 : 0, y: hovered ? -2 : 0 }
            }
            transition={{ duration: 0.4, ease: EASE, delay: hovered ? 0.2 : 0 }}
          >
            <svg
              className="enter-btn__arrow-svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17L17 7M17 7H9M17 7V15" />
            </svg>
          </motion.span>
        </span>
      </span>
    </motion.a>
  )
}
