import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import CameraRig from './CameraRig'
import AICore from './AICore'
import Particles from './Particles'
import NeuralLinks from './NeuralLinks'
import StackNetwork from './StackNetwork'
import ProjectNodes from './ProjectNodes'
import ArchitectureFlow from './ArchitectureFlow'
import { SECTION_DEPTH } from '../../lib/journey'
import type { Project, ArchitectureNode } from '../../data/portfolio'

interface SceneProps {
  reducedMotion: boolean
  interactive: boolean
  lowPower: boolean
  onProjectSelect: (p: Project) => void
  onArchNodeSelect: (n: ArchitectureNode) => void
  onProjectHoverChange: (hovering: boolean) => void
}

export default function Scene({
  reducedMotion,
  interactive,
  lowPower,
  onProjectSelect,
  onArchNodeSelect,
  onProjectHoverChange,
}: SceneProps) {
  const particleCount = lowPower ? 220 : 650
  const linkCount = lowPower ? 18 : 40
  const dpr: [number, number] = lowPower ? [1, 1.3] : [1, 1.8]

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ fov: 55, near: 0.1, far: 140, position: [0, 0.4, 8] }}
      aria-hidden="true"
    >
      <color attach="background" args={['#05060a']} />
      <fog attach="fog" args={['#05060a', 18, 78]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 6]} intensity={40} color="#ffb454" />
      <pointLight position={[-6, -3, -10]} intensity={30} color="#5b8def" />

      <CameraRig reducedMotion={reducedMotion} interactive={interactive} />

      <Suspense fallback={null}>
        <Particles count={particleCount} reducedMotion={reducedMotion} />
        <NeuralLinks count={linkCount} radius={3.4} reducedMotion={reducedMotion} />
        <AICore reducedMotion={reducedMotion} interactive={interactive} />
        <StackNetwork z={SECTION_DEPTH.stack} reducedMotion={reducedMotion} />
        <ProjectNodes
          z={SECTION_DEPTH.projects}
          reducedMotion={reducedMotion}
          onSelect={onProjectSelect}
          onHoverChange={onProjectHoverChange}
        />
        <ArchitectureFlow
          z={SECTION_DEPTH.featured}
          reducedMotion={reducedMotion}
          onSelectNode={onArchNodeSelect}
        />
      </Suspense>

      {!lowPower && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.55} luminanceThreshold={0.22} luminanceSmoothing={0.9} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  )
}
