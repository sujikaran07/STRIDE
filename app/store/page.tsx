"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import { Filter, ChevronDown, Search } from "lucide-react"
import { InteractiveSchedule } from "@/components/interactive-schedule"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { Suspense } from "react"

import { storeProducts } from "@/lib/products"
import Link from "next/link"

export default function StorePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-stride-dark text-white pt-32 text-center">Loading...</div>}>
            <StoreContent />
        </Suspense>
    )
}

function StoreContent() {
    const { addToCart } = useCart()
    const searchParams = useSearchParams()

    const [selectedCategory, setSelectedCategory] = useState("ALL")
    const [searchQuery, setSearchQuery] = useState("")
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [sortBy, setSortBy] = useState("default")

    // Sync with URL params
    useEffect(() => {
        const categoryParam = searchParams.get("category")
        const sortParam = searchParams.get("sort")

        if (categoryParam) {
            // Ensure valid category
            const validCategories = ["ALL", "RUNNING", "BASKETBALL", "LIFESTYLE", "TRAINING"]
            const upperCat = categoryParam.toUpperCase()
            if (validCategories.includes(upperCat)) {
                setSelectedCategory(upperCat)
            }
        }

        if (sortParam) {
            setSortBy(sortParam)
        }
    }, [searchParams])

    const filteredProducts = storeProducts
        .filter(p => {
            const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            return matchesCategory && matchesSearch
        })
        .sort((a, b) => {
            if (sortBy === "price-asc") {
                return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""))
            }
            if (sortBy === "price-desc") {
                return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""))
            }
            if (sortBy === "newest") {
                return b.id - a.id
            }
            return 0
        })

    return (
        <main className="min-h-screen bg-stride-dark text-white selection:bg-stride-accent selection:text-stride-dark">
            <Header />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1600px] mx-auto">
                {/* Store Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                            The <span className="text-stride-accent">Collections</span>
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl max-w-xl">
                            Performance engineered for the modern athlete. Explore our latest drops and limited editions.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <div className="relative group">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className={`flex items-center gap-2 border px-6 py-3 rounded-xl transition-colors uppercase font-bold text-sm tracking-widest ${isFilterOpen || sortBy !== 'default' ? 'bg-stride-accent text-black border-stride-accent' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            >
                                {sortBy !== 'default' ? 'Sorted' : 'Filter'} <Filter className="w-4 h-4" />
                            </button>

                            {/* Filter Dropdown */}
                            {isFilterOpen && (
                                <div className="absolute top-full right-0 mt-2 w-64 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-30">
                                    <div className="p-2 space-y-1">
                                        <div className="px-4 py-2 text-xs font-bold text-white/40 uppercase tracking-wider">Sort By</div>
                                        <button onClick={() => { setSortBy("price-asc"); setIsFilterOpen(false) }} className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors rounded-lg flex justify-between items-center ${sortBy === 'price-asc' ? 'bg-white/10 text-stride-accent' : 'text-white hover:bg-white/5 hover:text-stride-accent'}`}>Price: Low to High {sortBy === 'price-asc' && <div className="w-2 h-2 rounded-full bg-stride-accent" />}</button>
                                        <button onClick={() => { setSortBy("price-desc"); setIsFilterOpen(false) }} className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors rounded-lg flex justify-between items-center ${sortBy === 'price-desc' ? 'bg-white/10 text-stride-accent' : 'text-white hover:bg-white/5 hover:text-stride-accent'}`}>Price: High to Low {sortBy === 'price-desc' && <div className="w-2 h-2 rounded-full bg-stride-accent" />}</button>
                                        <button onClick={() => { setSortBy("newest"); setIsFilterOpen(false) }} className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors rounded-lg flex justify-between items-center ${sortBy === 'newest' ? 'bg-white/10 text-stride-accent' : 'text-white hover:bg-white/5 hover:text-stride-accent'}`}>Newest Arrival {sortBy === 'newest' && <div className="w-2 h-2 rounded-full bg-stride-accent" />}</button>
                                        <button onClick={() => { setSortBy("default"); setIsFilterOpen(false) }} className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors rounded-lg flex justify-between items-center ${sortBy === 'default' ? 'bg-white/10 text-stride-accent' : 'text-white hover:bg-white/5 hover:text-stride-accent'}`}>Default {sortBy === 'default' && <div className="w-2 h-2 rounded-full bg-stride-accent" />}</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="SEARCH"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm font-bold tracking-widest uppercase focus:outline-none focus:border-stride-accent transition-colors w-64"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-8 mb-12 border-b border-white/10 pb-4 overflow-x-auto">
                    {["ALL", "RUNNING", "BASKETBALL", "LIFESTYLE", "TRAINING"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`text-lg font-black uppercase tracking-wider transition-colors relative pb-4 
                        ${selectedCategory === cat ? 'text-stride-accent' : 'text-white/40 hover:text-white'}
                    `}
                        >
                            {cat}
                            {selectedCategory === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-stride-accent"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-stride-accent/50 transition-colors duration-300"
                        >
                            {/* Badge */}
                            {/* Badge */}
                            {(product.tag || product.outOfStock) && (
                                <div className={`absolute top-4 left-4 z-20 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest ${product.outOfStock
                                    ? 'bg-black/90 text-red-500 border border-red-500/50'
                                    : 'bg-stride-accent text-stride-dark'
                                    }`}>
                                    {product.outOfStock ? 'OUT OF STOCK' : product.tag}
                                </div>
                            )}

                            {/* Image Container */}
                            <div className={`relative aspect-square overflow-hidden bg-[#1a1a1a] ${product.outOfStock ? 'grayscale opacity-60' : ''}`}>
                                <Link href={`/product/${product.id}`} className="cursor-pointer">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </Link>
                                {!product.outOfStock && <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />}

                                {/* Quick Action Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center bg-gradient-to-t from-black/80 to-transparent">
                                    <button
                                        disabled={product.outOfStock}
                                        onClick={() => addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: parseFloat(product.price.replace("$", "")),
                                            image: product.image,
                                            category: product.category
                                        })}
                                        className={`font-bold uppercase text-xs px-4 py-2 rounded-lg transition-colors disabled:cursor-not-allowed ${product.outOfStock
                                            ? 'bg-black/80 text-red-500 w-full text-center border border-red-500/30'
                                            : 'bg-white text-black hover:bg-stride-accent'
                                            }`}>
                                        {product.outOfStock ? 'OUT OF STOCK' : 'Quick Add'}
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{product.category}</div>
                                <h3 className="text-2xl font-black uppercase leading-none mb-4 group-hover:text-stride-accent transition-colors">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold">{product.price}</span>
                                    <Link
                                        href={`/product/${product.id}`}
                                        className="text-sm font-bold uppercase tracking-wider hover:text-stride-accent transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <InteractiveSchedule />

            <Footer />
        </main >
    )
}
