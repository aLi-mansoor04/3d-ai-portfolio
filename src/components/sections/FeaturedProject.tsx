import Reveal from '../ui/Reveal'
import { featuredProject, type ArchitectureNode } from '../../data/portfolio'

interface FeaturedProjectProps {
  reducedMotion: boolean
  isCoarsePointer: boolean
  selectedNode: ArchitectureNode | null
}

export default function FeaturedProject({ reducedMotion, isCoarsePointer, selectedNode }: FeaturedProjectProps) {
  return (
    <section
      id="featured"
      data-scene-section="featured"
      className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-24"
      aria-label="Featured project"
    >
      <Reveal reducedMotion={reducedMotion}>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#ffb454]">FEATURED PROJECT</div>
      </Reveal>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal reducedMotion={reducedMotion} delay={0.1}>
          <h2 className="font-display text-2xl font-semibold text-[#e9e6df] sm:text-3xl">
            {featuredProject.name}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#a8a6a0] sm:text-base">
            {featuredProject.description}
          </p>
          <ul className="mt-5 space-y-2.5">
            {featuredProject.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-sm leading-relaxed text-[#8b8f9c]">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5b8def]" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.2}>
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#8b8f9c]">ARCHITECTURE</div>

            {!isCoarsePointer && (
              <p className="mt-2 text-xs text-[#8b8f9c]">
                Click a node in the 3D flow behind this panel to see what it does.
              </p>
            )}

            <div className="mt-4 min-h-[84px] rounded-lg border border-white/10 bg-[#05060a] p-4">
              {selectedNode ? (
                <>
                  <div className="font-mono text-xs font-semibold tracking-wide text-[#ffb454]">
                    {selectedNode.label}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#a8a6a0]">{selectedNode.detail}</p>
                </>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {featuredProject.architecture?.map((n) => (
                    <div key={n.id} className="font-mono text-[10px] tracking-wide text-[#5b8def]">
                      {n.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {featuredProject.stack.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-[#8fe3d9]">
                  {t}
                </span>
              ))}
            </div>

            <a
              href={featuredProject.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="explore"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-xs font-semibold text-[#e9e6df] transition-colors hover:border-[#ffb454]/50"
            >
              View on GitHub
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
