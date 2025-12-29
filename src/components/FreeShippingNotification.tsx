"use client";

import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { Truck, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function FreeShippingNotification() {
    const { total, freeShippingThreshold, remainingForFreeShipping } = useCart();
    const t = useTranslations("Common");
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    // Show notification on mount after a delay, or when total changes
    useEffect(() => {
        if (isDismissed) return;

        // Show if strict conditions met (e.g. user hasn't dismissed)
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, [isDismissed]);

    // If total changes and hits target, re-show if hidden
    useEffect(() => {
        if (total >= freeShippingThreshold && !isVisible) {
            setIsVisible(true);
        }
    }, [total, freeShippingThreshold]);

    if (!isVisible || isDismissed) return null;

    const progress = Math.min((total / freeShippingThreshold) * 100, 100);
    const isFree = total >= freeShippingThreshold;

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
    };

    return (
        <div className="fixed bottom-6 right-4 md:right-8 z-50 w-auto max-w-[calc(100vw-2rem)] md:max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-500">
            <div className={`relative overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl border border-white/40 p-5 ${isFree
                ? "bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white"
                : "bg-white/80 text-gray-900"
                }`}>

                {/* Close Button */}
                <button
                    onClick={handleDismiss}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${isFree ? "hover:bg-white/20 text-white" : "hover:bg-black/5 text-gray-500"
                        }`}
                >
                    <X size={16} />
                </button>

                <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full shrink-0 ${isFree ? "bg-white/20 text-white" : "bg-[#C5A059]/10 text-[#C5A059]"
                        }`}>
                        {isFree ? <Sparkles size={24} /> : <Truck size={24} />}
                    </div>

                    <div className="flex-1 pt-1">
                        <h3 className={`text-base font-bold mb-1 ${isFree ? "text-white" : "text-gray-900"}`}>
                            {isFree ? t("freeShippingUnlocked") : t("freeShippingOffer")}
                        </h3>

                        <p className={`text-sm mb-3 ${isFree ? "text-white/90" : "text-gray-600"}`}>
                            {isFree
                                ? t("greatNewsFreeShipping")
                                : total === 0
                                    ? t("freeShippingOver", { amount: freeShippingThreshold })
                                    : t("addMoreForFreeShipping", { amount: remainingForFreeShipping })
                            }
                        </p>

                        {/* Progress Bar */}
                        {!isFree && (
                            <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden">
                                <div
                                    className="h-full bg-[#C5A059] transition-all duration-700 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
