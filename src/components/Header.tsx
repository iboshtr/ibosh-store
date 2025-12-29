"use client";

import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
    const t = useTranslations("Navigation");
    const tHome = useTranslations("HomePage");
    const { items, lastAddedTime, toggleCart } = useCart();
    const [isShaking, setIsShaking] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (lastAddedTime > 0) {
            setIsShaking(true);
            const timer = setTimeout(() => setIsShaking(false), 400); // 400ms match css animation
            return () => clearTimeout(timer);
        }
    }, [lastAddedTime]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-500 border-b ${isScrolled
                ? "bg-white/80 backdrop-blur-xl border-[#C5A059]/40 shadow-sm py-2"
                : "bg-transparent border-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between flex-wrap md:flex-nowrap">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 group">
                    <img
                        src="/logo.jpg"
                        alt="IBOSH"
                        className={`w-auto object-contain rounded-full transition-all duration-500 ${isScrolled ? "h-10 md:h-14" : "h-14 md:h-20 shadow-lg"
                            }`}
                    />
                </Link>

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors relative group">
                        {t("home")}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/cart" className="text-sm font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors relative group">
                        {t("cart")}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/about" className="text-sm font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors relative group">
                        {t("about")}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/contact" className="text-sm font-bold uppercase tracking-widest hover:text-[#C5A059] transition-colors relative group">
                        {t("contact")}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A059] transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-6">
                    <ThemeToggle />
                    <LanguageSwitcher />

                    <button
                        onClick={toggleCart}
                        className={`relative group p-2 transition-transform duration-300 hover:scale-105 ${isShaking ? 'animate-shake' : ''}`}
                    >
                        {/* Elegant Shopping Bag Icon */}
                        <ShoppingBag
                            size={28}
                            strokeWidth={1.5}
                            className="text-primary group-hover:text-[#C5A059] transition-colors duration-300 md:w-8 md:h-8"
                        />

                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-[#C5A059] text-[9px] md:text-[10px] font-bold text-white shadow-md animate-in zoom-in duration-300 border-2 border-white">
                                {itemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
