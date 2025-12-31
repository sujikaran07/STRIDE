"use client"

import { useState, useRef, Suspense, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, OrbitControls, PerspectiveCamera, Html, PresentationControls, Center, Environment, useProgress, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { Shield, Zap, Wind, Layers, Activity } from "lucide-react"

interface TechStat {
  label: string
  value: string
}

interface Hotspot {
  id: number
  position: [number, number, number] // 3D position
  label: string
  description: string
  category: "protection" | "performance" | "comfort" | "durability"
  stats: TechStat[]
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    position: [0.45, -0.05, 0.05], // Toe Area (AeroMesh)
    label: "AeroMesh Upper",
    description: "Ultralight breathable mesh engineered for maximum airflow and temperature regulation.",
    category: "comfort",
    stats: [
      { label: "Weight", value: "285g" },
      { label: "Material", value: "3D Warp Knit" },
    ],
  },
  {
    id: 2,
    position: [0.15, -0.2, 0.28], // Side/Midsole Area
    label: "CloudFoam+ Midsole",
    description: "Multi-layered energy return system providing explosive responsiveness and impact protection.",
    category: "performance",
    stats: [
      { label: "Energy", value: "85%" },
      { label: "Tech", value: "Boost Gen II" },
    ],
  },
  {
    id: 3,
    position: [-0.3, 0.35, -0.1], // Heel Area (Stability Lock)
    label: "StabilityLock Heel",
    description: "Reinforced TPU heel counter for maximum lockdown and lateral stability during high-speed cuts.",
    category: "protection",
    stats: [
      { label: "Lockdown", value: "360°" },
      { label: "Support", value: "Level 5" },
    ],
  },
  {
    id: 4,
    position: [0.1, -0.5, 0], // Sole Area
    label: "FlexZone Outsole",
    description: "Continental™ Rubber outsole with biological traction patterns for unparalleled multi-surface grip.",
    category: "durability",
    stats: [
      { label: "Grip", value: "All-Surface" },
      { label: "Compound", value: "Traction-Pro" },
    ],
  },
]

function ShoeModel({ url, onRotate }: { url: string; onRotate: (rotation: number) => void }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    scene.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
      }
    })
  }, [scene])

  useFrame(() => {
    if (groupRef.current) {
      onRotate(groupRef.current.rotation.y)
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

function LoadingOverlay() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-3xl rounded-3xl border border-white/10 w-64">
        <div className="w-12 h-12 mb-6 relative">
          <div className="absolute inset-0 border-4 border-stride-accent/20 rounded-full" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-4 border-stride-accent border-t-transparent rounded-full"
          />
        </div>
        <div className="text-stride-accent text-3xl font-black mb-2">{Math.round(progress)}%</div>
        <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Calibrating 3D Lab</div>
      </div>
    </Html>
  )
}

function HotspotPoint({ spot, isActive, onClick }: { spot: Hotspot; isActive: boolean; onClick: () => void }) {
  const [isVisible, setIsVisible] = useState(true)
  const dotRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!dotRef.current) return

    // Get the world position of the dot
    const worldPos = new THREE.Vector3()
    dotRef.current.getWorldPosition(worldPos)

    // Vector from shoe center (0,0,0) to dot
    const shoeToDot = worldPos.clone().normalize()
    // Vector from shoe center to camera
    const shoeToCamera = state.camera.position.clone().normalize()

    // Dot product: > 0 means the dot is on the side facing the camera
    // Occlusion threshold: 0.1 means it starts fading slightly before it hits the 90-degree edge
    const dotProduct = shoeToDot.dot(shoeToCamera)

    const visible = dotProduct > 0.1
    if (visible !== isVisible) setIsVisible(visible)
  })

  const getColors = () => "bg-[#d6ff00] shadow-[#d6ff00]/50" // Unified Neon Yellow

  return (
    <group position={spot.position} ref={dotRef}>
      <Html center distanceFactor={15}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0,
            pointerEvents: isVisible ? "auto" : "none"
          }}
          transition={{ duration: 0.4 }}
          className="relative flex items-center justify-center w-5 h-5 cursor-pointer group"
          onClick={(e) => {
            e.stopPropagation()
            if (isVisible) onClick()
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.4], opacity: [0.2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-[#d6ff00]/10"
          />
          <div className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-white scale-125 shadow-[0_0_10px_white]' : getColors()} shadow-[0_0_5px]`} />
        </motion.div>
      </Html>
    </group>
  )
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "protection": return <Shield className="w-4 h-4 text-stride-accent" />
    case "performance": return <Zap className="w-4 h-4 text-stride-accent" />
    case "comfort": return <Wind className="w-4 h-4 text-stride-accent" />
    case "durability": return <Layers className="w-4 h-4 text-stride-accent" />
    default: return <Activity className="w-4 h-4 text-stride-accent" />
  }
}

