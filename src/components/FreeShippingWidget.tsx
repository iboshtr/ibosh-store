"use client";

import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { Truck } from "lucide-react";

export default function FreeShippingWidget() {
    const { total, freeShippingThreshold, remainingForFreeShipping } = useCart();
    const t = useTranslations("Common");

    // Don't show if context is not ready or total is 0 (optional, maybe show "Free shipping over 847 TL"?)
    // Let's show it always as an encouragement

    const progress = Math.min((total / freeShippingThreshold) * 100, 100);
    const isFree = total >= freeShippingThreshold;

    return (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium transition-all duration-300 hover:bg-white/20">
            <div className={`p-1 rounded-full ${isFree ? "bg-green-500/20 text-green-600" : "bg-[#C5A059]/10 text-[#C5A059]"}`}>
                <Truck size={14} />
            </div>

            <div className="flex flex-col items-start leading-none gap-0.5">
                {isFree ? (
                    <span className="text-green-600 font-bold">{t("freeShippingUnlocked")}</span>
                ) : (
                    <>
                        <span className="text-primary/70">
                            {total === 0
                                ? "Free Shipping over 847 TL"
                                : t("addMoreForFreeShipping", { amount: remainingForFreeShipping })
                            }
                        </span>
                        {/* Mini Progress Bar */}
                        {total > 0 && (
                            <div className="w-24 h-1 bg-gray-100/50 rounded-full overflow-hidden mt-0.5">
                                <div
                                    className="h-full bg-[#C5A059] transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
