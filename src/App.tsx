import { useEffect, useState, Suspense, lazy } from 'react'
import Loader from './components/ui/Loader'
import Nav from './components/ui/Nav'
import CustomCursor from './components/ui/CustomCursor'
import ProjectModal from './components/ui/ProjectModal'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Stack from './components/sections/Stack'
import Projects from './components/sections/Projects'
import FeaturedProject from './components/sections/FeaturedProject'
import AskPortfolio from './components/sections/AskPortfolio'
import Contact from './components/sections/Contact'
import { initScrollTracking } from './lib/scrollState'
import { initPointerTracking } from './lib/pointerState'
import { usePrefersReducedMotion, useIsCoarsePointer, useIsMobileViewport } from './lib/hooks'
import { detectWebGL } from './lib/webgl'
import type { Project, ArchitectureNode } from './data/portfolio'

const Scene = lazy(() => import('./components/scenes/Scene'))

export default function App() {
  const [loading, setLoading] = useState(true)
  const [webglOK, setWebglOK] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null)

  const reducedMotion = usePrefersReducedMotion()
  const isCoarsePointer = useIsCoarsePointer()
  const isMobile = useIsMobileViewport()

  useEffect(() => {
    setWebglOK(detectWebGL())
    const cleanupScroll = initScrollTracking()
    const cleanupPointer = initPointerTracking()
    return () => {
      cleanupScroll()
      cleanupPointer()
    }
  }, [])

  const showCanvas = webglOK
  const lowPower = isMobile || isCoarsePointer

  return (
    <>
      <a href="#hero" className="skip-link">
        Skip to content
      </a>

      {loading && <Loader onComplete={() => setLoading(false)} reducedMotion={reducedMotion} />}

      {showCanvas && (
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <Suspense fallback={null}>
            <Scene
              reducedMotion={reducedMotion}
              interactive={!isCoarsePointer}
              lowPower={lowPower}
              onProjectSelect={setSelectedProject}
              onArchNodeSelect={setSelectedNode}
              onProjectHoverChange={() => {}}
            />
          </Suspense>
        </div>
      )}

      {!showCanvas && (
        <div
          className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_20%,rgba(91,141,239,0.12),transparent_60%)]"
          aria-hidden="true"
        />
      )}

      {!isCoarsePointer && webglOK && <CustomCursor />}

      <Nav visible={!loading} />

      <main className="relative z-10">
        <Hero reducedMotion={reducedMotion} />
        <About reducedMotion={reducedMotion} />
        <Stack reducedMotion={reducedMotion} isCoarsePointer={isCoarsePointer} />
        <Projects
          reducedMotion={reducedMotion}
          isCoarsePointer={isCoarsePointer}
          onSelect={setSelectedProject}
        />
        <FeaturedProject
          reducedMotion={reducedMotion}
          isCoarsePointer={isCoarsePointer}
          selectedNode={selectedNode}
        />
        <AskPortfolio reducedMotion={reducedMotion} />
        <Contact reducedMotion={reducedMotion} />
      </main>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}
