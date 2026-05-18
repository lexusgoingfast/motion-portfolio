import { useRef } from 'react'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { useIsMobile } from '../useIsMobile'

type EnterButtonProps = {
  href: string
  label: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function EnterButton({ href, label, onClick }: EnterButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isMobile = useIsMobile()
  const reduceMotion = useReducedMotion()
  const x = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 })
  const y = useSpring(0, { stiffness: 200, damping: 20, mass: 0.4 })
  const scale = useSpring(1, { stiffness: 320, damping: 24 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.45)
    y.set((e.clientY - cy) * 0.45)
    scale.set(1.08)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
    scale.set(1)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className="enter-btn"
      aria-label={label}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y, scale }}
      whileTap={{ scale: 0.92 }}
    >
      <span className="enter-btn__orbit" aria-hidden />
      <span className="enter-btn__label">{label}</span>
    </motion.a>
  )
}
