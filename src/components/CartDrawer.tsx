"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { X, Plus, Minus, Trash2, Truck } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function CartDrawer() {
    const { items, removeFromCart, updateQuantity, total, isCartOpen, toggleCart } = useCart();
    const t = useTranslations("Common");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!mounted) return null;

    // Free Shipping Progress Logic
    const freeShippingThreshold = 847;
    const progress = Math.min((total / freeShippingThreshold) * 100, 100);
    const remainingForFreeShipping = Math.max(freeShippingThreshold - total, 0);

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={toggleCart}
            />

            {/* Side Drawer */}
            <div
                className={`fixed top-0 right-0 z-[101] h-full w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-in-out border-l border-white/40 flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100/50">
                    <h2 className="text-xl font-bold uppercase tracking-widest text-[#C5A059]">
                        {t("cart")}
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="p-2 hover:bg-black/5 rounded-full transition-colors"
                    >
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Free Shipping Progress */}
                <div className="px-6 pt-6 pb-2">
                    <div className="bg-gray-100 rounded-full h-2 w-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 text-xs font-medium text-center text-gray-600 flex items-center justify-center gap-1">
                        {remainingForFreeShipping > 0 ? (
                            <span>
                                {t("addMoreForFreeShipping", { amount: remainingForFreeShipping })}
                            </span>
                        ) : (
                            <span className="text-green-600 flex items-center gap-1">
                                <Truck size={14} /> {t("freeShippingUnlocked")}
                            </span>
                        )}
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                            <ShoppingBagIcon />
                            <p>{t("emptyCart")}</p>
                            <button
                                onClick={toggleCart}
                                className="text-sm font-medium text-primary underline"
                            >
                                {t("startShopping")}
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 animate-in slide-in-from-right-10 duration-300">
                                {/* Image */}
                                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                    <img
                                        src={item.images && item.images.length > 0 ? item.images[0] : (item as any).image}
                                        alt={item.name}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex flex-1 flex-col">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{item.name}</h3>
                                        <p className="ml-4">{item.price * item.quantity} TL</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.price} TL / unit</p>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="text-gray-500 hover:text-primary transition-colors disabled:opacity-30"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="font-medium min-w-[1rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="text-gray-500 hover:text-primary transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            className="font-medium text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-full"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-100 p-6 bg-white/50 backdrop-blur-md">
                        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                            <p>{t("total")}</p>
                            <p className="text-2xl text-gradient-emerald">{total} TL</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 mb-6">
                            {t("shippingCalculatedAtCheckout")}
                        </p>
                        <div className="mt-6">
                            <a
                                href={`https://wa.me/905521679185?text=${encodeURIComponent(
                                    `Hello IBOSH, I would like to order:\n\n${items
                                        .map((item) => `- ${item.name} (x${item.quantity}) - ${item.price * item.quantity} TL`)
                                        .join("\n")}\n\nTotal: ${total} TL`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 rounded-xl border border-transparent bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-[#20bd5a] hover:scale-[1.02] transition-all duration-300 hover:shadow-xl w-full"
                            >
                                <span>{t("checkout")}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                    <path d="M9 10a.5 5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                                </svg>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </>,
        document.body
    );
}

function ShoppingBagIcon() {
    return (
        <svg
            className="w-12 h-12 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
    );
}
