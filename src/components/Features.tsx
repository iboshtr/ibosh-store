import { ShieldCheck, Leaf, Truck, Target } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Features() {
    const t = useTranslations("Features");

    const features = [
        {
            icon: <Truck className="w-8 h-8 text-[#C5A059]" />,
            title: t("fastDeliveryTitle"),
            desc: t("fastDeliveryDesc")
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#C5A059]" />,
            title: t("longLastingTitle"),
            desc: t("longLastingDesc")
        },
        {
            icon: <Leaf className="w-8 h-8 text-[#C5A059]" />,
            title: t("naturalTitle"),
            desc: t("naturalDesc")
        },
        {
            icon: <Target className="w-8 h-8 text-[#C5A059]" />,
            title: t("aromaticPrecisionTitle"),
            desc: t("aromaticPrecisionDesc")
        }
    ];

    return (
        <section className="py-12 bg-white/50 border-b border-primary/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-row md:flex-col items-center text-left md:text-center p-4 md:p-8 hover:bg-secondary/20 hover:backdrop-blur-sm rounded-3xl transition-all duration-500 group border border-transparent hover:border-[#C5A059]/10">
                            <div className="mb-0 md:mb-6 mr-4 md:mr-0 p-3 md:p-6 bg-[#C5A059]/10 rounded-full group-hover:bg-[#C5A059] group-hover:shadow-[0_0_20px_rgba(197,160,89,0.4)] transition-all duration-500 transform group-hover:scale-110 shrink-0">
                                <div className="text-[#C5A059] group-hover:text-white transition-colors duration-500">
                                    {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 md:w-10 md:h-10" })}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-base md:text-xl mb-1 md:mb-3 text-primary">{feature.title}</h3>
                                <p className="text-xs md:text-sm text-primary/70">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
