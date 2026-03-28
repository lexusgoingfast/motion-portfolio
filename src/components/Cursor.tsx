import { useEffect } from 'react'
import { motion, useSpring } from 'motion/react'

export default function Cursor() {
  const x = useSpring(-100, { stiffness: 500, damping: 32, mass: 0.5 })
  const y = useSpring(-100, { stiffness: 500, damping: 32, mass: 0.5 })

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="0"  x2="12" y2="9"  stroke="#fff" strokeWidth="1" />
        <line x1="12" y1="15" x2="12" y2="24" stroke="#fff" strokeWidth="1" />
        <line x1="0"  y1="12" x2="9"  y2="12" stroke="#fff" strokeWidth="1" />
        <line x1="15" y1="12" x2="24" y2="12" stroke="#fff" strokeWidth="1" />
        <circle cx="12" cy="12" r="2" stroke="#fff" strokeWidth="1" fill="none" />
      </svg>
    </motion.div>
  )
}
