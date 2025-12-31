"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/cart-context"
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CartDrawer() {
    const { cartOpen, setCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart()

    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        onClick={() => setCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed inset-y-0 right-0 w-full md:w-[450px] bg-stride-dark z-[70] border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-5 h-5 text-stride-accent" />
                                <h2 className="text-xl font-black uppercase text-white tracking-wider">Your Cart</h2>
                                <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {items.reduce((acc, item) => acc + item.quantity, 0)}
                                </span>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <ShoppingBag className="w-16 h-16 mb-4 text-white/20" />
                                    <p className="text-lg font-bold uppercase tracking-widest text-white/60">Your cart is empty</p>
                                    <p className="text-sm font-medium mt-2">Start adding some fresh kicks.</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-stride-accent/30 transition-colors"
                                    >
                                        {/* Item Image */}
                                        <div className="relative w-20 h-20 bg-[#1a1a1a] rounded-xl overflow-hidden shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Item Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-white uppercase leading-tight pr-4">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-white/20 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-white/40 font-bold uppercase tracking-wider mt-1">{item.category}</p>
                                            </div>

                                            <div className="flex justify-between items-end mt-2">
                                                <div className="flex items-center gap-3 bg-black/20 rounded-lg p-1 border border-white/5">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-md text-white/60 hover:text-white transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-md text-white/60 hover:text-white transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <p className="font-black text-white px-2 py-1">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-white/40 font-bold uppercase tracking-widest text-sm">Total</span>
                                    <span className="text-2xl font-black text-white text-glow-accent">${totalPrice.toFixed(2)}</span>
                                </div>
                                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                                    <button className="w-full bg-stride-accent text-stride-dark font-black uppercase py-4 rounded-xl text-lg tracking-widest hover:bg-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(214,255,0,0.3)]">
                                        Checkout
                                    </button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
