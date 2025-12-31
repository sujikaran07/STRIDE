import { motion } from "framer-motion"

export default function SignatureMarqueeSection() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center z-0 overflow-hidden">
      <div className="w-full flex flex-col gap-0 md:gap-4 py-10 select-none pointer-events-none relative z-10">
        {/* Top Marquee */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, "-50%"] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <h2 className="font-[family-name:var(--font-brier)] text-[16vw] leading-[0.8] tracking-tight px-4 text-chrome italic">
                  INTO THE METAVERSE
                </h2>
                <div className="w-[15vw]"></div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Marquee */}
        <div className="w-full overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: ["-50%", 0] }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <h2
                  className="font-[family-name:var(--font-mona)] font-black uppercase text-[16vw] text-transparent leading-[0.8] tracking-tighter px-4 border-text-stroke relative"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.5)"
                  }}
                >
                  CRAFTED FOR CHAMPIONS
                </h2>
                <div className="w-[15vw]"></div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Spring Collection Badge */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-auto mt-[15vh]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#d6ff00] text-black font-[family-name:var(--font-mona)] font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] px-6 py-3 rounded-full hover:bg-white transition-colors"
        >
          Spring Collection 2025
        </motion.button>
      </div>
    </div>
  )
}