export default function ShoeTechSection() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const [autoRotate, setAutoRotate] = useState(true)

  const handleRotation = (yRotation: number) => {
    // Normalize rotation to 0 - 360 degrees
    const deg = (((yRotation * 180) / Math.PI % 360) + 360) % 360

    let id = 0
    if (deg >= 315 || deg < 45) id = 1
    else if (deg >= 45 && deg < 135) id = 2
    else if (deg >= 135 && deg < 225) id = 3
    else if (deg >= 225 && deg < 315) id = 4

    if (id !== activeHotspot && autoRotate) {
      setActiveHotspot(id)
    }
  }

  return (
    <section id="technology" className="relative min-h-screen bg-stride-dark px-6 md:px-12 py-24 overflow-hidden">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(214,255,0,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full bg-stride-accent/10 border border-stride-accent/20"
          >
            <span className="text-stride-accent text-xs font-black uppercase tracking-[0.3em]">ENGINEERING LAB</span>
          </motion.div>

          <h2 className="text-4xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-white mb-6">
            SHOE <span className="text-stride-accent font-brier lowercase text-5xl md:text-9xl ml-2">Technology</span>
          </h2>

          <p className="text-white/40 text-sm md:text-base font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto">
            INTERACT WITH THE CORE TECHNOLOGY. ROTATE TO EXPLORE EVERY ANGLE OF OUR HIGHEST PERFORMANCE FOOTWEAR.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Info Side (Desktop) */}
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {activeHotspot ? (
                <motion.div
                  key={activeHotspot}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                >
                  {hotspots.filter(h => h.id === activeHotspot).map(spot => (
                    <div key={spot.id}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-stride-accent/10 rounded-xl border border-stride-accent/20">
                          {getCategoryIcon(spot.category)}
                        </div>
                        <span className="text-stride-accent text-xs font-black uppercase tracking-widest">{spot.category}</span>
                      </div>

                      <h3 className="text-3xl font-black uppercase text-white mb-4 tracking-tight leading-none">
                        {spot.label}
                      </h3>

                      <p className="text-white/60 text-sm leading-relaxed mb-8 font-medium">
                        {spot.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {spot.stats.map((stat, idx) => (
                          <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1 font-black">{stat.label}</div>
                            <div className="text-white font-black">{stat.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-8 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center text-center group transition-colors hover:border-stride-accent/20"
                >
                  <Activity className="w-12 h-12 text-white/10 mb-6 group-hover:text-stride-accent/30 transition-colors" />
                  <p className="text-white/20 text-xs font-black uppercase tracking-[0.2em]">Select a hotspot <br /> to view technology data</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3D Model Center */}
          <div className="lg:col-span-2 order-1 lg:order-2 relative h-[500px] md:h-[800px] cursor-grab active:cursor-grabbing">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 40 }}>
              <ambientLight intensity={2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={5} castShadow />
              <directionalLight position={[0, 10, 5]} intensity={3} />
              <Environment preset="city" />

              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI, Math.PI]}
              >
                <group position={[0, -0.2, 0]} scale={4.5} rotation={[0, Math.PI / 1.5, 0]}>
                  <Suspense fallback={<LoadingOverlay />}>
                    <ShoeModel url="/models/shoe_model_air_jordan_5.glb" onRotate={handleRotation} />

                    {hotspots.map((spot) => (
                      <HotspotPoint
                        key={spot.id}
                        spot={spot}
                        isActive={activeHotspot === spot.id}
                        onClick={() => {
                          setActiveHotspot(spot.id)
                          setAutoRotate(false)
                        }}
                      />
                    ))}
                  </Suspense>
                </group>
              </PresentationControls>

              <ContactShadows position={[0, -1.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
            </Canvas>

            {/* Hint Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 pointer-events-none opacity-60">
              <div className="w-4 h-4 border-2 border-white/20 rounded-full flex items-center justify-center animate-bounce">
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Rotate to Explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

useGLTF.preload("/models/shoe_model_air_jordan_5.glb")
