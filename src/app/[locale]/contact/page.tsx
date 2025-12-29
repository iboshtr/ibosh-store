"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail, MapPin, Phone, Instagram, Facebook, ArrowLeft, X } from "lucide-react";
import { products } from "@/data/products";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default function ContactPage() {
    const t = useTranslations("Contact");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    // Take only the first 3 products as requested
    const marqueeProducts = products.slice(0, 3);

    return (
        <div className="min-h-screen bg-secondary">
            {/* Lightbox Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-accent transition-colors p-2"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Full size view"
                        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl animate-in zoom-in-50 duration-300"
                    />
                </div>
            )}

            {/* Header with Back Button and Logo */}
            <div className="container mx-auto max-w-2xl px-4 pt-8 mb-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
                        <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
                            <ArrowLeft size={20} />
                        </div>
                        <span>{t("back")}</span>
                    </Link>

                    <Link href="/">
                        <img src="/logo.jpg" alt="IBOSH" className="h-16 w-16 object-contain rounded-full shadow-md" />
                    </Link>

                    {/* Spacer to balance the flex layout */}
                    <div className="w-24"></div>
                </div>
            </div>

            <div className="container mx-auto max-w-2xl px-4 pb-12">
                <div className="bg-white/50 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-sm border border-primary/5">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">
                        {t("title")}
                    </h1>

                    <div className="space-y-8">
                        {/* Phone */}
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Phone size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{t("phone")}</h3>
                            <a href="tel:+905521679185" className="text-xl text-primary font-medium hover:text-accent transition-colors">
                                +90 552 167 9185
                            </a>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                            <a
                                href="https://wa.me/905521679185"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl text-primary font-medium hover:text-accent transition-colors"
                            >
                                +90 552 167 9185
                            </a>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                                <Mail size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{t("email")}</h3>
                            <a href="mailto:ibosh.ptr@gmail.com" className="text-lg text-primary font-medium hover:text-accent transition-colors">
                                ibosh.ptr@gmail.com
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold mb-6">{t("social")}</h3>
                            <div className="flex gap-6 justify-center">
                                <a
                                    href="https://www.instagram.com/ibosh.tr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-primary/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <Instagram size={24} />
                                </a>
                                <a
                                    href="https://www.tiktok.com/@ibosh.ptr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-primary/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <TikTokIcon className="w-6 h-6" />
                                </a>
                                <a
                                    href="https://www.facebook.com/profile.php?id=61584621432485"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-primary/5 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                                >
                                    <Facebook size={24} />
                                </a>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary">
                                <MapPin size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{t("location")}</h3>
                            <p className="text-lg text-primary/80">
                                {t("address")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Marquee/Gallery */}
            <div className="py-12 overflow-hidden bg-primary/5 mt-8 border-t border-primary/5">
                <div className="flex w-[200%] animate-scroll hover:pause-on-hover">
                    {/* First set of items */}
                    <div className="flex justify-around min-w-[50%] gap-8 px-8">
                        {marqueeProducts.map((product, i) => {
                            const image = product.images?.[0];
                            return (
                                <div
                                    key={`p1-${i}`}
                                    className="relative h-40 w-40 md:h-56 md:w-56 flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 cursor-pointer group"
                                    onClick={() => image && setSelectedImage(image)}
                                >
                                    {image ? (
                                        <>
                                            <img src={image} alt={product.name} className="h-full w-full object-cover group-hover:opacity-90 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/50 text-white rounded-full p-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6" /><path d="M8 11h6" /></svg>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 p-2 text-center text-sm">
                                            {product.name}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {/* Duplicate set for seamless loop */}
                    <div className="flex justify-around min-w-[50%] gap-8 px-8">
                        {marqueeProducts.map((product, i) => {
                            const image = product.images?.[0];
                            return (
                                <div
                                    key={`p2-${i}`}
                                    className="relative h-40 w-40 md:h-56 md:w-56 flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden transform transition-all hover:scale-105 cursor-pointer group"
                                    onClick={() => image && setSelectedImage(image)}
                                >
                                    {image ? (
                                        <>
                                            <img src={image} alt={product.name} className="h-full w-full object-cover group-hover:opacity-90 transition-opacity" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="bg-black/50 text-white rounded-full p-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="M11 8v6" /><path d="M8 11h6" /></svg>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 p-2 text-center text-sm">
                                            {product.name}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
