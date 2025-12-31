"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

export default function TermsOfUsePage() {
    return (
        <main className="min-h-screen bg-stride-dark text-white selection:bg-stride-accent selection:text-stride-dark">
            <Header />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-12 text-stride-accent">
                        Terms of Use
                    </h1>

                    <div className="space-y-12 text-lg text-white/80 leading-relaxed font-light">
                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">1. Agreement to Terms</h2>
                            <p>
                                By accessing our website, you agree to be bound by these Terms of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">2. Use License</h2>
                            <p className="mb-4">
                                Permission is granted to temporarily download one copy of the materials (information or software) on STRIDE's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-stride-accent">
                                <li>Modify or copy the materials;</li>
                                <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                                <li>Attempt to decompile or reverse engineer any software contained on STRIDE's website;</li>
                                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">3. Disclaimer</h2>
                            <p>
                                The materials on STRIDE's website are provided on an 'as is' basis. STRIDE makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">4. Limitations</h2>
                            <p>
                                In no event shall STRIDE or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on STRIDE's website, even if STRIDE or a STRIDE authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">5. Governing Law</h2>
                            <p>
                                These terms and conditions are governed by and construed in accordance with the laws of the State and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-white/10 text-sm text-white/40">
                            Last Updated: January 2025
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    )
}
