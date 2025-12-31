"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface DropItem {
  id: string
  drop: string
  model: string
  date: string
  price: string
  status: string
  statusColor: string
  image: string
}

interface SeasonalData {
  status: string
  items: string
  drops: DropItem[]
}

const dropsData: Record<string, SeasonalData> = {
  "2025": {
    status: "ACTIVE SEASON",
    items: "12",
    drops: [
      {
        id: "25-01",
        drop: "01",
        model: "TRAIL BLAZER X",
        date: "12 JAN 25",
        price: "$229",
        status: "DRAW OPEN",
        statusColor: "text-stride-accent",
        image: "/images/lofan/shoe-trail.avif",
      },
      {
        id: "25-02",
        drop: "02",
        model: "STREET CORE V2",
        date: "22 FEB 25",
        price: "$149",
        status: "LAUNCHING",
        statusColor: "text-white/60",
        image: "/images/lofan/shoe-street.avif",
      },
      {
        id: "25-03",
        drop: "03",
        model: "FUTURE WAVE",
        date: "15 MAR 25",
        price: "$199",
        status: "BEST SELLER",
        statusColor: "text-stride-coral",
        image: "/images/lofan/shoe-future.avif",
      },
      {
        id: "25-04",
        drop: "04",
        model: "LEGACY SUEDE",
        date: "10 APR 25",
        price: "$149",
        status: "UPCOMING",
        statusColor: "text-stride-teal",
        image: "/images/lofan/shoe-legacy.avif",
      },
    ],
  },
  "2024": {
    status: "BEST SELLER",
    items: "24",
    drops: [
      {
        id: "24-01",
        drop: "01",
        model: "AIR MAX UPTEMPO '95",
        date: "16 MAR 24",
        price: "$199",
        status: "LIMITED",
        statusColor: "text-stride-teal",
        image: "/images/lofan/shoe-uptempo.jpg",
      },
      {
        id: "24-02",
        drop: "02",
        model: "RETRO RUNNER 90",
        date: "23 MAR 24",
        price: "$179",
        status: "IN STOCK",
        statusColor: "text-stride-coral",
        image: "/images/lofan/shoe-retro-90.jpg",
      },
      {
        id: "24-03",
        drop: "03",
        model: "VINTAGE CLASSIC",
        date: "06 APR 24",
        price: "$169",
        status: "RESTOCKED",
        statusColor: "text-stride-teal",
        image: "/images/lofan/shoe-vintage.jpg",
      },
    ],
  },
  "2023": {
    status: "ARCHIVE",
    items: "18",
    drops: [
      {
        id: "23-01",
        drop: "01",
        model: "URBAN DRIFT",
        date: "13 APR 23",
        price: "$219",
        status: "SOLD OUT",
        statusColor: "text-white/40",
        image: "/images/lofan/shoe-urban.jpeg",
      },
    ],
  }
}

