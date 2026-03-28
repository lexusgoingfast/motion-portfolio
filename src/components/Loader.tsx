import { useEffect, useRef, useState } from 'react'

export default function Loader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const W = window.innerWidth
    const H = window.innerHeight
    canvas.width = W
    canvas.height = H

    const isMobile = W < 768
    const fontSize = isMobile ? Math.min(W * 0.072, 38) : Math.min(W * 0.046, 58)
    const fontStr = `300 ${fontSize}px Arial, sans-serif`
    const cx = W / 2

    // Sample pixel positions from text
    const off = document.createElement('canvas')
    off.width = W
    off.height = H
    const oc = off.getContext('2d')!
    oc.fillStyle = '#fff'
    oc.font = fontStr
    oc.letterSpacing = '-1px'
    oc.textAlign = 'center'
    oc.textBaseline = 'middle'
    if (isMobile) {
      oc.fillText('ALEXEY', cx, H / 2 - fontSize * 0.72)
      oc.fillText('MAXIMOVSKIKH', cx, H / 2 + fontSize * 0.72)
    } else {
      oc.fillText('ALEXEY MAXIMOVSKIKH', cx, H / 2)
    }

    const { data } = oc.getImageData(0, 0, W, H)
    const points: { x: number; y: number }[] = []
    const gap = 4
    for (let y = 0; y < H; y += gap) {
      for (let x = 0; x < W; x += gap) {
        if (data[(y * W + x) * 4 + 3] > 128) points.push({ x, y })
      }
    }
    for (let i = points.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[points[i], points[j]] = [points[j], points[i]]
    }

    const N = Math.min(points.length, isMobile ? 500 : 1100)
    const particles = points.slice(0, N).map(p => ({
      sx: Math.random() * W,
      sy: Math.random() * H,
      tx: p.x,
      ty: p.y,
      size: Math.random() * 1.1 + 0.5,
      delay: Math.random() * 0.4,
    }))

    const ASSEMBLE = 1500  // particles fly
    const BLOOM    = 350   // dots grow to fill letters
    const FADE     = 550   // bloom dissolves into clean text
    const STROBE   = 380   // text flickers
    const HOLD     = 500   // clean text holds steady

    const easeOut   = (t: number) => 1 - Math.pow(1 - t, 3)
    const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    let startTime = 0
    let raf: number

    const drawDots = (elapsed: number, alpha: number, sizeScale: number) => {
      ctx.globalAlpha = alpha
      ctx.fillStyle = '#f0f0f0'
      for (const p of particles) {
        const localT = Math.max(0, Math.min(1, (elapsed - p.delay * ASSEMBLE) / (ASSEMBLE * 0.72)))
        const e = easeOut(localT)
        const x = p.sx + (p.tx - p.sx) * e
        const y = p.sy + (p.ty - p.sy) * e
        ctx.beginPath()
        ctx.arc(x, y, p.size * sizeScale, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const drawCleanText = (alpha: number) => {
      ctx.globalAlpha = alpha
      ctx.fillStyle = '#f0f0f0'
      ctx.font = fontStr
      ctx.letterSpacing = '-1px'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      if (isMobile) {
        ctx.fillText('ALEXEY', cx, H / 2 - fontSize * 0.72)
        ctx.fillText('MAXIMOVSKIKH', cx, H / 2 + fontSize * 0.72)
      } else {
        ctx.fillText('ALEXEY MAXIMOVSKIKH', cx, H / 2)
      }
      ctx.globalAlpha = 1
    }

    const draw = (ts: number) => {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      ctx.clearRect(0, 0, W, H)

      if (elapsed < ASSEMBLE) {
        // Particles flying to positions
        drawDots(elapsed, 1, 1)

      } else if (elapsed < ASSEMBLE + BLOOM) {
        // Dots grow to fill letter shapes
        const t = easeInOut((elapsed - ASSEMBLE) / BLOOM)
        drawDots(elapsed, 1, 1 + t * 2.8)

      } else if (elapsed < ASSEMBLE + BLOOM + FADE) {
        // Bloomed dots dissolve into clean text
        const t = easeOut((elapsed - ASSEMBLE - BLOOM) / FADE)
        drawDots(elapsed, 1 - t, 1 + 2.8)       // dots fade out at max size
        drawCleanText(t)                          // text fades in

      } else if (elapsed < ASSEMBLE + BLOOM + FADE + STROBE) {
        // Strobe: text flickers, intervals shrink over time (settles)
        const s = elapsed - ASSEMBLE - BLOOM - FADE
        const progress = s / STROBE
        const interval = 75 - progress * 30   // 75ms → 45ms, speeds up slightly
        const isOn = Math.floor(s / interval) % 2 === 0
        drawCleanText(isOn ? 1 : 0.04)

      } else {
        // Hold clean text steady
        drawCleanText(1)
        if (elapsed > ASSEMBLE + BLOOM + FADE + STROBE + HOLD) {
          setOpacity(0)
          setTimeout(onDone, 700)
          return
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: '#111111',
      opacity,
      transition: 'opacity 0.7s ease',
      pointerEvents: opacity < 0.5 ? 'none' : 'auto',
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh' }} />
    </div>
  )
}
