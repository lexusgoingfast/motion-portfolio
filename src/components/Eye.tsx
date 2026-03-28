import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

export default function Eye({ size = 80 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxMove = size * 0.14
      const ratio = Math.min(dist, 120) / 120
      setPupil({ x: (dx / dist || 0) * maxMove * ratio, y: (dy / dist || 0) * maxMove * ratio })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [size])

  const r = size / 2
  const rx = r * 0.72
  const ry = r * 0.42

  return (
    <div ref={ref} style={{ display: 'inline-block', width: size, height: size / 1.3 }}>
      <svg width={size} height={size / 1.3} viewBox={`0 0 ${size} ${size / 1.3}`} overflow="visible">
        {/* Eye outline */}
        <ellipse cx={r} cy={r * 0.65} rx={rx} ry={ry} fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="1" />
        {/* Iris */}
        <motion.circle
          cx={r + pupil.x}
          cy={r * 0.65 + pupil.y}
          r={ry * 0.55}
          fill="rgba(0,0,0,0.08)"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="0.8"
          animate={{ cx: r + pupil.x, cy: r * 0.65 + pupil.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        />
        {/* Pupil */}
        <motion.circle
          cx={r + pupil.x}
          cy={r * 0.65 + pupil.y}
          r={ry * 0.22}
          fill="rgba(0,0,0,0.75)"
          animate={{ cx: r + pupil.x, cy: r * 0.65 + pupil.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        />
      </svg>
    </div>
  )
}
