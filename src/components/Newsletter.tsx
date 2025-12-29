"use client";

import { useTranslations } from "next-intl";
import { Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
    const t = useTranslations("Newsletter");
    const [message, setMessage] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const url = `https://wa.me/905521679185?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setMessage("");
    };

    return (
        <section className="py-24 bg-primary text-[#fffdf7] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C5A059] rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
                        {t("description")}
                    </p>

                    <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t("placeholder")}
                            className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-[#C5A059] transition-all backdrop-blur-sm"
                        />
                        <button type="submit" className="px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 group shadow-lg hover:shadow-green-900/20">
                            {t("button")}
                            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
