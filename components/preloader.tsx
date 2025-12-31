"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = "hidden"

    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = "unset"
    }, 2000)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stride-dark text-white overflow-hidden"
        >
          {/* Animated Background Glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: ["-10%", "10%", "-10%"],
                y: ["-10%", "10%", "-10%"]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/4 -left-1/4 w-full h-full bg-stride-accent/20 blur-[150px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
                x: ["10%", "-10%", "10%"],
                y: ["10%", "-10%", "10%"]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-stride-accent-secondary/20 blur-[150px] rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 relative"
          >
            <motion.svg
              width="150"
              height="80"
              viewBox="0 0 120 60"
              fill="url(#preloader-gradient)"
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <defs>
                <linearGradient id="preloader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--stride-accent)" />
                  <stop offset="100%" stopColor="var(--stride-accent-secondary)" />
                </linearGradient>
              </defs>
              <path d="M10 45 L15 25 C18 18 25 15 35 15 L75 15 C90 15 100 20 108 30 L115 45 C115 52 108 55 95 55 L25 55 C12 55 8 52 10 45 Z" />
            </motion.svg>
          </motion.div>

          <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative flex items-baseline"
            >
              <span className="font-brier text-7xl md:text-9xl font-black uppercase tracking-tighter bg-gradient-to-r from-white via-white/40 to-white bg-[length:200%_auto] animate-shimmer bg-clip-text text-transparent italic">
                STRIDE
              </span>

              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-8 font-brier text-2xl md:text-3xl text-stride-accent"
              >
                ™
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="h-1 bg-gradient-to-r from-transparent via-stride-accent to-transparent mt-4 w-full opacity-50"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 font-sans text-xs md:text-sm font-black tracking-[0.5em] uppercase text-white/40"
          >
            ENGINEERING EXCELLENCE
          </motion.div>

          <style jsx>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            .animate-shimmer {
              animation: shimmer 3s linear infinite;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
