"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Instagram, Facebook, Mail } from "lucide-react";

// Custom TikTok Icon (Outline style to match Lucide)
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

export default function Footer() {
    const t = useTranslations("Navigation");

    return (
        <footer className="bg-primary pt-16 pb-8 border-t border-[#C5A059]/30" id="contact">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

                    {/* Column 1: Quick Links */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-start">
                        <h3 className="text-[#C5A059] font-bold uppercase tracking-widest text-sm mb-6 font-serif">
                            {t("quickLinks")}
                        </h3>
                        <div className="flex flex-col gap-4">
                            <Link href="/" className="text-[#F5F5F0] hover:text-[#C5A059] transition-all duration-300 font-medium hover:translate-x-1">
                                {t("home")}
                            </Link>
                            <Link href="/#products" className="text-[#F5F5F0] hover:text-[#C5A059] transition-all duration-300 font-medium hover:translate-x-1">
                                {t("store")}
                            </Link>
                            <Link href="/about" className="text-[#F5F5F0] hover:text-[#C5A059] transition-all duration-300 font-medium hover:translate-x-1">
                                {t("about")}
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Logo & Slogan (Center) */}
                    <div className="flex flex-col items-center justify-center order-first md:order-none mb-8 md:mb-0">
                        <div className="relative mb-6 group">
                            {/* Logo Circle with Shadow */}
                            <div className="absolute inset-0 bg-[#F5F5F0] rounded-full shadow-[0_0_25px_rgba(197,160,89,0.4)] transition-transform duration-700 group-hover:scale-105" />
                            <img
                                src="/logo.jpg"
                                alt="IBOSH"
                                className="h-40 w-40 object-contain rounded-full relative z-10 p-2"
                            />
                        </div>
                        <p className="text-[#C5A059] font-serif italic text-xl tracking-wide text-center opacity-90">
                            Not A scent... A feeling
                        </p>
                    </div>

                    {/* Column 3: Social Icons */}
                    <div className="flex flex-col items-center md:items-end md:text-right">
                        <div className="h-7 hidden md:block"></div>

                        <div className="flex gap-6 mt-2">
                            <a href="https://www.instagram.com/ibosh.tr" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#C5A059] hover:scale-110 transition-all duration-300">
                                <Instagram size={28} strokeWidth={1.5} />
                            </a>
                            <a href="https://www.tiktok.com/@ibosh.ptr" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#C5A059] hover:scale-110 transition-all duration-300">
                                <TikTokIcon className="w-7 h-7" />
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61584621432485" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#C5A059] hover:scale-110 transition-all duration-300">
                                <Facebook size={28} strokeWidth={1.5} />
                            </a>
                            <a href="mailto:ibosh.ptr@gmail.com" className="text-[#F5F5F0] hover:text-[#C5A059] hover:scale-110 transition-all duration-300">
                                <Mail size={28} strokeWidth={1.5} />
                            </a>
                            <a href="https://wa.me/905521679185" target="_blank" rel="noopener noreferrer" className="text-[#F5F5F0] hover:text-[#C5A059] hover:scale-110 transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#C5A059]/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#F5F5F0]/60">
                    <p>&copy; {new Date().getFullYear()} IBOSH. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 font-serif italic opacity-70">Designed for luxury</p>
                </div>
            </div>
        </footer>
    );
}
