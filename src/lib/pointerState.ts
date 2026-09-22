// Normalized (-1..1) pointer position, read per-frame for subtle camera/core
// parallax. Mirrors scrollState's pattern of a mutable singleton rather than
// React state, since it updates on every pointermove.

export const pointerState = { x: 0, y: 0, active: false }

let cleanup: (() => void) | null = null

export function initPointerTracking(): () => void {
  if (cleanup) return cleanup

  const onMove = (e: PointerEvent) => {
    pointerState.x = (e.clientX / window.innerWidth) * 2 - 1
    pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1)
    pointerState.active = true
  }
  const onLeave = () => {
    pointerState.active = false
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerleave', onLeave)

  cleanup = () => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerleave', onLeave)
    cleanup = null
  }
  return cleanup
}
