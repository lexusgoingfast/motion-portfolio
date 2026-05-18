import { useCallback, useEffect, useState } from 'react'
import type Lenis from 'lenis'
import { useLenis } from 'lenis/react'

function readProgress(lenis: Lenis) {
  const limit = lenis.limit
  if (limit <= 0) return 0
  return Math.min(1, Math.max(0, lenis.scroll / limit))
}

function readNativeProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  const onScroll = useCallback((lenis: Lenis) => {
    setProgress(readProgress(lenis))
  }, [])

  const lenis = useLenis(onScroll)

  useEffect(() => {
    if (!lenis) return
    onScroll(lenis)
    const sync = () => {
      lenis.resize()
      onScroll(lenis)
    }
    window.addEventListener('resize', sync, { passive: true })
    const ro = new ResizeObserver(sync)
    ro.observe(document.documentElement)
    return () => {
      window.removeEventListener('resize', sync)
      ro.disconnect()
    }
  }, [lenis, onScroll])

  useEffect(() => {
    if (lenis) return
    const update = () => setProgress(readNativeProgress())
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [lenis])

  return progress
}
