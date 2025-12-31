"use client"

const brands = [
  "NIKE", "JORDAN", "ADIDAS", "YEEZY", "NEW BALANCE",
  "OFF-WHITE", "FEAR OF GOD", "PUMA", "ASICS", "SALOMON"
]

import { motion } from "framer-motion"

export default function InfiniteLogoSlider() {
  // 4 sets of brands to ensure we have enough width for any screen
  const sliderContent = [...brands, ...brands, ...brands, ...brands]

  return (
    <div className="w-full overflow-hidden py-10 relative mask-gradient bg-transparent flex">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: "-50%" }}
        transition={{
          duration: 80,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }}
        style={{ width: "max-content" }}
      >
        {sliderContent.map((brand, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-12"
          >
            <span className="text-3xl md:text-5xl font-black italic uppercase text-transparent stroke-text hover:text-white transition-all duration-300 cursor-default select-none opacity-30 hover:opacity-100"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.5)" }}>
              {brand}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
