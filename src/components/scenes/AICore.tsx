import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { scrollState } from '../../lib/scrollState'
import { pointerState } from '../../lib/pointerState'

interface AICoreProps {
  reducedMotion: boolean
  interactive: boolean
}

const RING_CONFIGS = [
  { radius: 2.1, tube: 0.012, rotX: 0.4, rotY: 0.1, speed: 0.12 },
  { radius: 2.5, tube: 0.008, rotX: -0.6, rotY: 0.9, speed: -0.09 },
  { radius: 2.9, tube: 0.006, rotX: 1.1, rotY: -0.4, speed: 0.06 },
]

export default function AICore({ reducedMotion, interactive }: AICoreProps) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const rings = useRef<THREE.Mesh[]>([])
  const nodesRef = useRef<THREE.InstancedMesh>(null)

  const nodePositions = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const count = 14
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5)
      const r = 2.15
      pts.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ),
      )
    }
    return pts
  }, [])

  useFrame((state) => {
    if (!group.current) return

    const fade = 1 - Math.min(1, Math.max(0, (scrollState.progress - 0.02) / 0.16))
    const scale = THREE.MathUtils.lerp(0.55, 1, Math.max(0, fade)) 
    group.current.scale.setScalar(Math.max(0.001, scale))

    if (core.current) {
      const t = reducedMotion ? 0 : state.clock.elapsedTime
      core.current.rotation.y = t * 0.08
      core.current.rotation.x = Math.sin(t * 0.15) * 0.08

      if (interactive && !reducedMotion) {
        core.current.rotation.y += pointerState.x * 0.12
        core.current.rotation.x += pointerState.y * 0.08
      }
    }

    rings.current.forEach((ring, i) => {
      if (!ring) return
      const cfg = RING_CONFIGS[i]
      const t = reducedMotion ? 0 : state.clock.elapsedTime
      ring.rotation.x = cfg.rotX + t * cfg.speed
      ring.rotation.y = cfg.rotY + t * cfg.speed * 1.4
    })

    if (nodesRef.current) {
      const t = reducedMotion ? 0 : state.clock.elapsedTime
      const dummy = new THREE.Object3D()
      nodePositions.forEach((p, i) => {
        const pulse = 1 + Math.sin(t * 1.6 + i) * 0.15
        dummy.position.copy(p)
        dummy.scale.setScalar(0.045 * pulse)
        dummy.updateMatrix()
        nodesRef.current!.setMatrixAt(i, dummy.matrix)
      })
      nodesRef.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.35, 4]} />
        <MeshDistortMaterial
          color="#ffb454"
          emissive="#7a4a12"
          emissiveIntensity={0.6}
          roughness={0.25}
          metalness={0.4}
          distort={0.32}
          speed={reducedMotion ? 0 : 1.4}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.36, 1]} />
        <meshBasicMaterial color="#ffb454" wireframe transparent opacity={0.08} />
      </mesh>

      {RING_CONFIGS.map((cfg, i) => (
        <mesh key={i} ref={(el) => { if (el) rings.current[i] = el }}>
          <torusGeometry args={[cfg.radius, cfg.tube, 8, 128]} />
          <meshBasicMaterial color="#5b8def" transparent opacity={0.5} />
        </mesh>
      ))}

      <instancedMesh ref={nodesRef} args={[undefined, undefined, nodePositions.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#5b8def" />
      </instancedMesh>
    </group>
  )
}
