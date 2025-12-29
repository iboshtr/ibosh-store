"use client";

import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { Plus, X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { createPortal } from "react-dom";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const tCommon = useTranslations("Common");
    const t = useTranslations("Products"); // Using translation namespace context correctly if setup, or fallback

    const [isAdded, setIsAdded] = React.useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleAddToCart = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const handleQuickBuy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const text = `Hello, I would like to order: *${product.name}* (${product.price} TL)`;
        const url = `https://wa.me/905521679185?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (product.images && product.images.length > 0) {
            setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (product.images && product.images.length > 0) {
            setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    // Fallback to legacy 'image' property if 'images' array is missing or empty
    // This handles old cart items stored in localStorage
    const displayImage = (product.images && product.images.length > 0)
        ? product.images[0]
        : (product as any).image;

    return (
        <>
            <div
                className="group relative flex flex-col overflow-hidden bg-white dark:bg-[#121212] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] transition-all duration-500 cursor-pointer rounded-2xl border border-black/5 dark:border-white/10 hover:border-[#C5A059]/30 dark:hover:border-[#C5A059]/50"
                onClick={() => setIsDetailOpen(true)}
            >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#FAFAFA]">
                    {/* Best Seller Badge */}
                    <div className="absolute top-2 left-2 z-20 bg-orange-500 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-sm shadow-sm md:top-3 md:left-3">
                        Best Seller
                    </div>

                    {/* Placeholder for image - using a colored div for now until real images */}
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 text-secondary-foreground/20">
                        {/* If we have a real image, we would use Next.js Image component here */}
                        {displayImage ? (
                            <>
                                {/* Primary Image */}
                                <img
                                    src={displayImage}
                                    alt={product.name}
                                    className={`h-full w-full object-cover transition-all duration-700 ease-in-out ${product.images && product.images.length > 1
                                        ? "group-hover:opacity-0"
                                        : "group-hover:scale-110"
                                        }`}
                                />

                                {/* Secondary Image (on Hover) */}
                                {product.images && product.images.length > 1 && (
                                    <img
                                        src={product.images[1]}
                                        alt={`${product.name} secondary`}
                                        className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
                                    />
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                {product.name}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col p-2.5 md:p-4 flex-grow">
                    <div className="flex flex-col justify-between items-start mb-2 gap-1 md:gap-2">
                        <div className="w-full">
                            <h3 className="text-sm md:text-lg font-medium text-primary leading-tight line-clamp-2 min-h-[2.5em] md:min-h-0 mb-1">
                                {product.name}
                            </h3>
                            {/* Star Rating */}
                            <div className="flex items-center gap-1 mb-2">
                                <div className="flex text-orange-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-[10px] md:text-xs text-gray-400 font-medium">(4.8)</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-start w-full">
                            {product.originalPrice && (
                                <span className="text-[10px] md:text-sm text-gray-400 line-through decoration-gray-400/70">
                                    {product.originalPrice} TL
                                </span>
                            )}
                            <p className="text-base md:text-xl font-bold text-green-800 dark:text-green-400">
                                {product.price} TL
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`mt-auto w-full py-2 md:py-3 px-2 md:px-4 text-[10px] md:text-sm font-medium tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 relative overflow-hidden group rounded-lg md:rounded-xl ${isAdded
                            ? "bg-green-600 text-white"
                            : "bg-accent text-white hover:bg-accent/90"
                            }`}
                    >
                        {/* Sheen Effect */}
                        {!isAdded && (
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[sheen_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                        )}

                        <span className="relative z-10 flex items-center gap-1.5 md:gap-2 transition-transform duration-300 group-hover:scale-110">
                            {isAdded ? (
                                <>
                                    ✓ {tCommon("addedToCart")}
                                </>
                            ) : (
                                <>
                                    <Plus size={14} className="md:w-4 md:h-4" />
                                    {tCommon("addToCart")}
                                </>
                            )}
                        </span>
                    </button>

                    <button
                        onClick={handleQuickBuy}
                        className="mt-2 w-full py-1.5 md:py-2 px-2 md:px-4 text-[10px] md:text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 border border-green-500/30 text-green-700 hover:bg-green-50 rounded-lg group/whatsapp"
                    >
                        <MessageCircle size={12} className="group-hover/whatsapp:scale-110 transition-transform md:w-[14px] md:h-[14px]" />
                        <span className="truncate">{tCommon("quickBuyWhatsApp")}</span>
                    </button>
                </div>
            </div>

            {/* Detail Modal */}
            {isDetailOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#fffdf7] dark:bg-[#121212] w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-y-auto md:rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-300 border border-[#C5A059]/20 dark:border-white/10 flex flex-col md:block">
                        <button
                            onClick={() => setIsDetailOpen(false)}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-black transition-colors text-primary shadow-sm"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row pb-24 md:pb-0">
                            {/* Image Gallery Section */}
                            <div className="w-full md:w-1/2 h-[50vh] md:h-auto min-h-[400px] relative bg-[#f0f0e8] group">
                                {product.images && product.images.length > 0 ? (
                                    <>
                                        <img
                                            src={product.images[currentImageIndex]}
                                            alt={`${product.name} view ${currentImageIndex + 1}`}
                                            className="w-full h-full object-cover transition-opacity duration-300"
                                        />

                                        {/* Gallery Navigation Controls */}
                                        {product.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={prevImage}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronLeft size={24} />
                                                </button>
                                                <button
                                                    onClick={nextImage}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <ChevronRight size={24} />
                                                </button>

                                                {/* Dots Indicator */}
                                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                    {product.images.map((_, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCurrentImageIndex(idx);
                                                            }}
                                                            className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === idx ? "bg-primary w-4" : "bg-primary/30 hover:bg-primary/50"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-8 text-left">
                                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                                    {product.name}
                                </h2>
                                <p className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-400 mb-6 md:mb-8">
                                    {product.price} TL
                                </p>

                                <div className="space-y-6 md:space-y-8 text-primary/80 dark:text-gray-300">
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2 md:mb-3">Description</h3>
                                        <p className="text-sm md:text-base leading-relaxed whitespace-pre-line text-gray-600 dark:text-gray-300">
                                            {/* @ts-ignore */}
                                            {t(`${product.id}.description`)}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2 md:mb-3">Features</h3>
                                        <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600 dark:text-gray-300">
                                            {/* @ts-ignore */}
                                            {t(`${product.id}.features`)}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-2 md:mb-3">Usage</h3>
                                        <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600 dark:text-gray-300">
                                            {/* @ts-ignore */}
                                            {t(`${product.id}.usage`)}
                                        </p>
                                    </div>
                                </div>

                                {/* Desktop Button (Hidden on Mobile) */}
                                <button
                                    onClick={(e) => {
                                        handleAddToCart(e);
                                        setIsDetailOpen(false);
                                    }}
                                    disabled={isAdded}
                                    className={`hidden md:flex w-full mt-10 py-4 px-6 text-sm font-medium tracking-wide uppercase transition-all duration-300 items-center justify-center gap-2 relative overflow-hidden group rounded-xl shadow-md hover:shadow-lg ${isAdded
                                        ? "bg-green-600 text-white"
                                        : "bg-accent text-white hover:bg-accent/90"
                                        }`}
                                >
                                    {/* Sheen Effect */}
                                    {!isAdded && (
                                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[sheen_1s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                                    )}

                                    <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-110">
                                        {isAdded ? (
                                            <>
                                                ✓ {tCommon("addedToCart")}
                                            </>
                                        ) : (
                                            <>
                                                <Plus size={20} />
                                                {tCommon("addToCart")}
                                            </>
                                        )}
                                    </span>
                                </button>

                                <button
                                    onClick={handleQuickBuy}
                                    className="hidden md:flex w-full mt-3 py-3 px-6 text-sm font-bold tracking-wide uppercase transition-all duration-300 items-center justify-center gap-2 rounded-xl border-2 border-green-600 text-green-700 hover:bg-green-50"
                                >
                                    <MessageCircle size={18} />
                                    {tCommon("quickBuyWhatsApp")}
                                </button>
                            </div>
                        </div>

                        {/* Sticky Mobile Button Bar */}
                        <div className="fixed md:hidden bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50 flex items-center justify-between gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase tracking-wide">Total</span>
                                <span className="text-xl font-bold text-primary">{product.price} TL</span>
                            </div>
                            <button
                                onClick={(e) => {
                                    handleAddToCart(e);
                                    setIsDetailOpen(false);
                                }}
                                disabled={isAdded}
                                className={`flex-1 py-3 px-6 text-sm font-bold tracking-wide uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-xl shadow-md ${isAdded
                                    ? "bg-green-600 text-white"
                                    : "bg-accent text-white active:scale-95"
                                    }`}
                            >
                                {isAdded ? (
                                    <>
                                        ✓ {tCommon("addedToCart")}
                                    </>
                                ) : (
                                    <>
                                        <Plus size={18} />
                                        {tCommon("addToCart")}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
