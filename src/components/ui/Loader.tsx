import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const LINES = ['INITIALIZING AI SYSTEM...', 'LOADING KNOWLEDGE...', 'LOADING PROJECTS...', 'SYSTEM READY']

interface LoaderProps {
  onComplete: () => void
  reducedMotion: boolean
}

export default function Loader({ onComplete, reducedMotion }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])
  const counterRef = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => {
        setDone(true)
        onComplete()
      }, 350)
      return () => clearTimeout(t)
    }

    const counter = { value: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        onComplete()
      },
    })

    lineRefs.current.forEach((el, i) => {
      if (!el) return
      tl.fromTo(
        el,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' },
        i * 0.42,
      )
      if (i < LINES.length - 1) {
        tl.to(el, { opacity: 0.25, duration: 0.2, ease: 'power1.in' }, i * 0.42 + 0.36)
      }
    })

    tl.to(
      counter,
      {
        value: 100,
        duration: LINES.length * 0.42,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = Math.round(counter.value).toString()
        },
      },
      0,
    )

    tl.to(rootRef.current, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, '+=0.15')

    return () => {
      tl.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  if (done) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060a]"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="flex flex-col items-start gap-2">
        {LINES.map((line, i) => (
          <div
            key={line}
            ref={(el) => { lineRefs.current[i] = el }}
            className="font-mono text-xs tracking-[0.15em] text-[#8fe3d9] opacity-0 sm:text-sm"
            style={{ color: i === LINES.length - 1 ? '#ffb454' : undefined }}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="mt-8 font-mono text-[10px] tracking-widest text-[#8b8f9c]">
        <span ref={counterRef}>0</span>%
      </div>
    </div>
  )
}
