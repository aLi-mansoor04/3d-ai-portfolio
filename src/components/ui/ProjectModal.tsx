import { useEffect, useRef } from 'react'
import type { Project } from '../../data/portfolio'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#05060a]/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-xl border border-white/10 bg-[#0c0e15] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#8b8f9c]">
              {project.featured ? 'Featured project' : 'Project'}
            </div>
            <h3 id="project-modal-title" className="mt-1 font-display text-xl font-semibold text-[#e9e6df] sm:text-2xl">
              {project.name}
            </h3>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            data-cursor="default"
            aria-label="Close project details"
            className="shrink-0 rounded-full border border-white/10 p-2 text-[#8b8f9c] transition-colors hover:text-[#e9e6df]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-[#c4c1ba]">{project.description}</p>

        <ul className="mt-4 space-y-2">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm leading-relaxed text-[#a8a6a0]">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5b8def]" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-[#8fe3d9]"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          data-cursor="explore"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ffb454] px-4 py-2 font-mono text-xs font-semibold text-[#05060a] transition-transform hover:scale-[1.03]"
        >
          View on GitHub
        </a>
      </div>
    </div>
  )
}
