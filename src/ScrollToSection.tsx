import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'

export default function ScrollToSection() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return
    const behavior = scrollBehavior()
    const scrollTo = (id: string) => {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior })
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
  }, [pathname, state])

  return null
}
