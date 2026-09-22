import Reveal from '../ui/Reveal'
import { projects, type Project } from '../../data/portfolio'

interface ProjectsProps {
  reducedMotion: boolean
  isCoarsePointer: boolean
  onSelect: (project: Project) => void
}

export default function Projects({ reducedMotion, isCoarsePointer, onSelect }: ProjectsProps) {
  return (
    <section
      id="projects"
      data-scene-section="projects"
      className="relative mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-24"
      aria-label="Projects"
    >
      <Reveal reducedMotion={reducedMotion}>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#5b8def]">PROJECT GALLERY</div>
        <h2 className="mt-3 font-display text-2xl font-semibold text-[#e9e6df] sm:text-3xl">
          Agentic systems, shipped
        </h2>
        {!isCoarsePointer && (
          <p className="mt-3 max-w-md text-sm text-[#8b8f9c]">
            The floating panels behind this text are interactive — click one to open it.
          </p>
        )}
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} reducedMotion={reducedMotion} delay={i * 0.08}>
            <button
              onClick={() => onSelect(p)}
              data-cursor="explore"
              className="group flex h-full w-full flex-col items-start rounded-xl border border-white/10 bg-white/[0.02] p-5 text-left transition-colors hover:border-[#ffb454]/40"
            >
              {p.featured && (
                <span className="rounded-full border border-[#ffb454]/40 px-2 py-0.5 font-mono text-[9px] tracking-wide text-[#ffb454]">
                  FEATURED
                </span>
              )}
              <div className="mt-2 font-display text-base font-semibold text-[#e9e6df]">{p.name}</div>
              <p className="mt-2 text-sm leading-relaxed text-[#8b8f9c]">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] text-[#8fe3d9]">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-4 font-mono text-[10px] tracking-wide text-[#5b8def] group-hover:text-[#ffb454]">
                VIEW DETAILS →
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
