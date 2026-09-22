import Reveal from '../ui/Reveal'
import { skillGroups, skills } from '../../data/portfolio'

interface StackProps {
  reducedMotion: boolean
  isCoarsePointer: boolean
}

export default function Stack({ reducedMotion, isCoarsePointer }: StackProps) {
  return (
    <section
      id="stack"
      data-scene-section="stack"
      className="relative mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-24"
      aria-label="Technology stack"
    >
      <Reveal reducedMotion={reducedMotion}>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#5b8def]">AI STACK</div>
        <h2 className="mt-3 font-display text-2xl font-semibold text-[#e9e6df] sm:text-3xl">
          What Ali builds with
        </h2>
        {!isCoarsePointer && (
          <p className="mt-3 max-w-md text-sm text-[#8b8f9c]">
            The network behind this text is live — hover a node to see what it is.
          </p>
        )}
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const groupSkills = skills.filter((s) => s.group === group.id)
          return (
            <Reveal key={group.id} reducedMotion={reducedMotion} delay={i * 0.05}>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <div className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: group.color }}
                    aria-hidden="true"
                  />
                  <div className="font-mono text-[10px] tracking-[0.15em] text-[#8b8f9c]">
                    {group.label.toUpperCase()}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {groupSkills.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-[#e9e6df]"
                    >
                      {s.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
