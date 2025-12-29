import { Reveal } from "@/components/Reveal";
import HeroLogo from "@/components/HeroLogo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import Features from "@/components/Features";
import Newsletter from "@/components/Newsletter";
import { products } from "@/data/products";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-32 px-4 text-center overflow-hidden min-h-[60vh] flex flex-col justify-center relative">
          {/* Global Texture for Hero */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>

          <div className="container mx-auto max-w-4xl relative z-10">
            <HeroLogo title={t("title")} />
            <Reveal width="100%" delay={0.1} className="flex justify-center">
              <p className="text-2xl md:text-4xl text-primary/70 mb-12 tracking-wide font-light italic">
                {t("subtitle")}
              </p>
            </Reveal>
            <Reveal width="100%" delay={0.2} className="flex justify-center">
              <Link href="#products" className="inline-block border-2 border-primary text-primary px-10 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-[0.2em] text-sm font-bold">
                {t("discover")}
              </Link>
            </Reveal>
          </div>
        </section>

        <Reveal width="100%">
          <Features />
        </Reveal>

        {/* Art of Scent - Overlapping Collage Section */}
        <section id="about" className="py-24 overflow-hidden bg-gradient-to-b from-transparent to-secondary/20">
          <Reveal width="100%">
            <div className="container mx-auto px-4">
              <div className="relative max-w-5xl mx-auto min-h-[600px] flex items-center">

                {/* Background Decorative Element */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-[#f8f5f0] rounded-l-full opacity-60 -z-10" />

                {/* Composition */}
                <div className="w-full relative">
                  <div className="flex flex-col md:flex-row items-center">

                    {/* Text Content */}
                    <div className="w-full md:w-1/3 z-20 mb-10 md:mb-0 md:pr-10 text-center md:text-right rtl:md:text-left rtl:md:pr-0 rtl:md:pl-10">
                      <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 leading-tight">
                        {t("showcase_title_1")} <span className="text-[#C5A059] italic font-light">{t("showcase_title_2")}</span> <br /> {t("showcase_title_3")} <br /> {t("showcase_title_4")}
                      </h2>
                      <p className="text-primary/70 mb-8 leading-relaxed">
                        {t("showcase_subtitle")}
                      </p>
                      <Link href="#products" className="inline-block border-b-2 border-primary pb-1 text-primary font-bold hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">
                        {t("showcase_cta")}
                      </Link>
                    </div>

                    {/* Images Collage */}
                    <div className="w-full md:w-2/3 relative h-[500px] flex items-center justify-center">

                      {/* Featured Image - Bright Collection */}
                      <div className="w-4/5 h-[450px] rounded-[2rem] overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-transform duration-700 border-4 border-white">
                        <img
                          src="/showcase-1.jpg"
                          alt="Bright Collection"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute -bottom-12 -left-12 z-20 w-32 h-32 bg-[#F5F5F0] rounded-full p-4 shadow-xl flex items-center justify-center animate-[spin_12s_linear_infinite]">
                        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                          <path
                            id="homeCirclePathUnique"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            fill="none"
                          />
                          <text className="text-[11px] font-bold uppercase tracking-[0.15em]" fill="#000000" style={{ fill: "black" }}>
                            <textPath href="#homeCirclePathUnique" startOffset="50%" textAnchor="middle">
                              NATURAL SCENTS • LUXURY FEELING •
                            </textPath>
                          </text>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 flex items-center justify-center">
                            <span className="font-serif font-bold text-xl text-[#C5A059]">I</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -bottom-10 -right-4 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-3xl -z-10" />
                      <div className="absolute top-4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Product Grid */}
        <section id="products" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-3 md:gap-8">
              {products.map((product, index) => (
                <div key={product.id} className="w-[calc(50%-0.375rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-2rem)] lg:w-[calc(25%-2rem)] min-w-0 mx-0">
                  <Reveal width="100%" delay={index * 0.1}>
                    <ProductCard product={product} />
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section >

        {/* Newsletter Section */}
        < Reveal width="100%" >
          <Newsletter />
        </Reveal >
      </main >

      <Footer />
    </div >
  );
}
