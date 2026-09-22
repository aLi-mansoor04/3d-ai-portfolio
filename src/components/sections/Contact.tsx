import Reveal from '../ui/Reveal'
import Terminal from './Terminal'
import { personalInfo, socialLinks } from '../../data/portfolio'

interface ContactProps {
  reducedMotion: boolean
}

export default function Contact({ reducedMotion }: ContactProps) {
  return (
    <section
      id="contact"
      data-scene-section="contact"
      className="relative mx-auto flex min-h-[90vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center"
      aria-label="Contact"
    >
      <Reveal reducedMotion={reducedMotion}>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#5b8def]">SIGNAL COMPLETE</div>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[#e9e6df] sm:text-4xl">
          Let's build something intelligent
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[#a8a6a0] sm:mx-auto">
          Open to AI/ML engineering and software engineering roles and internships. Reach out any time.
        </p>
      </Reveal>

      <Reveal reducedMotion={reducedMotion} delay={0.15}>
        <a
          href={`mailto:${personalInfo.email}`}
          data-cursor="interact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ffb454] px-7 py-3 font-mono text-sm font-semibold text-[#05060a] transition-transform hover:scale-[1.04]"
        >
          {personalInfo.email}
        </a>
      </Reveal>

      <Reveal reducedMotion={reducedMotion} delay={0.25}>
        <div className="mt-8 flex items-center justify-center gap-6 font-mono text-xs tracking-wide text-[#8b8f9c]">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              data-cursor="default"
              className="hover:text-[#e9e6df]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 flex justify-center">
        <Terminal reducedMotion={reducedMotion} />
      </div>

      <Reveal reducedMotion={reducedMotion} delay={0.35} className="mt-10">
        <div className="font-mono text-[10px] tracking-widest text-[#4a4e5c]">
          © {new Date().getFullYear()} {personalInfo.name} — built with React, Three.js & GSAP
        </div>
      </Reveal>
    </section>
  )
}
