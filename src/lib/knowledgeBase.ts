// ---------------------------------------------------------------------------
// A small, structured local knowledge base for the "Ask My Portfolio" panel
// and the AI Terminal. This never invents information — every answer is
// composed directly from src/data/portfolio.ts.
//
// Architected so a real LLM can be dropped in later: replace `answer()`'s
// body with a call to your API route, keeping the same (query) => string
// signature. Never call an LLM API directly from the client with an
// embedded key — route it through a server function and read the key from
// an environment variable there.
// ---------------------------------------------------------------------------

import {
  personalInfo,
  education,
  skills,
  projects,
  certifications,
  achievements,
  featuredProject,
} from '../data/portfolio'

interface Entry {
  test: (q: string) => boolean
  answer: () => string
}

const has = (q: string, ...words: string[]) => words.some((w) => q.includes(w))

const entries: Entry[] = [
  {
    test: (q) => has(q, 'specialize', 'focus', 'who is ali', 'who are you', 'about you', 'summary'),
    answer: () => personalInfo.summary,
  },
  {
    test: (q) => has(q, 'education', 'degree', 'university', 'college', 'study', 'studying', 'graduat'),
    answer: () =>
      `${education.degree} at ${education.institution} (${education.period}). ${education.detail}.`,
  },
  {
    test: (q) => has(q, 'project') && has(q, 'ai') && !has(q, 'which', 'what tech'),
    answer: () =>
      `Ali has built three agentic AI projects: ${projects.map((p) => p.name).join(', ')}. Ask about any one by name for details.`,
  },
  {
    test: (q) => has(q, 'strongest project', 'best project', 'flagship', 'featured project', 'main project'),
    answer: () =>
      `His strongest project is the ${featuredProject.name}. ${featuredProject.description}`,
  },
  {
    test: (q) => has(q, 'rag') && !has(q, 'what is rag'),
    answer: () => {
      const p = projects.find((x) => x.id === 'rag-chatbot')!
      return `${p.name}: ${p.description} Stack: ${p.stack.join(', ')}.`
    },
  },
  {
    test: (q) => has(q, 'sql', 'nl to sql', 'natural language'),
    answer: () => {
      const p = projects.find((x) => x.id === 'nl-to-sql')!
      return `${p.name}: ${p.description} Stack: ${p.stack.join(', ')}.`
    },
  },
  {
    test: (q) => has(q, 'research agent', 'multi-agent', 'multi agent', 'critic'),
    answer: () => {
      const p = projects.find((x) => x.id === 'research-agent')!
      return `${p.name}: ${p.description} Stack: ${p.stack.join(', ')}.`
    },
  },
  {
    test: (q) => has(q, 'what is rag'),
    answer: () =>
      'RAG (Retrieval-Augmented Generation) grounds an LLM\'s answer in retrieved context — embedding a query, searching a vector database like FAISS for relevant chunks, and feeding those chunks to the model before it generates a response. Ali has implemented this in his RAG Chatbot project.',
  },
  {
    test: (q) => has(q, 'technolog', 'stack', 'tech', 'tools', 'framework', 'use'),
    answer: () =>
      `Ali's core stack spans ${skills
        .filter((s) => s.group === 'agentic')
        .map((s) => s.label)
        .join(', ')}, plus classical ML (${skills
        .filter((s) => s.group === 'ml')
        .map((s) => s.label)
        .join(', ')}) and backend tools like ${skills
        .filter((s) => s.group === 'backend')
        .map((s) => s.label)
        .join(', ')}.`,
  },
  {
    test: (q) => has(q, 'certif'),
    answer: () => `Certifications: ${certifications.map((c) => `${c.name} (${c.issuer})`).join(', ')}.`,
  },
  {
    test: (q) => has(q, 'achievement', 'leetcode', 'hackerrank', 'codeathon', 'competit'),
    answer: () => achievements.join(' '),
  },
  {
    test: (q) => has(q, 'contact', 'email', 'reach', 'hire', 'linkedin', 'github'),
    answer: () =>
      `Reach Ali by email at ${personalInfo.email}, on GitHub at ${personalInfo.github}, or on LinkedIn at ${personalInfo.linkedin}.`,
  },
  {
    test: (q) => has(q, 'resume', 'cv'),
    answer: () => 'You can download his resume from the RESUME button in the top navigation.',
  },
]

const fallback =
  "I don't have that in Ali's portfolio data. Try asking about his projects, stack, education, certifications, or how to contact him."

export function answer(query: string): string {
  const q = query.trim().toLowerCase()
  if (!q) return fallback
  const hit = entries.find((e) => e.test(q))
  return hit ? hit.answer() : fallback
}

export const suggestedQuestions: string[] = [
  'What does Ali specialize in?',
  'What AI projects has he built?',
  'What is RAG?',
  'Which technologies does he use?',
  "Tell me about his strongest project.",
  'How can I contact him?',
]
