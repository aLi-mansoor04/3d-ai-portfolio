import { useState, useRef, useEffect } from 'react'
import Reveal from '../ui/Reveal'
import { answer, suggestedQuestions } from '../../lib/knowledgeBase'

interface Message {
  role: 'user' | 'system'
  text: string
}

interface AskPortfolioProps {
  reducedMotion: boolean
}

export default function AskPortfolio({ reducedMotion }: AskPortfolioProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: "Ask me anything about Ali's work — I only answer from his real portfolio data." },
  ])
  const [input, setInput] = useState('')
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' })
  }, [messages, reducedMotion])

  const ask = (question: string) => {
    const q = question.trim()
    if (!q) return
    setMessages((m) => [...m, { role: 'user', text: q }, { role: 'system', text: answer(q) }])
    setInput('')
  }

  return (
    <section
      id="ask"
      data-scene-section="ask"
      className="relative mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-24"
      aria-label="Ask my portfolio"
    >
      <Reveal reducedMotion={reducedMotion}>
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#8fe3d9]">ASK MY PORTFOLIO</div>
        <h2 className="mt-3 font-display text-2xl font-semibold text-[#e9e6df] sm:text-3xl">
          A holographic terminal, not a chatbot
        </h2>
      </Reveal>

      <Reveal reducedMotion={reducedMotion} delay={0.15} className="mt-8">
        <div className="rounded-2xl border border-white/10 bg-[#0c0e15]/90 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#ff6b6b]/70" />
            <span className="h-2 w-2 rounded-full bg-[#ffb454]/70" />
            <span className="h-2 w-2 rounded-full bg-[#8fe3d9]/70" />
            <span className="ml-2 font-mono text-[10px] tracking-wide text-[#8b8f9c]">
              ask-portfolio — local knowledge base
            </span>
          </div>

          <div ref={logRef} className="max-h-72 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 font-mono text-xs leading-relaxed ${m.role === 'user' ? 'text-[#ffb454]' : 'text-[#c4c1ba]'}`}>
                <span className="mr-2 text-[#5b8def]">{m.role === 'user' ? '>' : '#'}</span>
                {m.text}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              ask(input)
            }}
            className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
          >
            <span className="font-mono text-xs text-[#5b8def]">{'>'}</span>
            <label htmlFor="ask-portfolio-input" className="sr-only">
              Ask a question about Ali's portfolio
            </label>
            <input
              id="ask-portfolio-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What does Ali specialize in?"
              className="flex-1 bg-transparent font-mono text-xs text-[#e9e6df] placeholder:text-[#4a4e5c] focus:outline-none"
              autoComplete="off"
            />
            <button
              type="submit"
              data-cursor="default"
              className="rounded-full bg-[#ffb454]/90 px-3 py-1 font-mono text-[10px] font-semibold text-[#05060a]"
            >
              ASK
            </button>
          </form>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => ask(q)}
              data-cursor="default"
              className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[10px] text-[#8b8f9c] transition-colors hover:border-white/30 hover:text-[#e9e6df]"
            >
              {q}
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
