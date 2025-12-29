"use client";

import { useTranslations } from "next-intl";

export default function AnnouncementBar() {
    const t = useTranslations("Common");

    return (
        <div className="bg-[#C5A059] text-white overflow-hidden py-1.5 relative z-[60]">
            <div className="animate-marquee whitespace-nowrap flex gap-10">
                {/* Repeating content for smooth infinite loop */}
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-10">
                        ✨ {t("freeShippingOffer")} ✨ | {t("fastDelivery")} 🚀 | {t("premiumQuality")} 💎
                    </span>
                ))}
            </div>
        </div>
    );
}
