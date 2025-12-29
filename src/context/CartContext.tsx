"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    lastAddedTime: number;
    isCartOpen: boolean;
    toggleCart: () => void;
    freeShippingThreshold: number;
    remainingForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [lastAddedTime, setLastAddedTime] = useState(0);

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                return current.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
        setLastAddedTime(Date.now());
        setIsCartOpen(true); // Open cart when item is added
    };

    const removeFromCart = (productId: string) => {
        setItems(current => current.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems(current =>
            current.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const toggleCart = () => setIsCartOpen(prev => !prev);

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const freeShippingThreshold = 847;
    const remainingForFreeShipping = Math.max(freeShippingThreshold - total, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, lastAddedTime, isCartOpen, toggleCart, freeShippingThreshold, remainingForFreeShipping }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
