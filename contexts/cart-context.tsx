"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
    id: number | string
    name: string
    price: number
    image: string
    category: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, "quantity">) => void
    removeFromCart: (id: number | string) => void
    updateQuantity: (id: number | string, delta: number) => void
    clearCart: () => void
    cartOpen: boolean
    setCartOpen: (open: boolean) => void
    totalItems: number
    totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [cartOpen, setCartOpen] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("stride-cart")
            if (savedCart) {
                setItems(JSON.parse(savedCart))
            }
        } catch (e) {
            console.error("Failed to load cart", e)
        }
    }, [])

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("stride-cart", JSON.stringify(items))
    }, [items])

    const addToCart = (product: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        setCartOpen(true)
    }

    const removeFromCart = (id: number | string) => {
        setItems((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: number | string, delta: number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(0, item.quantity + delta)
                    return { ...item, quantity: newQty }
                }
                return item
            }).filter(item => item.quantity > 0)
        )
    }

    const clearCart = () => setItems([])

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartOpen,
                setCartOpen,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
