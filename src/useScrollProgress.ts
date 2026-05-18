import { useEffect, useState } from 'react'
import { useLenis } from 'lenis/react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const lenis = useLenis((instance) => {
    setProgress(instance.progress)
  })

  useEffect(() => {
    if (lenis) return
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [lenis])

  return progress
}
