// @ts-nocheck
"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}

function ShoeModel({ url = "/models/adidas_shoes.glb" }: { url?: string }) {
  const { scene } = useGLTF(url)

  const model = useMemo(() => {
    const cloned = scene.clone(true)

    const box = new THREE.Box3().setFromObject(cloned)
    const center = new THREE.Vector3()
    box.getCenter(center)
    cloned.position.sub(center)

    return cloned
  }, [scene])

  useEffect(() => {
    if (!model) return

    model.traverse((o: any) => {
      if (!o.isMesh) return

      o.castShadow = true
      o.receiveShadow = true

      const mats = Array.isArray(o.material) ? o.material : [o.material]
      mats.forEach((m: any) => {
        if (!m) return

        if (o.geometry?.attributes?.color) m.vertexColors = true

        const fixMap = (tex: any) => {
          if (!tex) return
          tex.colorSpace = THREE.SRGBColorSpace
          tex.needsUpdate = true
        }

        fixMap(m.map)
        fixMap(m.emissiveMap)

        m.needsUpdate = true
      })
    })
  }, [model])

  return <primitive object={model} />
}

export default function FloatingShoe3D() {
  const groupRef = useRef<THREE.Group>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const targetRot = useRef({ x: 0, y: 0 })
  const currentRot = useRef({ x: 0, y: 0 })
  const shadowRef = useRef<THREE.Mesh>(null)

  const fitScale = useRef(1)
  const didFit = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1))
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMouse({ x, y })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useEffect(() => {
    targetRot.current = {
      x: mouse.y * 0.4,
      y: (mouse.x * Math.PI) / 1.5,
    }
  }, [mouse])

  useFrame((state) => {
    if (!groupRef.current) return
    const dt = state.clock.getDelta()
    const t = state.clock.elapsedTime

    if (!didFit.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current)
      const size = new THREE.Vector3()
      box.getSize(size)
      const maxDim = Math.max(size.x, size.y, size.z)
      if (isFinite(maxDim) && maxDim > 0) {
        // CHANGED: smaller (was 4.8)
        const desired = 3.6
        fitScale.current = desired / maxDim
        didFit.current = true
      }
    }

    currentRot.current.x = damp(currentRot.current.x, targetRot.current.x, 10, dt)
    currentRot.current.y = damp(currentRot.current.y, targetRot.current.y, 10, dt)

    const floatY = Math.sin(t * 0.8) * 0.15

    groupRef.current.rotation.x = currentRot.current.x + 0.1

    const maxY = Math.PI / 2
    const autoY = Math.sin(t * 0.6) * maxY
    const mouseY = currentRot.current.y * 0.25
    groupRef.current.rotation.y = THREE.MathUtils.clamp(autoY + mouseY, -maxY, maxY)

    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.04
    groupRef.current.position.y = floatY
    groupRef.current.scale.setScalar(fitScale.current)

    if (shadowRef.current) {
      const s = 1.0 - floatY * 0.5
      shadowRef.current.scale.setScalar(Math.max(0.5, s))
      const mat = shadowRef.current.material as any
      if (mat) mat.opacity = 0.2 - floatY * 0.3
    }
  })

  return (
    <group>
      <group ref={groupRef} position={[0, -0.95, 0]}>
        <ShoeModel />
      </group>

      <mesh ref={shadowRef} position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

useGLTF.preload("/models/adidas_shoes.glb")
