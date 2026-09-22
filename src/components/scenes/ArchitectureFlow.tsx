import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { featuredProject, type ArchitectureNode } from '../../data/portfolio'

interface ArchitectureFlowProps {
  z: number
  reducedMotion: boolean
  onSelectNode: (node: ArchitectureNode) => void
}

export default function ArchitectureFlow({ z, reducedMotion, onSelectNode }: ArchitectureFlowProps) {
  const packet = useRef<THREE.Mesh>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const nodes = featuredProject.architecture ?? []

  const positions = useMemo(() => {
    const n = nodes.length
    return nodes.map((_, i) => {
      const t = n <= 1 ? 0 : i / (n - 1)
      return new THREE.Vector3((t - 0.5) * 11, Math.sin(t * Math.PI) * 1.1, -t * 4)
    })
  }, [nodes])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(positions), [positions])

  useFrame((state) => {
    if (!packet.current || reducedMotion) return
    const t = (state.clock.elapsedTime * 0.12) % 1
    const p = curve.getPointAt(t)
    packet.current.position.copy(p)
  })

  return (
    <group position={[0, 0.3, z]}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(positions.flatMap((p) => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5b8def" transparent opacity={0.55} />
      </line>

      {!reducedMotion && (
        <mesh ref={packet}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color="#ffb454" />
        </mesh>
      )}

      {nodes.map((node, i) => {
        const isActive = activeId === node.id
        return (
          <group key={node.id} position={positions[i]}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation()
                setActiveId(node.id)
              }}
              onPointerOut={(e) => {
                e.stopPropagation()
                setActiveId((curr) => (curr === node.id ? null : curr))
              }}
              onClick={(e) => {
                e.stopPropagation()
                onSelectNode(node)
              }}
            >
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial
                color="#0c0e15"
                emissive={isActive ? '#ffb454' : '#5b8def'}
                emissiveIntensity={isActive ? 1 : 0.45}
              />
            </mesh>
            <Html center distanceFactor={9} style={{ pointerEvents: 'none' }}>
              <div className="translate-y-6 whitespace-nowrap font-mono text-[9px] tracking-wide text-[#8b8f9c]">
                {node.label}
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}
