// ---------------------------------------------------------------------------
// SOURCE OF TRUTH
// Every value in this file is taken directly from Ali's resume. Nothing here
// is invented. Update this file to update the entire site — no component
// should hardcode personal facts.
// ---------------------------------------------------------------------------

export interface PersonalInfo {
  name: string
  role: string
  tagline: string
  summary: string
  email: string
  phone: string
  github: string
  linkedin: string
  resumeUrl: string
}

export const personalInfo: PersonalInfo = {
  name: 'Ali Mansoor',
  role: 'AI Engineer / Developer',
  tagline: 'Building intelligent systems with LLMs, RAG, Agentic AI & Python.',
  summary:
    'AI/ML Engineering student (B.Tech CSE, 2027) focused on building LLM-powered and agentic AI applications using LangChain, LangGraph, and Groq. Hands-on experience building RAG pipelines with FAISS and shipping AI applications with Flask and Streamlit. Familiar with classical machine learning using scikit-learn and XGBoost, along with Docker-based development.',
  email: 'alimansoor.official1586@email.com',
  phone: '+91-8052521586',
  github: 'https://github.com/aLi-mansoor04',
  linkedin: 'https://linkedin.com/in/ali-mansoor',
  resumeUrl: '/Ali_Mansoor_Resume.pdf',
}

export interface Education {
  degree: string
  institution: string
  period: string
  detail: string
}

export const education: Education = {
  degree: 'B.Tech, Computer Science & Engineering',
  institution: 'Dr. A.P.J. Abdul Kalam Technical University, Lucknow',
  period: '2023 — 2027',
  detail: 'SGPA: 7.3 / 10',
}

export type SkillGroupId = 'languages' | 'agentic' | 'ml' | 'libs' | 'backend' | 'databases'

export interface Skill {
  id: string
  label: string
  group: SkillGroupId
}

export interface SkillGroup {
  id: SkillGroupId
  label: string
  color: string
}

export const skillGroups: SkillGroup[] = [
  { id: 'agentic', label: 'Agentic AI & LLMs', color: '#ffb454' },
  { id: 'ml', label: 'Machine Learning & Deep Learning', color: '#5b8def' },
  { id: 'backend', label: 'Backend & APIs', color: '#7fd6c2' },
  { id: 'databases', label: 'Databases', color: '#d18fe0' },
  { id: 'libs', label: 'Libraries & Frameworks', color: '#e8a6a6' },
  { id: 'languages', label: 'Languages', color: '#9aa5b8' },
]

export const skills: Skill[] = [
  // Languages
  { id: 'python', label: 'Python', group: 'languages' },
  { id: 'java', label: 'Java', group: 'languages' },
  // Agentic AI / LLMs
  { id: 'langchain', label: 'LangChain', group: 'agentic' },
  { id: 'langgraph', label: 'LangGraph', group: 'agentic' },
  { id: 'rag', label: 'RAG', group: 'agentic' },
  { id: 'groq', label: 'Groq LLM APIs', group: 'agentic' },
  { id: 'huggingface', label: 'Hugging Face Transformers', group: 'agentic' },
  // ML / DL
  { id: 'sklearn', label: 'scikit-learn', group: 'ml' },
  { id: 'xgboost', label: 'XGBoost', group: 'ml' },
  { id: 'tensorflow', label: 'TensorFlow', group: 'ml' },
  { id: 'keras', label: 'Keras', group: 'ml' },
  { id: 'nlp', label: 'NLP', group: 'ml' },
  { id: 'feature-eng', label: 'Feature Engineering', group: 'ml' },
  // Libraries
  { id: 'pandas', label: 'Pandas', group: 'libs' },
  { id: 'numpy', label: 'NumPy', group: 'libs' },
  { id: 'matplotlib', label: 'Matplotlib', group: 'libs' },
  { id: 'seaborn', label: 'Seaborn', group: 'libs' },
  { id: 'opencv', label: 'OpenCV', group: 'libs' },
  { id: 'bs4', label: 'BeautifulSoup', group: 'libs' },
  { id: 'nltk', label: 'NLTK', group: 'libs' },
  // Backend
  { id: 'fastapi', label: 'FastAPI', group: 'backend' },
  { id: 'restapi', label: 'REST APIs', group: 'backend' },
  { id: 'streamlit', label: 'Streamlit', group: 'backend' },
  { id: 'flask', label: 'Flask', group: 'backend' },
  // Databases
  { id: 'sql', label: 'SQL', group: 'databases' },
  { id: 'sqlite', label: 'SQLite', group: 'databases' },
  { id: 'postgresql', label: 'PostgreSQL', group: 'databases' },
  { id: 'faiss', label: 'FAISS', group: 'databases' },
  { id: 'chroma', label: 'Chroma', group: 'databases' },
]

export interface ArchitectureNode {
  id: string
  label: string
  detail: string
}

export interface Project {
  id: string
  name: string
  shortName: string
  description: string
  bullets: string[]
  stack: string[]
  github: string
  featured: boolean
  architecture?: ArchitectureNode[]
}

