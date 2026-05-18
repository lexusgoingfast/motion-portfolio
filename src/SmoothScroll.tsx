import { useState } from 'react'
import { ReactLenis } from 'lenis/react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  if (!enabled) return <>{children}</>

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1,
        syncTouch: true,
        syncTouchLerp: 0.08,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
