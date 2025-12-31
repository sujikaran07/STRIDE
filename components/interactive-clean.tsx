"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function InteractiveClean() {
    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
    const animationFrameRef = useRef<number>()
    const isMounted = useRef(true)

    useEffect(() => {
        isMounted.current = true
        if (!containerRef.current) return

        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight

        const scene = new THREE.Scene()

        const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000)
        camera.position.z = 1

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" })
        renderer.setClearColor(0x000000, 0)
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)
        rendererRef.current = renderer

        const textureLoader = new THREE.TextureLoader()
        const shoeTexture = textureLoader.load("/pair-of-stylish-green-and-gray-running-shoes-for-athletics-png.png", (texture) => {
            if (!isMounted.current) return

            const img = texture.image
            const imgAspect = img.width / img.height
            const containerAspect = width / height

            let planeWidth, planeHeight
            if (imgAspect > containerAspect) {
                planeWidth = width
                planeHeight = width / imgAspect
            } else {
                planeHeight = height
                planeWidth = height * imgAspect
            }

            // Update geometry if needed, but we create it fresh here
            shoeMesh.geometry.dispose()
            shoeMesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)

            // Start render loop only after texture is ready
            if (!animationFrameRef.current) animate()
        })

        shoeTexture.colorSpace = THREE.SRGBColorSpace

        const shoeMaterial = new THREE.MeshBasicMaterial({
            map: shoeTexture,
            transparent: true,
            opacity: 1
        })

        // Shader removed as we expect transparent PNG
        // shoeMaterial.onBeforeCompile = ...

        const shoeMesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), shoeMaterial)
        shoeMesh.position.z = 0.01
        scene.add(shoeMesh)

        const animate = () => {
            if (!isMounted.current) return
            renderer.render(scene, camera)
            animationFrameRef.current = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            if (!container) return
            const w = container.clientWidth
            const h = container.clientHeight
            if (w === 0 || h === 0) return

            renderer.setSize(w, h)
            camera.left = w / -2
            camera.right = w / 2
            camera.top = h / 2
            camera.bottom = h / -2
            camera.updateProjectionMatrix()

            // We might want to re-calculate plane size here too to maintain aspect ratio cover
            if (shoeTexture.image) {
                const img = shoeTexture.image
                const imgAspect = img.width / img.height
                const containerAspect = w / h
                let planeWidth, planeHeight
                if (imgAspect > containerAspect) {
                    planeWidth = w
                    planeHeight = w / imgAspect
                } else {
                    planeHeight = h
                    planeWidth = h * imgAspect
                }
                shoeMesh.geometry.dispose()
                shoeMesh.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight)
            }
        }

        window.addEventListener("resize", handleResize)
        // slight delay to ensure container has size
        setTimeout(handleResize, 100)

        return () => {
            isMounted.current = false
            window.removeEventListener("resize", handleResize)
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)

            renderer.dispose()
            if (container && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }

            scene.traverse((obj) => {
                if (obj instanceof THREE.Mesh) {
                    obj.geometry.dispose()
                    if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose())
                    else obj.material.dispose()
                }
            })
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ touchAction: "none" }}
        />
    )
}
