"use client"

import { useState, useEffect } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"


import { useCart } from "@/contexts/cart-context"

export default function Header() {
  const { setCartOpen: toggleCart, totalItems } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrolled(currentScroll >= 300)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-md" : "bg-transparent"
          }`}
      >
        <div className="mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center items-start mix-blend-difference"
          >
            <h1
              className="font-brier text-4xl leading-none mt-1 tracking-tight font-bold transition-colors duration-300 text-white"
            >
              <Link href="/">STRIDE</Link>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 mix-blend-difference"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleCart(true)}
              className="p-2 bg-stride-dark/80 border border-white/30 hover:bg-stride-accent rounded-lg transition-colors text-white hover:text-stride-dark px-3 py-2.5 relative group"
              aria-label="Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-stride-accent text-stride-dark text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border border-stride-dark">
                  {totalItems}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-stride-dark/80 border border-white/30 hover:bg-stride-accent rounded-lg transition-colors text-white px-3 py-2.5 z-50 relative"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-stride-dark z-40 border-l border-white/10 shadow-2xl flex flex-col justify-center"
            >
              {/* Background separation line/decoration */}
              <div className="absolute top-0 bottom-0 left-6 w-px bg-white/5 hidden md:block" />

              <motion.nav
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
                className="relative px-12 md:px-20 text-left"
              >
                <div className="absolute -left-3 top-[-100px] text-[200px] font-black text-white/5 pointer-events-none rotate-90 transform opacity-20">
                  MENU
                </div>

                <motion.ul className="space-y-8">
                  {["HOME", "TECHNOLOGY", "COLLECTION", "NEW ARRIVALS", "STORE", "CONTACT"].map((item) => {
                    const href = item === "HOME" ? "/" :
                      item === "CONTACT" ? "/contact" :
                        `/#${item.toLowerCase().replace(" ", "-")}`;

                    return (
                      <motion.li
                        key={item}
                        variants={{
                          open: { opacity: 1, x: 0 },
                          closed: { opacity: 0, x: 50 },
                        }}
                      >
                        <Link
                          href={href}
                          className="group relative inline-block text-4xl md:text-5xl font-black uppercase text-white hover:text-stride-accent transition-colors duration-300"
                          onClick={() => setMenuOpen(false)}
                        >
                          <span className="relative z-10">{item}</span>
                          <span className="absolute -bottom-2 left-0 w-0 h-1 bg-stride-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </motion.li>
                    )
                  })}
                </motion.ul>

                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  className="mt-16 pt-8 border-t border-white/10"
                >
                  <p className="text-sm font-bold text-white/40 mb-4 tracking-widest uppercase">Follow Us</p>
                  <div className="flex gap-6">
                    {[
                      { name: "INSTAGRAM", url: "https://www.instagram.com" },
                      { name: "TIKTOK", url: "https://www.tiktok.com" },
                      { name: "TWITTER", url: "https://twitter.com" }
                    ].map((social) => (
                      <motion.a
                        key={social.name}
                        whileHover={{ scale: 1.1, color: "#d6ff00" }}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold text-white/60 hover:text-stride-accent transition-colors"
                      >
                        {social.name}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
