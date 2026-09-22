# Ali Mansoor — AI Engineer Portfolio

An original, interactive 3D portfolio built around a single idea: **"AI Core / Digital Brain."**
A glowing AI core sits at the center of a dark digital world; scrolling flies the camera
through that world, past a live neural network of Ali's stack, a 3D project gallery, and
an animated architecture diagram of his strongest project.

Built with React, TypeScript, Three.js, React Three Fiber, Drei, GSAP (ScrollTrigger), and
Tailwind CSS. All personal content is sourced from `src/data/portfolio.ts`, itself drawn
directly from Ali's resume — nothing is invented.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build & deploy

```bash
npm run build      # outputs to dist/
npm run preview    # sanity-check the production build locally
```

`dist/` is a static site — deploy it anywhere static hosting is supported:

- **Vercel**: `vercel deploy` (framework preset: Vite) or connect the repo in the dashboard.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build`, push `dist/` to a `gh-pages` branch (or use an action).

No environment variables are required to run the site as-is.

## Project structure

```
src/
  data/portfolio.ts        # SOURCE OF TRUTH — all resume content lives here
  lib/
    scrollState.ts          # per-frame scroll-progress tracker (drives the 3D camera)
    pointerState.ts         # per-frame pointer tracker (parallax + custom cursor)
    journey.ts               # maps each section to a depth in the 3D world
    knowledgeBase.ts         # local Q&A for "Ask My Portfolio" (see below)
    hooks.ts, webgl.ts        # reduced-motion / touch / WebGL-support helpers
  components/
    scenes/                  # the persistent WebGL world (Canvas, AI Core, camera rig,
                              # neural network, project gallery, architecture flow)
    ui/                      # Loader, Nav, CustomCursor, ProjectModal, Reveal (GSAP)
    sections/                # Hero, About, Stack, Projects, FeaturedProject,
                              # AskPortfolio, Terminal, Contact
public/
  Ali_Mansoor_Resume.pdf     # served by the RESUME button
  favicon.svg
```

## How the 3D scroll experience works

A single `<Canvas>` is fixed behind the page and never unmounts. Ordinary DOM sections
scroll on top of it in normal document flow. `src/lib/scrollState.ts` tracks overall
scroll progress (0–1) in a plain mutable object — not React state — and measures each
section's actual position in the document. `CameraRig.tsx` reads that value every frame
and flies the camera to the z-depth assigned to whichever section is current
(`src/lib/journey.ts`), so the camera always arrives exactly when its matching content
does, regardless of how section heights change as you edit copy.

## Updating content

Everything personal — name, summary, education, skills, projects, certifications, links —
lives in **`src/data/portfolio.ts`**. Edit that file and every component (the 3D stack
network, the project gallery, the architecture diagram, the terminal, the ask-portfolio
knowledge base) updates automatically. To add a new project with its own architecture
diagram, add an entry to the `projects` array with an `architecture` list of
`{ id, label, detail }` nodes — `ArchitectureFlow.tsx` will lay them out automatically.

To swap the resume file, replace `public/Ali_Mansoor_Resume.pdf` and keep the same
filename, or update `personalInfo.resumeUrl` in `portfolio.ts`.

## "Ask My Portfolio"

`src/lib/knowledgeBase.ts` answers questions with simple keyword matching against
`portfolio.ts` — no API key, nothing invented, works offline. To connect a real LLM
later, see `.env.example`: add a serverless function that reads your key server-side,
and change `answer()` to call that route instead of matching locally. Never put an LLM
API key in a `VITE_*` variable — those ship in the client bundle and are publicly
readable.

## Accessibility & performance

- Respects `prefers-reduced-motion`: the camera stops moving, GSAP reveals are skipped,
  and the loader shortens.
- Falls back to a flat, fully-readable 2D layout (no canvas, no custom cursor) if WebGL
  is unavailable.
- All 3D content is `aria-hidden`; every fact it visualizes also exists as real, readable
  DOM content in each section (so screen readers and text browsers get the full site).
- Particle counts, DPR, and post-processing scale down automatically on mobile / coarse
  pointers.
- The Three.js/R3F/postprocessing bundle is code-split behind `React.lazy` so the initial
  page loads fast.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Three.js · @react-three/fiber ·
@react-three/drei · @react-three/postprocessing · GSAP + ScrollTrigger
