import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  reducedMotion: boolean
}

export default function Reveal({ children, className, delay = 0, reducedMotion }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            once: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [reducedMotion, delay])

  return (
    <div ref={ref} className={className} style={reducedMotion ? undefined : { opacity: 0 }}>
      {children}
    </div>
  )
}
