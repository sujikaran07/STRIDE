"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, CreditCard, Truck, User, ShieldCheck, Lock, ChevronRight, Mail, MapPin } from "lucide-react"

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCart()
    const [step, setStep] = useState(1) // 1: Info, 2: Shipping, 3: Payment
    const [loading, setLoading] = useState(false)
    const [completed, setCompleted] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
    })

    // Simulated validation for "realism"
    const [errors, setErrors] = useState<Record<string, boolean>>({})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: false })
        }
    }

    const validateStep = (currentStep: number) => {
        const newErrors: Record<string, boolean> = {}
        let isValid = true

        if (currentStep === 1) {
            if (!formData.email.includes("@")) { newErrors.email = true; isValid = false }
            if (!formData.firstName) { newErrors.firstName = true; isValid = false }
            if (!formData.lastName) { newErrors.lastName = true; isValid = false }
        }
        if (currentStep === 2) {
            if (!formData.address) { newErrors.address = true; isValid = false }
            if (!formData.city) { newErrors.city = true; isValid = false }
            if (!formData.postalCode) { newErrors.postalCode = true; isValid = false }
            if (!formData.country) { newErrors.country = true; isValid = false }
        }
        if (currentStep === 3) {
            if (formData.cardNumber.length < 12) { newErrors.cardNumber = true; isValid = false }
            if (!formData.expiry) { newErrors.expiry = true; isValid = false }
            if (formData.cvc.length < 3) { newErrors.cvc = true; isValid = false }
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateStep(step)) return

        if (step < 3) {
            setStep(step + 1)
        } else {
            setLoading(true)
            // Simulate real API processing delay
            await new Promise(resolve => setTimeout(resolve, 2500))
            setLoading(false)
            setCompleted(true)
            clearCart()
        }
    }

    // --- Components for Reusability & Consistency ---

    const InputField = ({ name, placeholder, icon: Icon, type = "text", full = false }: any) => (
        <div className={`relative group ${full ? 'col-span-2' : ''}`}>
            <div className={`absolute inset-y-0 left-4 flex items-center pointer-events-none transition-colors ${errors[name] ? 'text-red-500' : 'text-white/30 group-focus-within:text-stride-accent'}`}>
                <Icon className="w-5 h-5" />
            </div>
            <input
                required
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`w-full bg-[#111] border ${errors[name] ? 'border-red-500' : 'border-white/10'} rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 font-bold tracking-wide outline-none focus:border-stride-accent focus:shadow-[0_0_15px_rgba(214,255,0,0.1)] transition-all`}
            />
        </div>
    )

    if (items.length === 0 && !completed) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {/* Background ambience */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stride-dark via-[#000] to-[#000] opacity-80" />

                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10"
                    >
                        <div className="w-12 h-12 text-white/20">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        </div>
                    </motion.div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Cart Empty</h1>
                    <p className="mb-8 text-white/40 text-lg max-w-sm mx-auto">Your rotation is looking light. Browse the collection and secure your pair.</p>
                    <Link href="/store" className="inline-flex items-center gap-2 bg-white text-black font-black uppercase px-8 py-4 rounded-xl hover:bg-stride-accent transition-all hover:scale-105">
                        Start Shopping <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        )
    }

    if (completed) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(214,255,0,0.15),_transparent_70%)]" />

                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                    className="w-32 h-32 bg-stride-accent text-black rounded-full flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(214,255,0,0.5)] relative z-10"
                >
                    <Check className="w-16 h-16" strokeWidth={4} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-2 text-white">Secured.</h1>
                    <p className="text-white/60 text-lg max-w-md mx-auto mb-12 font-medium">
                        Your order <span className="text-white">#STRIDE-{Math.floor(Math.random() * 100000)}</span> is locked in. <br />Check your inbox for dispatch details.
                    </p>
                    <Link href="/" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all font-bold tracking-widest uppercase text-sm">
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-stride-accent selection:text-black flex flex-col lg:flex-row font-sans">

            {/* --- LEFT COLUMN: CHECKOUT FORM --- */}
            <div className="flex-1 flex flex-col relative z-10">

                {/* Header Bar */}
                <div className="p-8 lg:px-20 lg:pt-16 lg:pb-8 flex justify-between items-center">
                    <Link href="/store" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors font-bold uppercase text-xs tracking-[0.2em]">
                        <ArrowLeft className="w-3 h-3" /> Back to Store
                    </Link>
                    <div className="flex items-center gap-2 text-stride-accent/80">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Secure Checkout</span>
                    </div>
                </div>

                <div className="flex-1 px-8 lg:px-20 pb-20 max-w-3xl w-full mx-auto">
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 text-white drop-shadow-lg">
                        Checkout <span className="text-stride-accent">.</span>
                    </h1>

                    {/* Steps Indicator */}
                    <div className="flex items-center gap-4 mb-14 relative">
                        {[
                            { id: 1, label: "Details", icon: User },
                            { id: 2, label: "Shipping", icon: Truck },
                            { id: 3, label: "Payment", icon: CreditCard }
                        ].map((s) => (
                            <div key={s.id} className="flex-1 relative">
                                <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${s.id <= step ? 'bg-stride-accent shadow-[0_0_10px_rgba(214,255,0,0.4)]' : 'bg-white/10'}`} />
                                <div className={`absolute top-4 left-0 flex items-center gap-2 transition-colors duration-300 ${s.id <= step ? 'text-white' : 'text-white/20'}`}>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{s.id}. {s.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {/* --- STEP 1: CUSTOMER INFO --- */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-[#0F0F0F] border border-[#222] rounded-[24px] p-8 md:p-10 shadow-xl">
                                        <h2 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">1</span>
                                            Contact Info
                                        </h2>
                                        <div className="space-y-6">
                                            <InputField name="email" type="email" placeholder="Email Address" icon={Mail} />
                                            <div className="grid grid-cols-2 gap-6">
                                                <InputField name="firstName" placeholder="First Name" icon={User} />
                                                <InputField name="lastName" placeholder="Last Name" icon={User} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* --- STEP 2: SHIPPING --- */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-[#0F0F0F] border border-[#222] rounded-[24px] p-8 md:p-10 shadow-xl">
                                        <h2 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">2</span>
                                            Shipping Details
                                        </h2>
                                        <div className="space-y-6">
                                            <InputField name="address" placeholder="Street Address" icon={MapPin} />
                                            <div className="grid grid-cols-2 gap-6">
                                                <InputField name="city" placeholder="City" icon={MapPin} />
                                                <InputField name="postalCode" placeholder="Postal Code" icon={MapPin} />
                                            </div>
                                            <InputField name="country" placeholder="Country" icon={MapPin} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* --- STEP 3: PAYMENT --- */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    <div>
                                        <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">3</span>
                                            Payment Method
                                        </h2>

                                        {/* Realistic Card UI Container */}
                                        {/* REALISTIC CARD UI v3 (Fixed Chips) */}
                                        <div className="max-w-[600px] mx-auto">
                                            <div className="relative w-full aspect-[1.586] bg-[#0F0F0F] rounded-[24px] border border-[#222] p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden group hover:scale-[1.02] transition-transform duration-500">

                                                {/* Texture Overlay */}
                                                <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
                                                <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none" />

                                                {/* Top Row: Chips & Lock */}
                                                <div className="relative z-10 flex justify-between items-start">
                                                    <div className="flex gap-4 items-center">
                                                        {/* EMV Chip */}
                                                        <div className="w-12 h-9 bg-gradient-to-br from-[#d4af37] to-[#a08020] rounded-[6px] relative overflow-hidden shadow-sm border border-[#8a6d1b]/50">
                                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-[#5c4811]/30" />
                                                            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-[#5c4811]/30" />
                                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-4 border border-[#5c4811]/30 rounded-[2px]" />
                                                        </div>

                                                        {/* Contactless Icon */}
                                                        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 opacity-30 text-white rotate-90" stroke="currentColor" strokeWidth={1.5}>
                                                            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                                                            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                                                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                                                        </svg>
                                                    </div>
                                                    <Lock className="text-[#333] w-5 h-5" />
                                                </div>

                                                {/* Middle Row: Number */}
                                                <div className="relative z-10 mt-auto mb-10">
                                                    <label className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] mb-4 block">Card Number</label>
                                                    <input
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        placeholder="0000 0000 0000 0000"
                                                        maxLength={19}
                                                        className={`w-full bg-transparent border-b ${errors.cardNumber ? 'border-red-900 text-red-500' : 'border-[#222] text-[#DDD]'} py-3 text-2xl md:text-3xl font-mono placeholder:text-[#222] outline-none focus:border-[#555] transition-colors`}
                                                    />
                                                </div>

                                                {/* Bottom Row: Date & CVC */}
                                                <div className="relative z-10 grid grid-cols-2 gap-12">
                                                    <div>
                                                        <label className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] mb-4 block">Expiry Date</label>
                                                        <input
                                                            name="expiry"
                                                            value={formData.expiry}
                                                            onChange={handleInputChange}
                                                            placeholder="MM / YY"
                                                            maxLength={7}
                                                            className={`w-full bg-transparent border-b ${errors.expiry ? 'border-red-900 text-red-500' : 'border-[#222] text-[#DDD]'} py-3 text-lg md:text-xl font-mono placeholder:text-[#222] outline-none focus:border-[#555] transition-colors`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-bold text-[#444] uppercase tracking-[0.2em] mb-4 block">CVC</label>
                                                        <input
                                                            name="cvc"
                                                            type="password"
                                                            value={formData.cvc}
                                                            onChange={handleInputChange}
                                                            placeholder="..."
                                                            maxLength={4}
                                                            className={`w-full bg-transparent border-b ${errors.cvc ? 'border-red-900 text-red-500' : 'border-[#222] text-[#DDD]'} py-3 text-lg md:text-xl font-mono placeholder:text-[#222] outline-none focus:border-[#555] transition-colors`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Action Bar */}
                        <div className="mt-12 flex items-center gap-6">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="px-8 py-4 rounded-xl font-bold uppercase text-xs tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                                >
                                    back
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-stride-accent text-black font-black uppercase py-5 rounded-2xl text-lg tracking-[0.2em] hover:bg-white transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(214,255,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <>Processing <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /></>
                                ) : step === 3 ? (
                                    <>Complete Order <CreditCard className="w-5 h-5" /></>
                                ) : (
                                    <>Continue <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* --- RIGHT COLUMN: ORDER RECEIPT --- */}
            <div className="w-full lg:w-[500px] bg-[#0c0c0c] border-l border-white/5 relative hidden lg:block">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                <div className="h-full flex flex-col p-12 lg:p-16 relative z-10">
                    <h2 className="text-xl font-black uppercase tracking-wider mb-10 pb-6 border-b border-white/10 text-white/80">
                        Order Summary
                    </h2>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        {items.map(item => (
                            <div key={item.id} className="flex gap-5 group">
                                <div className="relative w-20 h-20 bg-white/5 rounded-xl overflow-hidden border border-white/5 group-hover:border-stride-accent/50 transition-colors">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="font-bold uppercase text-sm text-white mb-1 group-hover:text-stride-accent transition-colors">{item.name}</h4>
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mb-2">{item.category}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-white/60">Qty {item.quantity}</span>
                                        <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals Section "Receipt" */}
                    <div className="mt-8 pt-8 border-t-2 border-dashed border-white/10 space-y-4">
                        <div className="flex justify-between text-white/40 font-bold uppercase text-xs tracking-wider">
                            <span>Subtotal</span>
                            <span className="text-white">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white/40 font-bold uppercase text-xs tracking-wider">
                            <span>Shipping</span>
                            <span className="text-stride-accent">Free</span>
                        </div>
                        <div className="flex justify-between text-white/40 font-bold uppercase text-xs tracking-wider">
                            <span>Taxes</span>
                            <span className="text-white">Run calculated</span>
                        </div>

                        <div className="flex justify-between items-baseline pt-6 mt-2 border-t border-white/10">
                            <span className="text-sm font-black uppercase tracking-widest text-white/60">Total Due</span>
                            <span className="text-4xl font-black text-white tracking-tighter">${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="pt-6 flex items-center justify-center gap-2 text-[10px] text-white/20 uppercase font-bold tracking-widest">
                            <Lock className="w-3 h-3" /> Encrypted Transaction
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
