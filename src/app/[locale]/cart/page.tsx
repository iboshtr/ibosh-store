"use client";

import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/routing";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, total } = useCart();
    const t = useTranslations("Common");
    const tNav = useTranslations("Navigation");

    const handleCheckout = () => {
        const phoneNumber = "905521679185";

        // Format message
        // Format message as Professional Invoice
        const date = new Date().toLocaleDateString('tr-TR');
        let message = `🧾 *IBOŞH STORE - INVOICE*\n`;
        message += `📅 Date: ${date}\n`;
        message += `-----------------------------\n`;

        items.forEach(item => {
            message += `▪️ ${item.quantity}x ${item.name}\n   └ ${item.price * item.quantity} TL\n`;
        });

        message += `-----------------------------\n`;
        message += `💰 *TOTAL: ${total} TL*\n`;
        message += `-----------------------------\n`;
        message += `📍 Please send your location to confirm order.`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-8">{tNav("cart")}</h1>

                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-500 mb-6">{t("emptyCart")}</p>
                        <Link href="/" className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors">
                            {tNav("home")}
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Cart Items */}
                        <div className="flex-grow space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 bg-white shadow-sm rounded-lg items-center">
                                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0 relative overflow-hidden rounded-md">
                                        {/* Placeholder image */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 font-bold text-xs text-center text-primary/40">
                                            {item.images && item.images.length > 0 ? (
                                                <img
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                item.name
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-medium text-primary truncate">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.price} TL</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="text-right min-w-[80px]">
                                        <p className="font-medium mb-1">{item.price * item.quantity} TL</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-700 text-sm flex items-center justify-end gap-1 ml-auto"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:w-80 h-fit bg-primary/5 p-6 rounded-xl">
                            <h2 className="text-xl font-bold mb-6">{t("total")}</h2>

                            <div className="flex justify-between items-center text-2xl font-bold mb-8">
                                <span>{total} TL</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-green-600 text-white py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                            >
                                {t("checkout")}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