export const projects: Project[] = [
  {
    id: 'rag-chatbot',
    name: 'AI-Powered RAG Chatbot',
    shortName: 'RAG Chatbot',
    description:
      'An LLM-powered conversational chatbot built with LangChain and LangGraph, combining retrieval-augmented generation with short-term conversational memory for context-aware answers.',
    bullets: [
      'Built an LLM-powered conversational chatbot using LangChain and LangGraph with RAG, short-term conversational memory, and FAISS-based semantic retrieval for context-aware responses.',
      'Implemented a document ingestion pipeline covering text extraction, chunking, embeddings, and vector similarity search to retrieve relevant context before LLM generation.',
      'Developed an interactive Streamlit UI with conversational history and integrated Groq-hosted LLMs for responsive, context-grounded question answering.',
    ],
    stack: ['Python', 'LangChain', 'LangGraph', 'FAISS', 'Streamlit', 'Groq'],
    github: 'https://github.com/aLi-mansoor04/conversational-rag-chatbot',
    featured: true,
    architecture: [
      { id: 'user', label: 'USER', detail: 'Asks a question in the Streamlit chat UI.' },
      { id: 'query', label: 'QUERY', detail: 'Query joins short-term conversational memory for context.' },
      { id: 'embedding', label: 'EMBEDDING', detail: 'The query is embedded into vector space.' },
      { id: 'vectordb', label: 'VECTOR DB', detail: 'FAISS stores and indexes document chunk embeddings.' },
      { id: 'retrieval', label: 'RETRIEVAL', detail: 'Similarity search retrieves the most relevant chunks.' },
      { id: 'llm', label: 'LLM', detail: 'A Groq-hosted LLM generates a grounded answer via LangChain/LangGraph.' },
      { id: 'response', label: 'RESPONSE', detail: 'A context-grounded response streams back into the chat history.' },
    ],
  },
  {
    id: 'nl-to-sql',
    name: 'Agentic Natural Language-to-SQL System',
    shortName: 'NL → SQL Agent',
    description:
      'An agentic system that converts natural language into safe, executable SQL using a LangGraph state-graph architecture, with self-correction and human-in-the-loop confirmation for writes.',
    bullets: [
      'Built an agentic system that converts natural language queries into safe, executable SQL queries and retrieves results from relational databases using LangGraph state-graph architecture and a Groq-hosted LLM.',
      'Engineered FAISS-based schema retrieval, self-correction loops and multi-turn conversational context to improve query accuracy on complex, multi-table schemas.',
      'Developed a Streamlit interface with conversational query history, generated SQL display, result visualization, JSON export, and human-in-the-loop confirmation for database write operations.',
    ],
    stack: ['Python', 'LangChain', 'LangGraph', 'Groq', 'Streamlit', 'FAISS'],
    github: 'https://github.com/aLi-mansoor04/Natural-language-to-SQL-query',
    featured: false,
    architecture: [
      { id: 'user', label: 'USER', detail: 'Asks a question in plain English.' },
      { id: 'schema', label: 'SCHEMA RETRIEVAL', detail: 'FAISS retrieves the relevant tables from the schema.' },
      { id: 'generate', label: 'SQL GENERATION', detail: 'The Groq-hosted LLM drafts a candidate SQL query via LangGraph.' },
      { id: 'correct', label: 'SELF-CORRECTION', detail: 'A correction loop checks and repairs invalid or unsafe SQL.' },
      { id: 'confirm', label: 'HUMAN CONFIRMATION', detail: 'Write operations pause for human-in-the-loop approval.' },
      { id: 'execute', label: 'EXECUTE', detail: 'The query runs against the relational database.' },
      { id: 'result', label: 'RESULT', detail: 'Results render as tables, visualizations, or JSON export.' },
    ],
  },
  {
    id: 'research-agent',
    name: 'AI Multi-Agent Research System',
    shortName: 'Research Agent',
    description:
      'An autonomous 5-agent LLM pipeline — Search, Scrape, Write, Critique, Refine — orchestrated as a stateful LangGraph for end-to-end research report generation.',
    bullets: [
      'Architected an autonomous 5-agent LLM pipeline (Search → Scrape → Write → Critique → Refine) using LangGraph for stateful, graph-based orchestration of end-to-end research report generation.',
      'Implemented a self-reflection loop — a Critic Agent reviews output quality and triggers iterative rewrites without human intervention — using a Groq-hosted LLM for sub-second inference latency.',
      'Integrated the Tavily Search API and BeautifulSoup for real-time web retrieval, and deployed a production Streamlit frontend with live agent tracking and multi-format export (TXT, Markdown), extensible to RAG and vector database retrieval.',
    ],
    stack: ['Python', 'LangChain', 'LangGraph', 'Tavily', 'Streamlit', 'Groq'],
    github: 'https://github.com/aLi-mansoor04/ai-research-agent',
    featured: false,
    architecture: [
      { id: 'search', label: 'SEARCH', detail: 'The Search agent queries the Tavily Search API.' },
      { id: 'scrape', label: 'SCRAPE', detail: 'The Scrape agent extracts page content with BeautifulSoup.' },
      { id: 'write', label: 'WRITE', detail: 'The Write agent drafts the research report.' },
      { id: 'critique', label: 'CRITIQUE', detail: 'The Critic agent reviews the draft for quality and gaps.' },
      { id: 'refine', label: 'REFINE', detail: 'The Refine agent rewrites based on the critique, looping as needed.' },
      { id: 'export', label: 'EXPORT', detail: 'The final report exports as TXT or Markdown from the Streamlit frontend.' },
    ],
  },
]

export interface Certification {
  name: string
  issuer: string
}

export const certifications: Certification[] = [
  { name: 'Machine Learning Specialization', issuer: 'Coursera' },
  { name: 'Deep Learning Specialization', issuer: 'Coursera' },
  { name: 'AI-Enabled Applications', issuer: 'IBM SkillsBuild' },
]

export const achievements: string[] = [
  'Solved 200+ Data Structures & Algorithms problems on LeetCode & HackerRank (dynamic programming, graphs, strings).',
  'Secured 4th position out of 166 teams in college codeathon.',
]

export interface SocialLink {
  label: string
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: personalInfo.github },
  { label: 'LinkedIn', href: personalInfo.linkedin },
  { label: 'Email', href: `mailto:${personalInfo.email}` },
]

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]
