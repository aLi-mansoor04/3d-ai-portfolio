// The single map of "how far into the world" each section sits. Both the
// camera rig and the individual 3D scene groups read from this so the
// camera always arrives exactly when its corresponding content does.

export const SECTION_ORDER = [
  'hero',
  'about',
  'stack',
  'projects',
  'featured',
  'ask',
  'contact',
] as const

export type SectionId = (typeof SECTION_ORDER)[number]

export const SECTION_DEPTH: Record<SectionId, number> = {
  hero: 0,
  about: -12,
  stack: -24,
  projects: -38,
  featured: -52,
  ask: -64,
  contact: -76,
}

export const SECTION_DRIFT: Record<SectionId, { x: number; y: number }> = {
  hero: { x: 0, y: 0 },
  about: { x: 1.4, y: 0.3 },
  stack: { x: -1.6, y: 0.6 },
  projects: { x: 1.8, y: -0.2 },
  featured: { x: -1.2, y: 0.4 },
  ask: { x: 0.8, y: -0.4 },
  contact: { x: 0, y: 0 },
}
