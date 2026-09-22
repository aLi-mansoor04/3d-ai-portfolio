// A lightweight, mutable scroll-progress tracker read directly inside R3F's
// useFrame loop. Deliberately NOT React state — updating on every scroll
// pixel via setState would re-render the whole tree every frame. Components
// that need reactive (not per-frame) access should use the exported hooks
// in useScrollProgress.ts instead.

export interface SectionBounds {
  start: number
  end: number
}

export interface ScrollState {
  progress: number
  velocity: number
  sections: Record<string, SectionBounds>
}

export const scrollState: ScrollState = {
  progress: 0,
  velocity: 0,
  sections: {},
}

let cleanup: (() => void) | null = null

export function initScrollTracking(): () => void {
  if (cleanup) return cleanup

  const computeBoundaries = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    if (total <= 0) return
    document.querySelectorAll<HTMLElement>('[data-scene-section]').forEach((el) => {
      const id = el.dataset.sceneSection
      if (!id) return
      const start = el.offsetTop / total
      const end = (el.offsetTop + el.offsetHeight) / total
      scrollState.sections[id] = {
        start: Math.max(0, Math.min(1, start)),
        end: Math.max(0, Math.min(1, end)),
      }
    })
  }

  let lastY = window.scrollY
  let lastT = performance.now()

  const onScroll = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    const now = performance.now()
    const dt = Math.max(1, now - lastT)
    const y = window.scrollY
    scrollState.velocity = (y - lastY) / dt
    lastY = y
    lastT = now
    scrollState.progress = total > 0 ? Math.min(1, Math.max(0, y / total)) : 0
  }

  computeBoundaries()
  onScroll()

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', computeBoundaries)

  const ro = new ResizeObserver(computeBoundaries)
  ro.observe(document.body)

  cleanup = () => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', computeBoundaries)
    ro.disconnect()
    cleanup = null
  }
  return cleanup
}

export function getSectionProgress(id: string): number {
  const b = scrollState.sections[id]
  if (!b) return 0
  if (scrollState.progress <= b.start) return 0
  if (scrollState.progress >= b.end) return 1
  return (scrollState.progress - b.start) / Math.max(0.0001, b.end - b.start)
}
