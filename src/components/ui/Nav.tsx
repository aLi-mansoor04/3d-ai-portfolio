import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { scrollState } from '../../lib/scrollState'

const ITEMS: { id: string; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

interface NavProps {
  visible: boolean
}

export default function Nav({ visible }: NavProps) {
  const [active, setActive] = useState('hero')
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!visible || !rootRef.current) return
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    )
  }, [visible])

  useEffect(() => {
    let raf = 0
    let last = ''
    const tick = () => {
      let current = 'hero'
      for (const [id, bounds] of Object.entries(scrollState.sections)) {
        if (scrollState.progress >= bounds.start - 0.02) current = id
      }
      if (current !== last) {
        last = current
        setActive(current)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <nav
      ref={rootRef}
      className="fixed left-1/2 top-5 z-40 -translate-x-1/2 opacity-0 sm:left-auto sm:right-6 sm:translate-x-0"
      aria-label="Primary"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0c0e15]/70 px-1.5 py-1.5 backdrop-blur-md">
        <a
          href="#hero"
          data-cursor="default"
          className="rounded-full px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wide text-[#ffb454]"
        >
          ALI
        </a>
        <span className="h-4 w-px bg-white/10" />
        {ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            data-cursor="default"
            className={`rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide transition-colors ${
              active === item.id ? 'bg-white/10 text-[#e9e6df]' : 'text-[#8b8f9c] hover:text-[#e9e6df]'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
