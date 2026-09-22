import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { projects, type Project } from '../../data/portfolio'

interface ProjectNodesProps {
  z: number
  reducedMotion: boolean
  onSelect: (project: Project) => void
  onHoverChange: (hovering: boolean) => void
}

const OFFSETS: [number, number, number][] = [
  [-3.4, 0.4, 0],
  [0, -0.5, -3.2],
  [3.4, 0.6, 0],
]

export default function ProjectNodes({ z, reducedMotion, onSelect, onHoverChange }: ProjectNodesProps) {
  const group = useRef<THREE.Group>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useFrame((state) => {
    if (!group.current || reducedMotion) return
    const t = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      child.position.y = OFFSETS[i][1] + Math.sin(t * 0.5 + i * 1.7) * 0.12
    })
  })

  return (
    <group ref={group} position={[0, 0.2, z]}>
      {projects.map((p, i) => {
        const isHovered = hoveredId === p.id
        return (
          <group key={p.id} position={OFFSETS[i]}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation()
                setHoveredId(p.id)
                onHoverChange(true)
              }}
              onPointerOut={(e) => {
                e.stopPropagation()
                setHoveredId((curr) => (curr === p.id ? null : curr))
                onHoverChange(false)
              }}
              onClick={(e) => {
                e.stopPropagation()
                onSelect(p)
              }}
            >
              <planeGeometry args={[2.3, 1.5]} />
              <meshBasicMaterial
                color="#12141d"
                transparent
                opacity={isHovered ? 0.55 : 0.32}
                side={THREE.DoubleSide}
              />
            </mesh>
            <lineSegments>
              <edgesGeometry args={[new THREE.PlaneGeometry(2.3, 1.5)]} />
              <lineBasicMaterial color={p.featured ? '#ffb454' : '#5b8def'} transparent opacity={isHovered ? 0.9 : 0.45} />
            </lineSegments>

            <Html
              center
              distanceFactor={9}
              style={{ pointerEvents: 'none', width: '220px' }}
            >
              <div className="text-center">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#8b8f9c]">
                  {p.featured ? 'Featured' : 'Project'}
                </div>
                <div className="mt-1 font-display text-sm font-semibold text-[#e9e6df]">{p.shortName}</div>
                <div className="mt-1 font-mono text-[9px] text-[#5b8def]">{p.stack.slice(0, 3).join(' · ')}</div>
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}
