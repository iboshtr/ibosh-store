import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroLogo from "@/components/HeroLogo";
import { Reveal } from "@/components/Reveal";

export default async function AboutPage() {
    const t = await getTranslations("AboutPage");
    const tHome = await getTranslations("HomePage");

    return (
        <div className="flex flex-col min-h-screen bg-[#fffdf7] overflow-x-hidden w-full">
            <Header />

            <main className="flex-grow pt-32 pb-20 w-full">
                <div className="container mx-auto px-6">
                    {/* Hero Title */}
                    <div className="mb-20 text-center">
                        <HeroLogo title={t("title")} />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
                        {/* Text Section */}
                        <div className="w-full md:w-1/2 order-2 md:order-1">
                            <Reveal width="100%" delay={0.2}>
                                <div className="space-y-8">
                                    <h2 className="text-4xl font-serif font-bold text-primary leading-tight">
                                        {t("title")}
                                    </h2>
                                    <div className="w-24 h-1 bg-[#C5A059]"></div>
                                    <p className="text-lg md:text-xl leading-relaxed text-secondary-foreground/80 font-light">
                                        {t("text")}
                                    </p>
                                    <div className="pt-4">
                                        <p className="font-serif italic text-2xl text-[#C5A059]">
                                            "Not A scent... A feeling"
                                        </p>
                                    </div>

                                    <div className="pt-8">
                                        <Link href="/#products" className="inline-block border-b-2 border-primary pb-1 text-primary font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-colors uppercase tracking-widest text-sm">
                                            {tHome("discover")}
                                        </Link>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 order-1 md:order-2">
                            <Reveal width="100%" delay={0.4}>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#C5A059]/20 transform translate-x-6 translate-y-6 rounded-[2rem] -z-10" />
                                    <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                                        <img
                                            src="/showcase-1.jpg"
                                            alt="IBOSH Story"
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                    {/* Decorative Badge */}
                                    <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-3 md:p-4 shadow-xl flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                                            <path
                                                id="aboutCirclePathUnique"
                                                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                                fill="none"
                                            />
                                            <text className="text-[11px] font-bold uppercase tracking-[0.15em]" fill="#000000" style={{ fill: "black" }}>
                                                <textPath href="#aboutCirclePathUnique" startOffset="50%" textAnchor="middle">
                                                    THE STORY • IBOSH • THE STORY • IBOSH •
                                                </textPath>
                                            </text>
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 flex items-center justify-center">
                                                <span className="font-serif font-bold text-xl text-[#C5A059]">I</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
