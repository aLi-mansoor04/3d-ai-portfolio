import { useState, useRef, useEffect } from 'react'
import Reveal from '../ui/Reveal'
import { personalInfo, projects } from '../../data/portfolio'

interface Line {
  type: 'input' | 'output'
  text: string
}

interface TerminalProps {
  reducedMotion: boolean
}

const HELP = 'Commands: whoami · focus · stack · status · projects · contact · clear · help'

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase()
  switch (cmd) {
    case 'whoami':
      return [personalInfo.role.toUpperCase() + ' / CSE STUDENT']
    case 'focus':
      return ['LLMS / RAG / AGENTIC AI']
    case 'stack':
      return ['PYTHON / LANGCHAIN / LANGGRAPH / FASTAPI / FAISS']
    case 'status':
      return ['BUILDING...']
    case 'projects':
      return projects.map((p) => `${p.shortName.toUpperCase()} — ${p.github}`)
    case 'contact':
      return [personalInfo.email, personalInfo.github, personalInfo.linkedin]
    case 'help':
      return [HELP]
    case '':
      return []
    default:
      return [`command not found: ${cmd}`, HELP]
  }
}

export default function Terminal({ reducedMotion }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>([{ type: 'output', text: HELP }])
  const [value, setValue] = useState('')
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [lines, reducedMotion])

  const submit = () => {
    const cmd = value
    if (cmd.trim().toLowerCase() === 'clear') {
      setLines([])
      setValue('')
      return
    }
    const output = runCommand(cmd)
    setLines((l) => [...l, { type: 'input', text: cmd }, ...output.map((text) => ({ type: 'output' as const, text }))])
    setValue('')
  }

  return (
    <Reveal reducedMotion={reducedMotion}>
      <div
        className="w-full max-w-md rounded-xl border border-white/10 bg-[#05060a] font-mono text-[11px] shadow-xl"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="border-b border-white/10 px-4 py-2 text-[10px] tracking-wide text-[#8b8f9c]">
          ai-terminal
        </div>
        <div ref={logRef} className="max-h-40 overflow-y-auto px-4 py-3">
          {lines.map((l, i) => (
            <div key={i} className={l.type === 'input' ? 'text-[#ffb454]' : 'text-[#8fe3d9]'}>
              {l.type === 'input' ? `> ${l.text}` : l.text}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5">
          <span className="text-[#5b8def]">{'>'}</span>
          <label htmlFor="ai-terminal-input" className="sr-only">
            Terminal command
          </label>
          <input
            id="ai-terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
            placeholder="type help"
            className="flex-1 bg-transparent text-[#e9e6df] placeholder:text-[#4a4e5c] focus:outline-none"
            autoComplete="off"
          />
        </div>
      </div>
    </Reveal>
  )
}
