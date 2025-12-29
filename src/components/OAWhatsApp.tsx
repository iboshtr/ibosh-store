"use client";

import { MessageCircle } from "lucide-react";

export default function OAWhatsApp({ phoneNumber }: { phoneNumber: string }) {
    return (
        <a
            href={`https://wa.me/${phoneNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-fade-in-up delay-200"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle size={28} fill="white" className="text-white" />
        </a>
    );
}
