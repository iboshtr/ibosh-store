"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const switchLanguage = (nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    const languages = [
        { code: 'tr', label: 'TR' },
        { code: 'en', label: 'EN' },
        { code: 'ar', label: 'AR' }
    ];

    return (
        <div className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-sm hover:bg-white/20 transition-all duration-300">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    disabled={isPending}
                    className={`relative px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${locale === lang.code
                            ? "bg-primary text-white shadow-md scale-105"
                            : "text-primary/60 hover:text-primary hover:bg-white/10"
                        }`}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
}
