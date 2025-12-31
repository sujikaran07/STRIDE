"use client"

import { ArrowRight } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function StoreSection() {
  const storeItems = [
    {
      id: 1,
      name: "Retro Flash",
      title: "RETRO FLASH",
      description: "Yellow, blue, and pink 80s mesh panels.",
      image: "/vintage-80s-style-sneaker-colorful.jpg",
      tag: "NEW ARRIVAL"
    },
    {
      id: 2,
      name: "Cyber Silver",
      title: "CYBER SILVER",
      description: "Silver shimmer upper with black lattice sole.",
      image: "/metallic-silver-futuristic-sneaker.jpg",
      tag: "BEST SELLER"
    },
    {
      id: 3,
      name: "Inferno Heat",
      title: "INFERNO HEAT",
      description: "White base with 3D red and orange flame overlays.",
      image: "/fire-inspired-red-and-orange-sneaker-flames-design.jpg",
      tag: "LIMITED EDITION"
    }
  ]

  const [activeItem, setActiveItem] = useState(storeItems[0])

  return (
    <section id="store" className="relative min-h-screen bg-stride-dark py-24 px-6 md:px-12 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-stride-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <div className="space-y-6">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-black/60 mb-2">
                {activeItem.tag}
              </p>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[0.9] text-glow-accent mb-6">
                {activeItem.title}
              </h2>
              <p className="text-base md:text-lg text-white/50 max-w-md leading-relaxed font-medium">
                {activeItem.description}
              </p>
            </motion.div>

            <Link
              href="/store"
              className="inline-flex items-center gap-3 bg-stride-accent text-stride-dark px-10 py-5 rounded-2xl text-base font-black uppercase hover:scale-105 transition-all duration-300 shadow-[0_10px_30px_rgba(214,255,0,0.3)] hover:shadow-[0_20px_40px_rgba(214,255,0,0.5)] border-2 border-white/10"
            >
              VISIT THE STORE
              <ArrowRight className="w-6 h-6" />
            </Link>

            <div className="grid grid-cols-3 gap-6 pt-10">
              {storeItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`
                    relative aspect-square rounded-[2rem] overflow-hidden border-2 transition-all duration-500 cursor-pointer group shadow-2xl
                    ${activeItem.id === item.id ? 'border-stride-accent scale-105 shadow-[0_0_20px_rgba(214,255,0,0.3)]' : 'border-white/5 hover:border-white/20'}
                  `}
                >
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-stride-accent/10 transition-opacity duration-300 ${activeItem.id === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
              ))}
            </div>
          </div>

          <motion.div
            layout // Enable smooth layout transition
            className="relative w-full aspect-[3/4] md:aspect-auto md:h-[600px] rounded-[3rem] overflow-hidden border-2 border-white/5 group shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)]"
          >
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full h-full"
            >
              <Image
                src={activeItem.image}
                alt={activeItem.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Optional: Show active item details on the main image */}
              <div className="absolute bottom-10 left-10">
                <h3 className="text-white text-4xl font-black uppercase tracking-tighter mb-2">{activeItem.name}</h3>
                <span className="text-stride-accent text-xs font-bold uppercase tracking-[0.3em] border border-stride-accent px-3 py-1 rounded-full">{activeItem.tag}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
