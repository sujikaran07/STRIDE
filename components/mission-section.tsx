"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useInView } from "framer-motion"

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [signatureDrawn, setSignatureDrawn] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setSignatureDrawn(true), 800)
    }
  }, [isInView])

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = rect.height
        const scrolled = -rect.top
        const progress = Math.min(Math.max(scrolled / sectionHeight, 0), 1)
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative min-h-[130vh] bg-stride-dark text-stride-text-light flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/video/videoplayback.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stride-dark via-transparent to-stride-dark opacity-80" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-0 pt-20">
        <div className="relative h-20 flex items-center justify-center mt-4">
          <svg className="h-16 w-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 40L12 28C14 24 18 22 24 22H40C46 22 52 26 56 32L58 40C58 44 54 48 48 48H16C10 48 6 44 8 40Z"
              stroke="#ff6b6b"
              strokeWidth="2"
              fill="none"
            />
            <path d="M20 32C22 30 26 30 30 32" stroke="#4ecdc4" strokeWidth="2" strokeLinecap="round" />
            <circle cx="44" cy="36" r="4" stroke="#ff6b6b" strokeWidth="2" />
          </svg>
        </div>

        <div className="text-center relative">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-2xl md:text-5xl lg:text-7xl font-black uppercase tracking-tight text-balance leading-[1.1] xl:text-8xl"
          >
            <span className="text-stride-accent font-brier leading-[1.1] text-5xl md:text-7xl lg:text-9xl block mb-4 text-glow-accent">CRAFTED</span>
            FOR COMFORT,
            <br />
            DESIGNED FOR <span className="text-stride-accent-secondary font-brier leading-[1.1] text-glow-secondary">PERFORMANCE</span>,
            <br />
            ENGINEERED WITH
            <br />
            EVERY DETAIL.
            <br />
            DEFINING A <span className="text-stride-accent font-brier leading-[1.1] text-glow-accent">LEGACY</span>
            <br />
            IN FOOTWEAR
            <br />
            ON AND OFF THE STREETS.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2 }}
            className="absolute -inset-x-20 -inset-y-10 bg-stride-accent/5 blur-[120px] rounded-full z-[-1]"
          />
        </div>
      </div>
    </section>
  )
}
