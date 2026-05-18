import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

export default function ScrollToSection() {
  const { pathname, state } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (pathname !== '/') return

    const scrollTo = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      requestAnimationFrame(() => {
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.35 })
          return
        }
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
      })
    }

    const s = state && typeof state === 'object' && 'section' in state
      ? String((state as { section: string }).section)
      : ''
    if (s) {
      scrollTo(s)
      return
    }
    const h = window.location.hash.replace(/^#/, '')
    if (h) scrollTo(h)
  }, [pathname, state, lenis])

  return null
}
