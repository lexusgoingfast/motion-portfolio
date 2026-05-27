import { useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'motion/react'
import { useCursorPreview } from '../CursorPreviewContext'
import { useIsMobile } from '../useIsMobile'

const spring = { stiffness: 620, damping: 26, mass: 0.4 }

export default function Cursor() {
  const { preview } = useCursorPreview()
  const isMobile = useIsMobile()
  const x = useSpring(-100, spring)
  const y = useSpring(-100, spring)

  useEffect(() => {
    if (isMobile) return
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y, isMobile])

  useEffect(() => {
    if (isMobile) return
    document.body.classList.toggle('work-cursor-active', !!preview)
    return () => document.body.classList.remove('work-cursor-active')
  }, [preview, isMobile])

  if (isMobile) return null

  const showPreview = !!preview
  const sized = preview && preview.width != null && preview.height != null

  return (
    <motion.div
      className="case-cursor"
      data-work-preview={showPreview ? '' : undefined}
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
        mixBlendMode: showPreview ? 'normal' : 'difference',
      }}
    >
      <AnimatePresence mode="wait">
        {showPreview && preview ? (
          <motion.div
            key={preview.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="work-cursor-preview"
          >
            <img
              src={preview.src}
              alt=""
              draggable={false}
              width={preview.variant === 'mosaic-gif' ? preview.width : sized ? preview.width : undefined}
              height={preview.variant === 'mosaic-gif' ? undefined : sized ? preview.height : undefined}
              className={
                preview.variant === 'mosaic-gif'
                  ? 'work-cursor-preview__img--mosaic-gif'
                  : sized
                    ? 'work-cursor-preview__img--sized'
                    : 'work-cursor-preview__img--native'
              }
            />
          </motion.div>
        ) : (
          <motion.svg
            key="crosshair"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <line x1="12" y1="0" x2="12" y2="9" stroke="#fff" strokeWidth="1" />
            <line x1="12" y1="15" x2="12" y2="24" stroke="#fff" strokeWidth="1" />
            <line x1="0" y1="12" x2="9" y2="12" stroke="#fff" strokeWidth="1" />
            <line x1="15" y1="12" x2="24" y2="12" stroke="#fff" strokeWidth="1" />
            <circle cx="12" cy="12" r="2" stroke="#fff" strokeWidth="1" fill="none" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
