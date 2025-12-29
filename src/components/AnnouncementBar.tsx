"use client";

import { useTranslations } from "next-intl";

export default function AnnouncementBar() {
    const t = useTranslations("Common");

    return (
        <div className="bg-[#C5A059] text-white overflow-hidden py-2 relative z-[60]">
            <div className="container mx-auto px-4 text-center">
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                    {t("headerAnnouncement")}
                </span>
            </div>
        </div>
    );
}
