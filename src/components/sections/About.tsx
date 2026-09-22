import Reveal from '../ui/Reveal'
import { education, personalInfo } from '../../data/portfolio'

interface AboutProps {
  reducedMotion: boolean
}

const FOCUS_AREAS = ['AI Engineering', 'Generative AI', 'RAG', 'Agentic Systems', 'Backend Development']

export default function About({ reducedMotion }: AboutProps) {
  return (
    <section
      id="about"
      data-scene-section="about"
      className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24"
      aria-label="About"
    >
      <Reveal reducedMotion={reducedMotion}>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#5b8def]">WHO AM I?</div>
        <h2 className="mt-3 font-display text-2xl font-semibold text-[#e9e6df] sm:text-3xl">Profile</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#a8a6a0] sm:text-base">
          {personalInfo.summary}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2">
        <Reveal reducedMotion={reducedMotion} delay={0.1}>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#8b8f9c]">EDUCATION</div>
            <div className="mt-3 font-display text-base font-semibold text-[#e9e6df]">{education.degree}</div>
            <div className="mt-1 text-sm text-[#a8a6a0]">{education.institution}</div>
            <div className="mt-3 flex items-center gap-3 font-mono text-[11px] text-[#5b8def]">
              <span>{education.period}</span>
              <span className="text-[#8b8f9c]">·</span>
              <span>{education.detail}</span>
            </div>
          </div>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.2}>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#8b8f9c]">FOCUS</div>
            <ul className="mt-3 flex flex-col gap-2">
              {FOCUS_AREAS.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#e9e6df]">
                  <span className="h-1 w-1 rounded-full bg-[#ffb454]" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal reducedMotion={reducedMotion} delay={0.3} className="mt-8">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
          <div className="font-mono text-[10px] tracking-[0.25em] text-[#8b8f9c]">CURRENTLY BUILDING</div>
          <p className="mt-3 text-sm leading-relaxed text-[#a8a6a0]">
            Agentic AI systems that reason over multiple steps — RAG pipelines, LangGraph state machines,
            and self-correcting LLM agents deployed with Streamlit.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
