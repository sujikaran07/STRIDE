"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Send, MapPin, Mail, Phone } from "lucide-react"

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setSubmitted(true)
        setFormState({ name: "", email: "", subject: "", message: "" })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <main className="min-h-screen bg-stride-dark text-white selection:bg-stride-accent selection:text-stride-dark overflow-hidden relative">
            <Header />

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-stride-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-stride-accent-secondary/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
                        Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-stride-accent to-stride-accent-secondary">Touch</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light">
                        Questions, collaborations, or just want to talk kicks? We're here for it.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col h-full justify-between gap-12"
                    >
                        <div className="space-y-8">
                            <div className="group">
                                <h3 className="text-2xl font-black uppercase mb-4 text-stride-accent flex items-center gap-3">
                                    <MapPin className="w-6 h-6" /> HQ Location
                                </h3>
                                <p className="text-xl text-white/80 leading-relaxed pl-9 group-hover:text-white transition-colors">
                                    123 Stride Avenue<br />
                                    Design District, NY 10012<br />
                                    United States
                                </p>
                            </div>

                            <div className="group">
                                <h3 className="text-2xl font-black uppercase mb-4 text-stride-accent-secondary flex items-center gap-3">
                                    <Mail className="w-6 h-6" /> Email Us
                                </h3>
                                <a href="mailto:hello@stride.com" className="text-xl text-white/80 pl-9 hover:text-stride-accent transition-colors block">
                                    hello@stride.com
                                </a>
                                <a href="mailto:support@stride.com" className="text-xl text-white/80 pl-9 hover:text-stride-accent transition-colors block mt-2">
                                    support@stride.com
                                </a>
                            </div>

                            <div className="group">
                                <h3 className="text-2xl font-black uppercase mb-4 text-stride-accent flex items-center gap-3">
                                    <Phone className="w-6 h-6" /> Call Us
                                </h3>
                                <p className="text-xl text-white/80 pl-9 hover:text-white transition-colors">
                                    +1 (555) 123-4567<br />
                                    Mon-Fri, 9am - 6pm EST
                                </p>
                            </div>
                        </div>

                        <div className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-stride-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <h4 className="text-xl font-bold uppercase mb-2 relative z-10">Join the Community</h4>
                            <p className="text-white/60 mb-6 relative z-10">Sign up for exclusive drops and early access.</p>
                            <div className="flex gap-2 relative z-10">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-black/50 border border-white/20 rounded-lg px-4 py-3 w-full text-white placeholder:text-white/30 focus:outline-none focus:border-stride-accent transition-colors"
                                />
                                <button className="bg-stride-accent text-stride-dark font-bold px-6 py-3 rounded-lg hover:bg-white transition-colors">
                                    JOIN
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative h-full"
                    >
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="w-20 h-20 bg-stride-accent rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10 text-stride-dark" />
                                </div>
                                <h3 className="text-3xl font-black uppercase mb-4">Message Sent!</h3>
                                <p className="text-xl text-white/60">We'll get back to you faster than our shipping.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-stride-accent font-bold hover:text-white transition-colors uppercase tracking-wider"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-white/60 ml-1">Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formState.name}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-stride-accent focus:ring-1 focus:ring-stride-accent transition-all placeholder:text-white/20"
                                            placeholder="Jordan M."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-white/60 ml-1">Email</label>
                                        <input
                                            required
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-stride-accent focus:ring-1 focus:ring-stride-accent transition-all placeholder:text-white/20"
                                            placeholder="jordan@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold uppercase tracking-wider text-white/60 ml-1">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formState.subject}
                                        onChange={handleChange as any}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-stride-accent focus:ring-1 focus:ring-stride-accent transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select a topic</option>
                                        <option value="order">Order Inquiry</option>
                                        <option value="collab">Collaboration</option>
                                        <option value="support">Product Support</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-white/60 ml-1">Message</label>
                                    <textarea
                                        required
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-stride-accent focus:ring-1 focus:ring-stride-accent transition-all resize-none placeholder:text-white/20"
                                        placeholder="Type your message here..."
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                    className="w-full bg-stride-accent text-stride-dark font-black uppercase text-lg tracking-widest py-5 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(214,255,0,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                >
                                    {isSubmitting ? (
                                        <span className="w-6 h-6 border-4 border-stride-dark border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>SEND MESSAGE <Send className="w-5 h-5" /></>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
