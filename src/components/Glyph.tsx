import { motion } from 'motion/react'

export default function Glyph() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Outer circle — slow rotate */}
      <motion.circle
        cx="32" cy="32" r="28"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
        strokeDasharray="4 6"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '32px', originY: '32px' }}
      />

      {/* Inner circle */}
      <circle cx="32" cy="32" r="10" stroke="rgba(0,0,0,0.5)" strokeWidth="1" />

      {/* Cross — full length */}
      <line x1="32" y1="0"  x2="32" y2="22" stroke="#181818" strokeWidth="1" />
      <line x1="32" y1="42" x2="32" y2="64" stroke="#181818" strokeWidth="1" />
      <line x1="0"  y1="32" x2="22" y2="32" stroke="#181818" strokeWidth="1" />
      <line x1="42" y1="32" x2="64" y2="32" stroke="#181818" strokeWidth="1" />

      {/* Center dot */}
      <motion.circle
        cx="32" cy="32" r="1.5"
        fill="#181818"
        animate={{ scale: [1, 2, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
