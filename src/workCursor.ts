import type { ProjectSlug } from './data/projects'

export type WorkCursorPreview = {
  kind: 'image'
  src: string
  width?: number
  height?: number
  variant?: 'mosaic-gif'
}

export const WORK_CURSOR_BY_SLUG: Record<ProjectSlug, WorkCursorPreview> = {
  'mosaic-concept-store': { kind: 'image', src: '/assets/work-hover/motion-logogo.gif', width: 100, variant: 'mosaic-gif' },
  'mosaic-logo-animation': { kind: 'image', src: '/assets/work-hover/motion-logogo.gif', width: 100, variant: 'mosaic-gif' },
  'ux-ui-ibls': { kind: 'image', src: '/cases/me.png', width: 112, height: 148 },
  'visual-digital-pik': { kind: 'image', src: '/cases/me.png', width: 112, height: 148 },
  'ai-visual-tape': { kind: 'image', src: '/cases/me.png', width: 112, height: 148 },
  'kinetic-glitch-type': { kind: 'image', src: '/cases/me.png', width: 112, height: 148 },
}

export function getWorkCursorPreview(slug: string): WorkCursorPreview | null {
  return WORK_CURSOR_BY_SLUG[slug as ProjectSlug] ?? null
}
