"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const shoes = [
  {
    id: 1,
    name: "Night Vision",
    subtitle: "Stealth Series",
    year: "2025",
    image: "/modern-black-sneaker-with-neon-green-accents-on-wh.jpg",
    desc: "Black leather with neon green contrast stitching.",
    specs: "Contrast Stitch + Leather"
  },
  /*
  {
    id: 2,
    name: "Heritage Mid",
    subtitle: "Classic Wings",
    year: "2025",
    image: "/white-minimalist-running-shoe-side-view-on-white-b.jpg",
    desc: "Grey/White leather panels with classic wings logo.",
    specs: "Classic Leather Panels"
  },
  */
  {
    id: 3,
    name: "Apex Court",
    subtitle: "Hardwood Classic",
    year: "2025",
    image: "/high-top-basketball-shoe-red-and-black-on-white-ba.jpg",
    desc: "Red and black basketball silhouette with jumpman logo.",
    specs: "High-Top Sport Mesh"
  },
  {
    id: 4,
    name: "Volt Charge",
    subtitle: "High Voltage",
    year: "2024",
    image: "/grey-athletic-walking-shoe-cushioned-on-white-back.jpg",
    desc: "Neon lime green mesh with black swoosh and curved sole.",
    specs: "Volt Mesh + Curved Sole"
  },
  {
    id: 5,
    name: "Aero Sakura",
    subtitle: "Floral Tech",
    year: "2024",
    image: "/japanese-inspired-sneaker-cherry-blossom-pink-desi.jpg",
    desc: "Pink mesh and lace with cherry blossom patterns.",
    specs: "Floral Lace Mesh"
  },
  {
    id: 6,
    name: "Retro Volt",
    subtitle: "Arcade Infinite",
    year: "2024",
    image: "/vintage-80s-style-colorful-sneaker-neon-colors-on-.jpg",
    desc: "Pink, lime, and blue mesh high-top.",
    specs: "80s Retro Mesh"
  },
  {
    id: 7,
    name: "Matte Onyx",
    subtitle: "Shadow Lux",
    year: "2025",
    image: "/all-black-stealth-sneaker-matte-finish-on-white-ba.jpg",
    desc: "All-black matte lifestyle shoe with chunky sole.",
    specs: "Matte Synthetic Finish"
  },
  {
    id: 8,
    name: "Solar Gel",
    subtitle: "Solar Energy",
    year: "2025",
    image: "/bright-orange-performance-running-shoe-on-white-ba.jpg",
    desc: "Bright orange mesh technical running shoe.",
    specs: "Tech Mesh + Performance"
  },
  {
    id: 9,
    name: "Cloud Sculpt",
    subtitle: "Aero Foam",
    year: "2025",
    image: "/white-cloud-like-cushioned-sneaker-soft-on-white-b.jpg",
    desc: "All-white, puffy bubble-like texture.",
    specs: "Sculpted Cloud Foam"
  },
  {
    id: 10,
    name: "Dynasty Gold",
    subtitle: "Imperial Edition",
    year: "2024",
    image: "/red-and-gold-premium-sneaker-japanese-style-on-whi.jpg",
    desc: "Red leather with gold Japanese kanji and floral embroidery.",
    specs: "Premium Embroidery"
  },
  {
    id: 11,
    name: "Eco Rib",
    subtitle: "Sustainable Tech",
    year: "2024",
    image: "/sustainable-green-sneaker-recycled-materials-on-wh.jpg",
    desc: "Emerald green ribbed fabric with grey sole.",
    specs: "Ribbed Tech Fabric"
  },
  {
    id: 12,
    name: "Pure Classic",
    subtitle: "Court Minimum",
    year: "2024",
    image: "/elegant-white-ceramic-inspired-luxury-sneaker-on-w.jpg",
    desc: "White leather with Puma branding and side perforations.",
    specs: "Perforated Leather"
  },
  {
    id: 13,
    name: "Regent Navy",
    subtitle: "Royal Low",
    year: "2024",
    image: "/dark-navy-blue-luxury-sneaker-premium-leather-on-w.jpg",
    desc: "Dark navy blue smooth leather with minimal seams.",
    specs: "Smooth Luxury Leather"
  },
  {
    id: 14,
    name: "Inferno Heat",
    subtitle: "Flame Reaction",
    year: "2023",
    image: "/fire-inspired-red-and-orange-sneaker-flames-design.jpg",
    desc: "White base with 3D red and orange flame overlays.",
    specs: "3D Flame Overlays"
  },
  {
    id: 15,
    name: "Liquid Silver",
    subtitle: "Chrome Future",
    year: "2023",
    image: "/metallic-silver-futuristic-sneaker-reflective-on-w.jpg",
    desc: "Mirror-like liquid chrome metallic finish.",
    specs: "High-Gloss Chrome"
  },
  {
    id: 16,
    name: "Aero Flux",
    subtitle: "Air Motion",
    year: "2023",
    image: "/single-trendy-sneaker-shoe-coral-pink-color-floati.jpg",
    desc: "Coral mesh with visible air cushion unit in heel.",
    specs: "Visible Air Unit"
  },
  {
    id: 17,
    name: "Shadow Step",
    subtitle: "Night Runner",
    year: "2023",
    image: "/all-black-stealth-sneaker-matte-finish.jpg",
    desc: "All-black lifestyle runner with matte synthetic finish.",
    specs: "Matte Synthetic"
  },
  {
    id: 18,
    name: "Slate Grey",
    subtitle: "Prototype N.354",
    year: "2022",
    image: "/modern-black-sneaker-with-neon-accents.jpg",
    desc: "Light grey deconstructed leather with N.354 branding.",
    specs: "Deconstructed Leather"
  },
  {
    id: 19,
    name: "Mono Court",
    subtitle: "Urban Classic",
    year: "2020",
    image: "/white-running-shoe-minimalist-design.jpg",
    desc: "Black and white leather contrast.",
    specs: "Contrast Leather"
  },
  {
    id: 20,
    name: "Eco Earth",
    subtitle: "Recycled Canvas",
    year: "2021",
    image: "/sustainable-green-sneaker-recycled-materials.jpg",
    desc: "Green canvas with zig-zag stitching and tan laces.",
    specs: "Recycled Canvas"
  },
  {
    id: 21,
    name: "Coral Matte",
    subtitle: "Soft Touch",
    year: "2021",
    image: "/single-modern-coral-pink-sneaker-shoe-floating-sid.jpg",
    desc: "All-over smooth coral/peach matte finish.",
    specs: "Matte Finish"
  },
  {
    id: 22,
    name: "Velocity Air",
    subtitle: "Perforated Air",
    year: "2021",
    image: "/red-and-gold-premium-sneaker.jpg",
    desc: "White leather with orange swoosh and hole-punched panels.",
    specs: "Perforated Panels"
  },
  {
    id: 23,
    name: "Apex Kinetic",
    subtitle: "Mech Soles",
    year: "2021",
    image: "/white-cloud-like-cushioned-sneaker.jpg",
    desc: "Mechanical bridge sole with white mesh upper.",
    specs: "Mechanical Sole"
  },
  {
    id: 24,
    name: "Retro Flash",
    subtitle: "80s Spectrum",
    year: "2021",
    image: "/vintage-80s-style-sneaker-colorful.jpg",
    desc: "Yellow, blue, and pink 80s mesh panels.",
    specs: "80s Mesh Panels"
  },
  {
    id: 25,
    name: "Cyber Silver",
    subtitle: "Lattice Mesh",
    year: "2021",
    image: "/metallic-silver-futuristic-sneaker.jpg",
    desc: "Silver shimmer upper with black lattice sole.",
    specs: "Lattice Structured Sole"
  },
  {
    id: 26,
    name: "Midnight Tech",
    subtitle: "Dark Knight",
    year: "2021",
    image: "/grey-athletic-walking-shoe.jpg",
    desc: "Black mesh with white jagged sole and swoosh.",
    specs: "Jagged Sole Unit"
  },
  {
    id: 27,
    name: "Sakura Low",
    subtitle: "Blossom Art",
    year: "2021",
    image: "/japanese-inspired-sneaker-with-cherry-blossom-desi.jpg",
    desc: "White leather with pink cherry blossom branch art.",
    specs: "Hand-Painted Leather"
  },
  {
    id: 28,
    name: "Pure Lux",
    subtitle: "Ceramic Finish",
    year: "2021",
    image: "/elegant-white-ceramic-inspired-sneaker.jpg",
    desc: "White high-gloss patent finish with wave details.",
    specs: "High-Gloss Patent"
  },
  {
    id: 29,
    name: "Apex Pro",
    subtitle: "Red Ignition",
    year: "2021",
    image: "/high-top-basketball-shoe-red-and-black.jpg",
    desc: "Red and black mesh basketball shoe with red air unit.",
    specs: "Performance Mesh"
  },
  {
    id: 30,
    name: "Air Flux",
    subtitle: "Multi Panel",
    year: "2021",
    image: "/fire-inspired-red-and-orange-sneaker.jpg",
    desc: "White, grey, and lime green panels with air unit.",
    specs: "Multi-Panel Air"
  },
  {
    id: 31,
    name: "Aero Lite",
    subtitle: "Feather Weight",
    year: "2021",
    image: "/clean-pristine-white-sneaker-shoe-sparkling-clean-.jpg",
    desc: "All-black lightweight mesh with low profile.",
    specs: "Lightweight Mesh"
  },
  {
    id: 32,
    name: "Navy Gold",
    subtitle: "Gold Standard",
    year: "2021",
    image: "/dark-navy-blue-luxury-sneaker.jpg",
    desc: "Dark navy leather with gold emblem hardware.",
    specs: "Gold Hardware"
  },
  {
    id: 33,
    name: "Sand Storm",
    subtitle: "Desert Layer",
    year: "2021",
    image: "/dirty-muddy-sneaker-shoe-covered-in-mud-and-dirt-s.jpg",
    desc: "Peach and sand layered 'RS' chunky silhouette.",
    specs: "Layered Chunky Sole"
  },

  /*
  {
    id: 34,
    name: "Onyx Platform",
    subtitle: "Platform Lux",
    year: "2021",
    image: "/bright-orange-performance-running-shoe.jpg",
    desc: "Glossy black leather with white platform sole.",
    specs: "Platform Leather"
  }
  */
]

