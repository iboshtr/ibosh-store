"use client";

import { useTranslations } from "next-intl";

export default function AnnouncementBar() {
    const t = useTranslations("Common");

    return (
        <div className="fixed top-0 left-0 w-full bg-[#C5A059] text-white overflow-hidden py-2 relative z-[60] shadow-sm">
            <div className="container mx-auto px-4 text-center">
                <span className="text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                    {t("headerAnnouncement")}
                </span>
            </div>
        </div>
    );
}
