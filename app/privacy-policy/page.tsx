"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
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
                        Privacy Policy
                    </h1>

                    <div className="space-y-12 text-lg text-white/80 leading-relaxed font-light">
                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">1. Introduction</h2>
                            <p>
                                Welcome to STRIDE. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">2. The Data We Collect</h2>
                            <p className="mb-4">
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-stride-accent">
                                <li><strong>Identity Data</strong> includes first name, maiden name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                                <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
                                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">3. How We Use Your Data</h2>
                            <p>
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data where we need to perform the contract we are about to enter into or have entered into with you, where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests, or where we need to comply with a legal or regulatory obligation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">4. Data Security</h2>
                            <p>
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black uppercase tracking-wider mb-4 text-white">5. Contact Us</h2>
                            <p>
                                If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:support@stride.com" className="text-stride-accent hover:underline">support@stride.com</a>
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
