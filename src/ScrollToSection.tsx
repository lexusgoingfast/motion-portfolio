import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToSection() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    if (pathname !== '/') return
    const s = state && typeof state === 'object' && 'section' in state
      ? String((state as { section: string }).section)
      : ''
    if (s) {
      requestAnimationFrame(() => {
        document.getElementById(s)?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    const h = window.location.hash.replace(/^#/, '')
    if (h) {
      requestAnimationFrame(() => {
        document.getElementById(h)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [pathname, state])

  return null
}
