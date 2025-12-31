"use client"

import { useParams } from "next/navigation"
import { storeProducts } from "@/lib/products"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowLeft, Check, Shield, Truck, Zap } from "lucide-react"
import Link from "next/link"

export default function ProductPage() {
    const params = useParams()
    const { addToCart } = useCart()
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [activeImage, setActiveImage] = useState(0)

    // Find product
    const product = storeProducts.find(p => p.id === Number(params.id))

    if (!product) {
        return (
            <div className="min-h-screen bg-stride-dark text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-black mb-4">PRODUCT NOT FOUND</h1>
                <Link href="/store" className="text-stride-accent hover:underline">Return to Store</Link>
            </div>
        )
    }

    const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]

    const techSpecs = [
        { icon: Zap, label: "Energy Return", value: "High-Response Foam" },
        { icon: Shield, label: "Durability", value: "Reinforced Toe" },
        { icon: Truck, label: "Shipping", value: "Free Global Delivery" },
    ]

    return (
        <main className="min-h-screen bg-stride-dark text-white selection:bg-stride-accent selection:text-stride-dark">
            <Header />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
                <Link href="/store" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors uppercase font-bold text-xs tracking-widest">
                    <ArrowLeft className="w-4 h-4" /> Back to Store
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left: Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4 sticky top-32"
                    >
                        {/* Main Image */}
                        <div className={`relative aspect-square w-full bg-[#1a1a1a] rounded-[3rem] overflow-hidden border border-white/10 ${product.outOfStock ? 'grayscale opacity-80' : ''}`}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.tag && (
                                <div className="absolute top-8 left-8 bg-stride-accent text-stride-dark px-4 py-2 rounded-full font-black uppercase tracking-widest text-sm z-10">
                                    {product.tag}
                                </div>
                            )}
                            {product.outOfStock && (
                                <div className="absolute top-8 left-8 bg-black/90 text-red-500 border border-red-500/50 px-4 py-2 rounded-full font-black uppercase tracking-widest text-sm z-20">
                                    Out Of Stock
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Right: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col h-full"
                    >
                        <div className="mb-2">
                            <span className="text-stride-accent font-black tracking-[0.2em] uppercase text-sm">
                                {product.category} COLLECTION
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
                            {product.name}
                        </h1>

                        <div className="text-3xl font-bold mb-8 font-mono">
                            {product.price}
                        </div>

                        <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-xl">
                            Engineered for those who refuse to compromise. The {product.name} combines cutting-edge performance technology with an unmistakable aesthetic.
                            Features our signature adaptive cushioning system for superior comfort and energy return in every step.
                        </p>

                        {/* Size Selector */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-bold uppercase tracking-widest text-white/40">Select Size</span>
                                <button className="text-xs font-bold underline text-white/40 hover:text-white">Size Guide</button>
                            </div>
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        disabled={product.outOfStock}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-4 rounded-xl font-bold uppercase text-sm border transition-all
                                            ${selectedSize === size
                                                ? 'bg-white text-black border-white'
                                                : 'bg-white/5 border-white/10 text-white hover:border-white/40 hover:bg-white/10'
                                            }
                                            ${product.outOfStock ? 'opacity-30 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {selectedSize && <div className="mt-2 text-xs text-stride-accent font-bold uppercase tracking-widest">✔ Size {selectedSize} Selected</div>}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-12">
                            <button
                                disabled={product.outOfStock}
                                onClick={() => addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: parseFloat(product.price.replace("$", "")),
                                    image: product.image,
                                    category: product.category
                                })}
                                className={`flex-1 py-6 rounded-2xl font-black uppercase tracking-widest text-lg transition-all
                                    ${product.outOfStock
                                        ? 'bg-stone-900 text-red-500 border border-red-900 cursor-not-allowed'
                                        : 'bg-stride-accent text-stride-dark hover:bg-white hover:shadow-[0_0_30px_rgba(214,255,0,0.3)]'
                                    }
                                `}
                            >
                                {product.outOfStock ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                            <button className="p-6 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors">
                                <Shield className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Tech Specs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-8">
                            {techSpecs.map((spec, i) => (
                                <div key={i} className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/5">
                                    <spec.icon className="w-5 h-5 text-stride-accent mb-2" />
                                    <span className="text-xs font-bold uppercase text-white/40 tracking-widest">{spec.label}</span>
                                    <span className="text-sm font-bold">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