export function InteractiveSchedule() {
  const [activeYear, setActiveYear] = useState("2025")
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const years = Object.keys(dropsData).sort((a, b) => b.localeCompare(a))

  return (
    <>
      <div
        ref={containerRef}

        className="w-full bg-stride-dark py-32 relative overflow-hidden"
      >
        {/* Background Decorative Text */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none select-none opacity-5">
          <h2 className="text-[20vw] font-black text-white whitespace-nowrap -rotate-6 transform translate-y-1/3">
            {activeYear} COLLECTION • {activeYear} COLLECTION
          </h2>
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            <div className="flex flex-col">
              <h2 className="text-stride-cream font-brier text-7xl md:text-9xl tracking-tighter leading-none">
                DROP <span className="text-stride-coral">CALENDAR</span>
              </h2>
              <div className="h-2 w-32 bg-stride-coral mt-4 mb-8" />
            </div>

            {/* Premium Year Selector */}
            <div className="relative group w-full md:w-auto md:min-w-[450px]">
              <button
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                className="flex items-center gap-8 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl hover:bg-white/10 transition-all duration-300 w-full justify-between"
              >
                <div className="flex items-center gap-6">
                  <ChevronDown className={cn("w-10 h-10 text-stride-coral transition-transform duration-500", isYearDropdownOpen ? "rotate-180" : "-rotate-90")} />
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2">SEASON</span>
                    <span className="text-5xl font-sans font-black text-white tracking-tighter">{activeYear}</span>
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">STATUS</span>
                    <span className="text-xl font-sans font-black text-stride-coral italic">{dropsData[activeYear].status}</span>
                  </div>
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">ITEMS</span>
                    <span className="text-xl font-sans font-black text-white">{dropsData[activeYear].items}</span>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isYearDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="absolute top-full left-0 right-0 mt-4 bg-stride-darkbk border border-white/10 rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] z-50 backdrop-blur-2xl"
                  >
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => {
                          setActiveYear(year)
                          setIsYearDropdownOpen(false)
                        }}
                        className={cn(
                          "w-full px-10 py-8 flex items-center justify-between hover:bg-white/5 transition-all group border-b border-white/5 last:border-0",
                          activeYear === year ? "bg-stride-coral/10" : ""
                        )}
                      >
                        <div className="flex items-center gap-6">
                          <span className={cn("text-4xl font-sans font-black transition-all", activeYear === year ? "text-stride-coral" : "text-white/60 group-hover:text-white group-hover:translate-x-2")}>
                            {year}
                          </span>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="text-xs font-black text-white/20 uppercase tracking-widest">{dropsData[year].status}</span>
                          <div className={cn("w-3 h-3 rounded-full transition-all duration-500", activeYear === year ? "bg-stride-coral scale-125 shadow-[0_0_15px_rgba(255,107,107,0.8)]" : "bg-white/10")} />
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-12 gap-4 mb-8 text-[10px] md:text-xs font-black text-white/40 uppercase tracking-[0.2em] px-4 border-b border-white/10 pb-4">
              <div className="col-span-1">#</div>
              <div className="col-span-5 md:col-span-4">MODEL</div>
              <div className="col-span-3 text-center hidden md:block">RELEASE DATE</div>
              <div className="col-span-3 md:col-span-2 text-center">PRICE</div>
              <div className="col-span-3 md:col-span-2 text-right">AVAILABILITY</div>
            </div>

            <motion.div
              key={activeYear}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col"
            >
              {dropsData[activeYear].drops.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredEvent(item.id)}
                  onMouseLeave={() => setHoveredEvent(null)}
                  className="group relative mb-2"
                >
                  <div className="grid grid-cols-12 gap-4 py-8 md:py-10 px-6 items-center transition-all duration-300 ease-out rounded-3xl border border-white/5 bg-white/5 hover:bg-[#D6FF00] hover:scale-[1.02] hover:-rotate-1 hover:shadow-[0_10px_40px_rgba(214,255,0,0.2)] group-hover:border-[#D6FF00]">
                    <div className="col-span-1">
                      <span className="font-sans font-black text-lg md:text-2xl text-white/20 group-hover:text-black transition-colors duration-300">
                        {item.drop}
                      </span>
                    </div>

                    <div className="col-span-5 md:col-span-4">
                      <span className="font-sans font-black text-3xl md:text-5xl text-white uppercase tracking-tighter leading-none group-hover:text-black transition-all duration-300 inline-block">
                        {item.model}
                      </span>
                    </div>

                    <div className="col-span-3 text-center hidden md:block font-sans font-bold text-xl text-white/60 group-hover:text-black transition-colors">
                      {item.date}
                    </div>

                    <div className="col-span-3 md:col-span-2 text-center">
                      <span className="font-sans font-black text-2xl md:text-3xl text-white/80 group-hover:text-black italic">
                        {item.price}
                      </span>
                    </div>

                    <div className="col-span-3 md:col-span-2 text-right">
                      <span className={`font-sans font-black text-xs md:text-sm tracking-[0.2em] border-2 px-4 py-2 rounded-full transition-all duration-300 inline-block ${item.statusColor} border-current group-hover:border-black group-hover:text-black`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Background Stride Icon */}
        <div className="absolute -bottom-48 -right-48 opacity-[0.03] pointer-events-none">
          <div className="text-[60rem] font-brier leading-none text-white select-none">S</div>
        </div>
      </div>

      {/* Floating Preview Image - Moved OUTSIDE the overflow-hidden container */}
      <AnimatePresence>
        {hoveredEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 5,
              x: cursorPos.x + 40,
              y: cursorPos.y - 100
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8 }}
            className="fixed top-0 left-0 pointer-events-none z-[9999] w-[250px] md:w-[320px] shadow-[0_45px_100px_-15px_rgba(0,0,0,0.8)] bg-stride-dark p-2 rounded-3xl overflow-hidden border border-white/20 backdrop-blur-3xl"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={dropsData[activeYear].drops.find((d) => d.id === hoveredEvent)?.image || ""}
                alt="Product preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stride-dark/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-stride-coral font-black uppercase text-[10px] tracking-[0.4em] mb-2 leading-none">PREMIUM DROP</p>
                <h3 className="text-white font-black text-3xl leading-tight uppercase tracking-tighter">
                  {dropsData[activeYear].drops.find((d) => d.id === hoveredEvent)?.model}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
