"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import InfiniteLogoSlider from "./infinite-logo-slider"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-black to-stride-accent/30 pt-0 px-4 md:px-8 min-h-screen flex flex-col justify-end relative pb-5">
      {/* Gradient removed to maintain dark theme */}

      <div className="relative flex-1 flex flex-col w-full max-w-[1688px] mx-auto mt-12 z-10">
        <div
          className="absolute inset-0 w-full h-full z-0 bg-[#0a0a0a] overflow-hidden"
          style={{
            maskImage: 'url("/images/footer-mask.svg")',
            WebkitMaskImage: 'url("/images/footer-mask.svg")',
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        >
          {/* Curved lines background pattern */}
          <div
            className="absolute inset-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 100 Q100 50 200 100 T400 100' stroke='%23ff6b6b' fill='none' strokeWidth='2' opacity='0.5'/%3E%3Cpath d='M0 150 Q100 100 200 150 T400 150' stroke='%234ecdc4' fill='none' strokeWidth='2' opacity='0.5'/%3E%3Cpath d='M0 200 Q100 150 200 200 T400 200' stroke='%23ff6b6b' fill='none' strokeWidth='2' opacity='0.5'/%3E%3Cpath d='M0 250 Q100 200 200 250 T400 250' stroke='%234ecdc4' fill='none' strokeWidth='2' opacity='0.5'/%3E%3Cpath d='M0 300 Q100 250 200 300 T400 300' stroke='%23ff6b6b' fill='none' strokeWidth='2' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        <div className="relative z-20 flex flex-col h-full px-8 md:px-24 py-12 md:py-20 md:pb-12 md:pl-0 md:pr-0">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mt-0">
            {/* Shop navigation */}
            <div className="md:col-span-3 text-center order-2 md:order-1 md:pl-8 flex flex-col justify-center h-full">
              <h4 className="font-black text-xs uppercase mb-6 text-white/40 tracking-[0.2em]">SHOP</h4>
              <ul className="space-y-2">
                {[
                  { label: "NEW ARRIVALS", href: "/store?sort=newest" },
                  { label: "RUNNING", href: "/store?category=RUNNING" },
                  { label: "LIFESTYLE", href: "/store?category=LIFESTYLE" },
                  { label: "SALE", href: "/store?sort=price-asc" }
                ].map((item) => (
                  <li className="leading-5" key={item.label}>
                    <Link
                      href={item.href}
                      className="text-white font-bold text-xl md:text-2xl uppercase hover:text-stride-accent transition-colors inline-block leading-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/#store"
                    className="text-stride-accent font-black text-xl md:text-2xl uppercase hover:text-white transition-colors inline-block"
                  >
                    ALL PRODUCTS
                  </Link>
                </li>
              </ul>
            </div>

            {/* Center content with Floating Shoe Image */}
            <div className="md:col-span-6 flex flex-col items-center justify-center order-1 md:order-2 relative">
              <div className="absolute top-0 left-0 right-0 z-0 text-center transform -translate-y-1/4 md:-translate-y-0 mt-24">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white text-glow-accent"
                >
                  <span className="font-sans block">
                    STEP
                    <span className="font-brier text-stride-accent-secondary text-glow-secondary"> INTO</span>
                  </span>
                  <span className="font-sans block">
                    YOUR <span className="font-brier text-stride-accent-secondary text-glow-secondary">STRIDE.</span>
                  </span>
                </motion.h2>
              </div>

              {/* Shoe Image Container */}
              <div className="relative w-full h-[500px] md:h-[850px] z-10 mt-48 md:mt-56 flex justify-center items-center">
                <div className="absolute inset-0 bg-white/5 rounded-full blur-[120px] scale-50 opacity-20" />

                <motion.div
                  className="relative w-full max-w-[600px] aspect-square"
                  animate={{ y: [-20, 20, -20] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img
                    src="/modern-black-sneaker-with-neon-accents-removebg-preview.png"
                    alt="Floating Shoe"
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(214,255,0,0.15)]"
                  />
                </motion.div>
              </div>

              <Link href="/store" className="absolute -bottom-12 z-20">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(214,255,0,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-stride-accent text-stride-dark font-black uppercase px-10 py-5 rounded-[18px] text-base tracking-widest hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(214,255,0,0.3)] border-2 border-white/20"
                >
                  SHOP THE DROP
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.button>
              </Link>
            </div>

            {/* Social links */}
            <div className="md:col-span-3 text-center order-3 md:order-2 md:pr-8 flex flex-col justify-center h-full">
              <h4 className="font-black text-xs uppercase mb-6 text-white/40 tracking-[0.2em]">
                FOLLOW US
              </h4>
              <ul className="space-y-2">
                {[
                  { name: "TIKTOK", url: "https://www.tiktok.com" },
                  { name: "INSTAGRAM", url: "https://www.instagram.com" },
                  { name: "TWITTER", url: "https://twitter.com" },
                  { name: "YOUTUBE", url: "https://www.youtube.com" }
                ].map((platform) => (
                  <li className="leading-5" key={platform.name}>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-bold text-xl md:text-2xl uppercase hover:text-stride-accent transition-colors inline-block leading-4"
                    >
                      {platform.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-white/10 border-t-0 mb-0 mt-32 pt-0">
            <InfiniteLogoSlider />
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="w-full max-w-[1688px] mx-auto px-8 md:px-12 relative z-20 pt-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-xs font-bold tracking-wider uppercase">
          <p>© 2025 STRIDE. All rights reserved</p>
          <div className="flex gap-6 mt-2 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-stride-accent transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/terms-of-use" className="hover:text-stride-accent transition-colors">
              TERMS
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1688px] mx-auto px-8 md:px-12 relative z-20 pt-0">
        <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-xs font-bold tracking-wider uppercase">
          <p className="text-xs mt-7 opacity-40 font-medium leading-4 text-left">
            STRIDE is a premium footwear brand dedicated to crafting exceptional shoes for every journey. Our commitment
            to innovation, comfort, and style drives everything we create.
          </p>
        </div>
      </div>
    </footer>
  )
}
