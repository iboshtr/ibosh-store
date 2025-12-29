"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Home, Store, ShoppingBag, Mail } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function MobileNav() {
    const t = useTranslations("Navigation");
    const { toggleCart, items } = useCart();
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show nav when scrolling up or at the bottom
            if (currentScrollY < lastScrollY || window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                setIsVisible(true);
            } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
                // Hide when scrolling down
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-100 pb-safe transition-transform duration-300 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] ${isVisible ? "translate-y-0" : "translate-y-full"
                }`}
        >
            <div className="flex justify-around items-center p-3">
                <Link href="/" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-[#C5A059] transition-colors">
                    <Home size={20} strokeWidth={1.5} />
                    <span className="text-[10px] font-medium tracking-wide">{t("home")}</span>
                </Link>

                <Link href="/#products" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-[#C5A059] transition-colors">
                    <Store size={20} strokeWidth={1.5} />
                    <span className="text-[10px] font-medium tracking-wide">{t("store")}</span>
                </Link>

                <button
                    onClick={toggleCart}
                    className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-[#C5A059] transition-colors relative"
                >
                    <div className="relative">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        {itemCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                                {itemCount}
                            </span>
                        )}
                    </div>
                    <span className="text-[10px] font-medium tracking-wide">{t("cart")}</span>
                </button>

                <Link href="/contact" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-[#C5A059] transition-colors">
                    <Mail size={20} strokeWidth={1.5} />
                    <span className="text-[10px] font-medium tracking-wide">{t("contact")}</span>
                </Link>
            </div>

            {/* Safe Area for iPhone Home Indicator */}
            <div className="h-safe-area-bottom w-full bg-transparent" />
        </div>
    );
}