export default function HelmetHall() {
  const [hoveredShoe, setHoveredShoe] = useState<number | null>(null)
  const [randomShoes, setRandomShoes] = useState(shoes.slice(0, 12))

  useEffect(() => {
    // 1. Filter out any potential holes or undefined items first
    const validShoes = shoes.filter(shoe => shoe && shoe.id);

    // 2. Fisher-Yates Shuffle
    const shuffled = [...validShoes]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. Slice exactly 12 (or fewer if total is less, but we have ~30)
    setRandomShoes(shuffled.slice(0, 12))
  }, [])

  return (
    <section id="collection" className="relative min-h-screen text-white py-24 px-6 md:px-12 bg-stride-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">
            <span className="text-white">SNEAKER</span>
            <br />
            <span className="text-stride-coral font-brier text-5xl md:text-8xl">COLLECTION</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 mt-6 max-w-2xl">
            From iconic classics to cutting-edge innovations, our collection represents years of dedication to crafting
            the perfect footwear for every occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
          {randomShoes.map((shoe, index) => (
            <motion.div
              key={shoe.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredShoe(shoe.id)}
              onMouseLeave={() => setHoveredShoe(null)}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-stride-navy/40 border border-white/5 transition-all duration-500 group-hover:bg-stride-navy/60 group-hover:border-stride-accent/40 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
                {/* Image Container - Dedicated Visual Zone */}
                <div className="absolute inset-x-0 top-0 h-[60%] flex items-center justify-center p-10">
                  <motion.div
                    animate={{
                      scale: hoveredShoe === shoe.id ? 1.05 : 1
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 15 }}
                    className="relative w-full h-full"
                  >
                    {/* Brand Core Glow */}
                    <motion.div
                      animate={{
                        opacity: hoveredShoe === shoe.id ? 0.4 : 0.1,
                        scale: hoveredShoe === shoe.id ? 1.2 : 0.8
                      }}
                      className="absolute inset-0 bg-stride-accent/20 blur-[80px] rounded-full"
                    />
                    <Image
                      src={shoe.image || "/placeholder.svg"}
                      alt={shoe.name}
                      fill
                      className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] z-10"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </motion.div>
                </div>

                {/* Status & Era Badges - Pinned Top */}
                <div className="absolute top-6 left-6 z-30 flex items-center gap-2 bg-black/60 backdrop-blur-xl px-3.5 py-2 rounded-full border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-stride-accent animate-pulse shadow-[0_0_8px_rgba(214,255,0,0.8)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">LATEST DROP</span>
                </div>

                <div className="absolute top-6 right-6 z-30">
                  <span className="text-[10px] font-black text-stride-accent-secondary bg-stride-accent-secondary/10 border border-stride-accent-secondary/20 px-3 py-2 rounded-xl backdrop-blur-xl">
                    '{shoe.year.slice(-2)} COLL.
                  </span>
                </div>

                {/* Information Deck - Compact & Clean */}
                <motion.div
                  initial={{ height: "100px" }}
                  animate={{ height: hoveredShoe === shoe.id ? "180px" : "100px" }}
                  className="absolute bottom-0 left-0 right-0 p-8 pt-10 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl border-t border-white/5 flex flex-col justify-end overflow-hidden z-20"
                >
                  <div className="relative z-10 w-full">
                    <h4 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tighter mb-1.5 group-hover:text-stride-accent transition-colors duration-300">
                      {shoe.name}
                    </h4>

                    <div className="h-5 overflow-hidden mb-2 relative">
                      <motion.p
                        animate={{ y: hoveredShoe === shoe.id ? 0 : 0 }}
                        className="text-stride-accent-secondary/60 text-[10px] font-black uppercase tracking-[0.25em]"
                      >
                        {shoe.subtitle}
                      </motion.p>
                    </div>

                    <motion.div
                      animate={{
                        opacity: hoveredShoe === shoe.id ? 1 : 0.4,
                        y: hoveredShoe === shoe.id ? 0 : 10,
                      }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="mt-2" // Reduced margin
                    >
                      {/* Description Removed */}

                      <div className="grid grid-cols-1 gap-1.5 py-4 border-t border-white/10">
                        <span className="text-[8px] font-black uppercase text-stride-accent/60 tracking-[0.3em]">CORE TECHNOLOGY:</span>
                        <span className="text-[11px] text-white font-black uppercase tracking-wider">{shoe.specs}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href="/store"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-stride-accent/40 rounded-full hover:bg-stride-accent/10 transition-all duration-300"
          >
            <span className="text-stride-accent font-black uppercase tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">View All Collection</span>
            <span className="w-8 h-[1px] bg-stride-accent group-hover:w-12 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  )
}
