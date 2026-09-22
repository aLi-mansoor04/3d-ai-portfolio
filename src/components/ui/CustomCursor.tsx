import { useEffect, useRef, useState } from 'react'
import { pointerState } from '../../lib/pointerState'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    document.body.classList.add('cursor-active')

    let raf = 0
    const loop = () => {
      const targetX = ((pointerState.x + 1) / 2) * window.innerWidth
      const y = ((1 - pointerState.y) / 2) * window.innerHeight

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${y}px, 0) translate(-50%, -50%)`
      }
      ring.current.x += (targetX - ring.current.x) * 0.18
      ring.current.y += (y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
      if (target) {
        setExpanded(true)
        setLabel(target.dataset.cursor === 'default' ? null : target.dataset.cursor ?? null)
      } else {
        const interactive = (e.target as HTMLElement)?.closest?.('a, button')
        setExpanded(Boolean(interactive))
        setLabel(null)
      }
    }
    document.addEventListener('mouseover', onOver)

    return () => {
      document.body.classList.remove('cursor-active')
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden sm:block" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[#ffb454]"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,border-color] duration-200 ${
          expanded ? 'h-16 w-16 border-[#ffb454]/70' : 'h-8 w-8 border-white/25'
        }`}
        style={{ willChange: 'transform' }}
      >
        {label && (
          <span className="font-mono text-[9px] tracking-wide text-[#ffb454] whitespace-nowrap">{label}</span>
        )}
      </div>
    </div>
  )
}
