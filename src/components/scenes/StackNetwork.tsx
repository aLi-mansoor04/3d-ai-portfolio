import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { skills, skillGroups, type Skill } from '../../data/portfolio'

interface Node {
  skill: Skill
  position: THREE.Vector3
  color: string
}

function fibonacciSphere(index: number, total: number, radius: number) {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total)
  const theta = Math.PI * (1 + Math.sqrt(5)) * (index + 0.5)
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta) * 0.72,
    radius * Math.cos(phi),
  )
}

interface StackNetworkProps {
  z: number
  reducedMotion: boolean
}

export default function StackNetwork({ z, reducedMotion }: StackNetworkProps) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState<Node | null>(null)

  const nodes = useMemo<Node[]>(() => {
    const groupColor = new Map(skillGroups.map((g) => [g.id, g.color]))
    return skills.map((skill, i) => ({
      skill,
      position: fibonacciSphere(i, skills.length, 5.6),
      color: groupColor.get(skill.group) ?? '#8b9fc9',
    }))
  }, [])

  const linkGeometry = useMemo(() => {
    const pts: number[] = []
    nodes.forEach((n) => {
      pts.push(0, 0, 0, n.position.x, n.position.y, n.position.z)
    })
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3))
    return geom
  }, [nodes])

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return
    group.current.rotation.y += delta * 0.045
  })

  return (
    <group ref={group} position={[0, 0.3, z]}>
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial color="#5b8def" transparent opacity={0.18} />
      </lineSegments>

      <mesh>
        <icosahedronGeometry args={[0.5, 2]} />
        <meshStandardMaterial color="#ffb454" emissive="#7a4a12" emissiveIntensity={0.7} roughness={0.3} />
      </mesh>
      <Html center distanceFactor={11} style={{ pointerEvents: 'none' }}>
        <div className="font-mono text-[10px] tracking-wider text-[#ffb454] whitespace-nowrap -translate-y-6">
          ALI'S AI STACK
        </div>
      </Html>

      {nodes.map((n) => (
        <group key={n.skill.id} position={n.position}>
          <mesh
            onPointerOver={(e) => {
              e.stopPropagation()
              setHovered(n)
              document.body.style.cursor = 'none'
            }}
            onPointerOut={(e) => {
              e.stopPropagation()
              setHovered((curr) => (curr?.skill.id === n.skill.id ? null : curr))
            }}
          >
            <sphereGeometry args={[hovered?.skill.id === n.skill.id ? 0.14 : 0.09, 12, 12]} />
            <meshStandardMaterial
              color={n.color}
              emissive={n.color}
              emissiveIntensity={hovered?.skill.id === n.skill.id ? 1.4 : 0.5}
            />
          </mesh>
          {hovered?.skill.id === n.skill.id && (
            <Html center distanceFactor={9} style={{ pointerEvents: 'none' }}>
              <div className="rounded border border-white/10 bg-[#0c0e15]/95 px-2.5 py-1.5 text-left shadow-lg backdrop-blur-sm -translate-y-8">
                <div className="font-mono text-[10px] font-semibold text-[#e9e6df]">{n.skill.label}</div>
                <div className="font-mono text-[9px] text-[#8b8f9c]">
                  {skillGroups.find((g) => g.id === n.skill.group)?.label}
                </div>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}
