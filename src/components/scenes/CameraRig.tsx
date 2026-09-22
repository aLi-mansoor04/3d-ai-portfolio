import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollState } from '../../lib/scrollState'
import { pointerState } from '../../lib/pointerState'
import { SECTION_ORDER, SECTION_DEPTH, SECTION_DRIFT } from '../../lib/journey'

function keyframes() {
  return SECTION_ORDER.map((id) => {
    const b = scrollState.sections[id]
    const frac = b ? (b.start + b.end) / 2 : 0
    return { frac, z: SECTION_DEPTH[id], drift: SECTION_DRIFT[id] }
  }).sort((a, b) => a.frac - b.frac)
}

function sampleAt(progress: number) {
  const frames = keyframes()
  if (frames.length === 0) return { z: 0, x: 0, y: 0 }
  if (progress <= frames[0].frac) {
    return { z: frames[0].z, x: frames[0].drift.x, y: frames[0].drift.y }
  }
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i]
    const b = frames[i + 1]
    if (progress >= a.frac && progress <= b.frac) {
      const t = (progress - a.frac) / Math.max(0.0001, b.frac - a.frac)
      const ease = t * t * (3 - 2 * t) // smoothstep
      return {
        z: THREE.MathUtils.lerp(a.z, b.z, ease),
        x: THREE.MathUtils.lerp(a.drift.x, b.drift.x, ease),
        y: THREE.MathUtils.lerp(a.drift.y, b.drift.y, ease),
      }
    }
  }
  const last = frames[frames.length - 1]
  return { z: last.z, x: last.drift.x, y: last.drift.y }
}

interface CameraRigProps {
  reducedMotion: boolean
  interactive: boolean
}

export default function CameraRig({ reducedMotion, interactive }: CameraRigProps) {
  const { camera } = useThree()
  const lookTarget = useRef(new THREE.Vector3(0, 0, -10))
  const smoothed = useRef({ x: 0, y: 4.5, z: 0 })

  useFrame((_, delta) => {
    const progress = reducedMotion ? 0 : scrollState.progress
    const sample = sampleAt(progress)

    const parallaxX = interactive ? pointerState.x * 0.6 : 0
    const parallaxY = interactive ? pointerState.y * 0.35 : 0

    const targetX = sample.x + parallaxX
    const targetY = 0.4 + sample.y + parallaxY
    const targetZ = sample.z + 8

    const lerpAmt = reducedMotion ? 1 : Math.min(1, delta * 2.4)
    smoothed.current.x = THREE.MathUtils.lerp(smoothed.current.x, targetX, lerpAmt)
    smoothed.current.y = THREE.MathUtils.lerp(smoothed.current.y, targetY, lerpAmt)
    smoothed.current.z = THREE.MathUtils.lerp(smoothed.current.z, targetZ, lerpAmt)

    camera.position.set(smoothed.current.x, smoothed.current.y, smoothed.current.z)

    const lookZ = smoothed.current.z - 14
    lookTarget.current.lerp(new THREE.Vector3(sample.x * 0.5, 0.2, lookZ), lerpAmt)
    camera.lookAt(lookTarget.current)
  })

  return null
}
