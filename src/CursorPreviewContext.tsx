import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { WorkCursorPreview } from './workCursor'

type CursorPreviewContextValue = {
  preview: WorkCursorPreview | null
  setPreview: (preview: WorkCursorPreview | null) => void
}

const CursorPreviewContext = createContext<CursorPreviewContextValue | null>(null)

export function CursorPreviewProvider({ children }: { children: ReactNode }) {
  const [preview, setPreviewState] = useState<WorkCursorPreview | null>(null)
  const setPreview = useCallback((next: WorkCursorPreview | null) => {
    setPreviewState(next)
  }, [])

  const value = useMemo(() => ({ preview, setPreview }), [preview, setPreview])

  return (
    <CursorPreviewContext.Provider value={value}>
      {children}
    </CursorPreviewContext.Provider>
  )
}

export function useCursorPreview() {
  const ctx = useContext(CursorPreviewContext)
  if (!ctx) throw new Error('useCursorPreview must be used within CursorPreviewProvider')
  return ctx
}
