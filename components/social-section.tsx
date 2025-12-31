"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

const socialImages = [
  "/7/nike-pegasus-premium.jpg",
  "/7/nike-pegasus-premium-1.jpg",
  "/7/nike-pegasus-premium-2.jpg",
  "/7/nike-pegasus-premium-3.jpg",
  "/7/nike-pegasus-premium-4.jpg",
  "/7/nike-pegasus-premium-5.jpg",
  "/7/nike-pegasus-premium-6.jpg",
]

const shoeIcons = [
  "/7/nike-pegasus-premium-1.jpg",
  "/7/nike-pegasus-premium-2.jpg",
  "/7/nike-pegasus-premium-3.jpg",
  "/7/nike-pegasus-premium-4.jpg",
  "/7/nike-pegasus-premium-5.jpg",
  "/7/nike-pegasus-premium-6.jpg",
]

export default function SocialSection() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % shoeIcons.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="contact"
      className="relative bg-stride-dark text-white py-24 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Icon Header */}
        <div className="relative h-24 flex items-center justify-center mb-8">
          <div className="relative h-full aspect-square">
            {shoeIcons.map((icon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentIconIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={icon || "/placeholder.svg"}
                  className="h-full w-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  alt="Animated shoe icon"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block mb-8 px-5 py-2 rounded-full bg-stride-accent/10 border border-stride-accent/20"
          >
            <span className="text-stride-accent text-xs font-black uppercase tracking-[0.4em]">CONNECT @STRIDE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-white text-glow-accent mb-8"
          >
            STEP INTO <br /> THE <span className="text-stride-accent-secondary text-glow-secondary">COMMUNITY</span>
          </motion.h2>

          <p className="text-white/40 text-sm md:text-base font-bold uppercase tracking-[0.25em] max-w-2xl mx-auto leading-relaxed">
            JOIN THOUSANDS OF CREATORS DEFINING THE <br className="hidden md:block" /> NEXT GENERATION OF ATHLETIC CULTURE.
          </p>
        </div>

        {/* Community Fan Deck */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[500px] md:h-[700px] flex items-center justify-center mt-20 mb-32 group/deck"
        >
          {socialImages.map((image, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{
                opacity: 1,
                rotate: (i - 3) * 6,
                x: (i - 3) * 90,
                y: Math.abs(i - 3) * 35,
              }}
              animate={hoveredIndex === i ? {
                zIndex: 100,
                rotate: 0,
                scale: 1.3,
                y: -120,
                x: (i - 3) * 20,
                filter: "brightness(1) contrast(1.1)",
                borderColor: "rgba(214, 255, 0, 1)",
                boxShadow: "0 40px 100px rgba(0, 0, 0, 0.8), 0 0 40px rgba(214, 255, 0, 0.4)"
              } : hoveredIndex !== null ? {
                zIndex: 10 - Math.abs(i - 3),
                rotate: (i - 3) * 12 + (i < hoveredIndex ? -15 : 15),
                scale: 0.85,
                y: Math.abs(i - 3) * 60 + 50,
                x: (i - 3) * 120 + (i < hoveredIndex ? -80 : 80),
                filter: "brightness(0.3) blur(2px) grayscale(0.5)",
                borderColor: "rgba(255, 255, 255, 0.02)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
              } : {
                zIndex: 10 - Math.abs(i - 3),
                rotate: (i - 3) * 8,
                scale: 1 - Math.abs(i - 3) * 0.05,
                y: Math.abs(i - 3) * 40,
                x: (i - 3) * 100,
                filter: "brightness(0.8)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              }}
              transition={{
                type: "spring",
                stiffness: hoveredIndex === i ? 400 : 200,
                damping: 30,
                mass: 1
              }}
              className="absolute w-56 md:w-80 aspect-[4/5] bg-stride-dark rounded-[2.5rem] overflow-hidden border-2 transition-all duration-300 transform-gpu cursor-pointer"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Community vibe ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-0' : 'opacity-60'}`} />

                {/* Social Card Info - Only on hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: hoveredIndex === i ? 1 : 0, y: hoveredIndex === i ? 0 : 20 }}
                  className="absolute bottom-8 left-8 right-8 z-10"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-stride-accent/20 border border-stride-accent/40 backdrop-blur-md flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-stride-accent animate-pulse" />
                    </div>
                    <span className="text-stride-accent font-black text-[10px] tracking-[0.3em] uppercase">MEMBER_{i + 101}</span>
                  </div>
                  <p className="text-white text-xs font-bold leading-relaxed opacity-80 uppercase tracking-wider">
                    DECODING THE NEXT ERA OF PERFORMANCE CULTURE. #STRIDE
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center pt-20 border-t border-white/5"
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { name: "TIKTOK", url: "https://www.tiktok.com" },
              { name: "INSTAGRAM", url: "https://www.instagram.com" },
              { name: "TWITTER", url: "https://twitter.com" },
              { name: "YOUTUBE", url: "https://www.youtube.com" }
            ].map((platform) => (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "var(--stride-accent)" }}
                whileTap={{ scale: 0.95 }}
                className="font-black uppercase text-base md:text-lg tracking-widest text-white/40 transition-all hover:text-white"
              >
                {platform.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
