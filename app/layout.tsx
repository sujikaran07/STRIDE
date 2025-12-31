import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Roboto, Libre_Baskerville, Alex_Brush, Oswald } from "next/font/google"
import SmoothScroll from "@/components/smooth-scroll"
import Preloader from "@/components/preloader"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import CartDrawer from "@/components/cart-drawer"

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
})

const alexBrush = Alex_Brush({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
})

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-libre-baskerville",
  display: "swap",
})

const oswald = Oswald({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "STRIDE - Premium Footwear & Urban Gear",
    template: "%s | STRIDE"
  },
  description: "Experience the future of footwear with STRIDE. Discover our premium collection of innovative sneakers, blending cutting-edge technology with urban street style.",
  keywords: ["sneakers", "streetwear", "footwear", "urban fashion", "sneaker culture", "limited edition", "drops", "stride"],
  authors: [{ name: "STRIDE Design Team" }],
  creator: "STRIDE",
  publisher: "STRIDE",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stride-store.com",
    title: "STRIDE - Premium Footwear & Urban Gear",
    description: "Step into excellence with STRIDE. Where innovation meets style in every step.",
    siteName: "STRIDE",
    images: [
      {
        url: "/og-image.jpg", // Ideally, you should create this image
        width: 1200,
        height: 630,
        alt: "STRIDE Premium Footwear Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STRIDE - Premium Footwear",
    description: "Step into excellence. Discover the new collection.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${roboto.variable} ${libreBaskerville.variable} ${alexBrush.variable} ${oswald.variable}`}
      >
        <CartProvider>
          <div className="noise-overlay" />
          <CartDrawer />
          <Preloader />
          <SmoothScroll>{children}</SmoothScroll>
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
