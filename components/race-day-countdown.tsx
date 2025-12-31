"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Oswald } from "next/font/google"

const oswald = Oswald({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-oswald",
})

export function RaceDayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7)
    targetDate.setHours(14, 0, 0, 0)

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full overflow-hidden relative py-32 md:py-48 bg-stride-dark">
      <div className="absolute inset-0 z-0 bg-black/50" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center">
        {/* Background Countdown Numbers - Perfectly centered foundation */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-8 select-none opacity-60 mix-blend-screen scale-y-110">
          <TimeUnit value={timeLeft.days} label="D" />
          <TimeUnit value={timeLeft.hours} label="H" />
          <TimeUnit value={timeLeft.minutes} label="M" />
          <TimeUnit value={timeLeft.seconds} label="S" />
        </div>

        {/* Foreground Overlay Text - The "Sticker" Effect */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <h2 className="font-brier text-[15vw] md:text-9xl text-stride-accent leading-[0.8] drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] z-10 text-center whitespace-nowrap">
              NEW <br />
              <span className="ml-[1.5em]">DROP</span>
            </h2>
            <p className="font-oswald text-xl md:text-3xl text-white font-bold uppercase tracking-[0.5em] mt-6 bg-black/80 px-6 py-2 rounded-full backdrop-blur-md border border-white/10">
              Coming Soon
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline">
      <span className="font-oswald font-bold text-[18vw] md:text-[200px] text-[#e0e0e0] leading-[0.8] tracking-tighter tabular-nums uppercase scale-x-75 origin-right">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="font-oswald font-bold text-[18vw] md:text-[200px] text-[#4a4a4a] leading-[0.8] tracking-tighter uppercase scale-x-75 origin-left">
        {label}
      </span>
    </div>
  )
}
