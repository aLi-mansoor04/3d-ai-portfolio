import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NeuralLinksProps {
  count: number
  radius: number
  reducedMotion: boolean
}

export default function NeuralLinks({ count, radius, reducedMotion }: NeuralLinksProps) {
  const mat = useRef<THREE.LineBasicMaterial>(null)

  const geometry = useMemo(() => {
    const points: number[] = []
    for (let i = 0; i < count; i++) {
      const a = new THREE.Vector3().randomDirection().multiplyScalar(radius * (0.6 + Math.random() * 0.6))
      const b = new THREE.Vector3().randomDirection().multiplyScalar(radius * (0.6 + Math.random() * 0.6))
      points.push(a.x, a.y, a.z, b.x, b.y, b.z)
    }
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geom
  }, [count, radius])

  useFrame((state) => {
    if (!mat.current || reducedMotion) return
    mat.current.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
  })

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial ref={mat} color="#5b8def" transparent opacity={0.1} />
    </lineSegments>
  )
}
