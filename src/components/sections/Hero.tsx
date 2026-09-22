import { useEffect, useRef } from 'react'
import { personalInfo } from '../../data/portfolio'
import { scrollState } from '../../lib/scrollState'

interface HeroProps {
  reducedMotion: boolean
}

export default function Hero({ reducedMotion }: HeroProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reducedMotion) return
    let raf = 0
    const tick = () => {
      const fade = 1 - Math.min(1, scrollState.progress / 0.045)
      if (textRef.current) {
        textRef.current.style.opacity = String(Math.max(0, fade))
        textRef.current.style.transform = `translateY(${(1 - fade) * -24}px)`
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(Math.max(0, fade))
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  return (
    <section
      id="hero"
      data-scene-section="hero"
      className="relative flex h-[110vh] flex-col items-center justify-center px-6 text-center sm:h-screen"
      aria-label="Introduction"
    >
      <div ref={textRef} className="flex flex-col items-center">
        <div className="font-mono text-[11px] tracking-[0.3em] text-[#8fe3d9]">AI SYSTEM ONLINE</div>

        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-[#e9e6df] sm:text-6xl md:text-7xl">
          {personalInfo.name}
        </h1>
        <div className="mt-3 font-mono text-xs tracking-[0.25em] text-[#5b8def] sm:text-sm">
          {personalInfo.role.toUpperCase()}
        </div>

        <p className="mt-6 max-w-md text-balance text-sm leading-relaxed text-[#a8a6a0] sm:text-base">
          {personalInfo.tagline}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#about"
            data-cursor="interact"
            className="rounded-full bg-[#ffb454] px-6 py-2.5 font-mono text-xs font-semibold tracking-wide text-[#05060a] transition-transform hover:scale-[1.04]"
          >
            EXPLORE
          </a>
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="default"
            className="rounded-full border border-white/15 px-6 py-2.5 font-mono text-xs font-semibold tracking-wide text-[#e9e6df] transition-colors hover:border-white/40"
          >
            RESUME
          </a>
        </div>

        <div className="mt-8 flex items-center gap-5 font-mono text-[11px] tracking-wide text-[#8b8f9c]">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" data-cursor="default" className="hover:text-[#e9e6df]">
            GitHub
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" data-cursor="default" className="hover:text-[#e9e6df]">
            LinkedIn
          </a>
          <a href={`mailto:${personalInfo.email}`} data-cursor="default" className="hover:text-[#e9e6df]">
            Email
          </a>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-9 flex flex-col items-center gap-2 font-mono text-[9px] tracking-[0.3em] text-[#8b8f9c]"
        aria-hidden="true"
      >
        SCROLL
        <span className="h-8 w-px bg-gradient-to-b from-[#8b8f9c] to-transparent" />
      </div>
    </section>
  )
}
