import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Counter from "@/components/home/Counter";
import PartnerStrip from "@/components/home/PartnerStrip";

export default function HomePage() {
  return (
    <>
      <Header active="/" />

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url(/images/home/hero.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-container-margin">
          <div className="max-w-2xl bg-white/90 p-10 md:p-16 border-l-8 border-harvest-orange">
            <h1 className="hero-title text-[64px] md:text-[84px] text-evergreen mb-6 leading-none">
              Iedereen een gezonde maaltijd.
            </h1>
            <p className="font-body-lg text-body-lg md:text-2xl text-evergreen mb-10 opacity-90">
              Samen maken we een einde aan honger in Rotterdam.
            </p>
            <Link
              href="/ons-verhaal"
              className="inline-block bg-harvest-orange text-evergreen px-10 py-5 font-cta text-cta uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all"
            >
              Lees ons verhaal
            </Link>
          </div>
        </div>
      </section>

      {/* Three-Card Bento Section */}
      <section className="py-section-gap-lg max-w-[1200px] mx-auto px-container-margin">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <Link
            href="/ons-verhaal"
            className="bg-white border-2 border-evergreen p-8 flex flex-col justify-between aspect-square group hover:bg-sandstone-beige transition-colors duration-300"
          >
            <div>
              <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-tight">
                Ons verhaal
              </h3>
              <p className="font-body-md text-body-md text-evergreen/80">
                De één betaalt wat meer, zodat de ander minder betaalt. Zo werkt het.
              </p>
            </div>
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>

          <Link
            href="/impact"
            className="bg-white border-2 border-evergreen p-8 flex flex-col justify-between aspect-square group hover:bg-sandstone-beige transition-colors duration-300"
          >
            <div>
              <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-tight">
                Impact
              </h3>
              <p className="font-body-md text-body-md text-evergreen/80">
                2.000 maaltijden per maand. Bekijk waar we ze naartoe brengen.
              </p>
            </div>
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">
                query_stats
              </span>
            </div>
          </Link>

          <div className="bg-white border-2 border-evergreen p-8 flex flex-col justify-between aspect-square group hover:bg-sandstone-beige transition-colors duration-300">
            <div>
              <h3 className="font-headline-md text-headline-md mb-4 uppercase tracking-tight">
                Doe mee
              </h3>
              <p className="font-body-md text-body-md text-evergreen/80">
                <Link
                  className="block hover:underline hover:text-harvest-orange transition-colors"
                  href="/partners"
                >
                  Als bedrijf: Word Impact Partner
                </Link>
                <Link
                  className="block hover:underline hover:text-harvest-orange transition-colors"
                  href="/voor-buurthuizen"
                >
                  Als buurthuis: Help de maaltijden verspreiden
                </Link>
                <Link
                  className="block hover:underline hover:text-harvest-orange transition-colors"
                  href="/ik-wil-helpen"
                >
                  Als persoon: Kijk naar onze vacatures, vertel anderen over ons, of doneer!
                </Link>
              </p>
            </div>
            <div className="flex justify-end">
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">
                handshake
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="bg-evergreen py-section-gap-lg text-sandstone-beige">
        <div className="max-w-[1200px] mx-auto px-container-margin text-center">
          <div className="mb-4">
            <Counter
              end={2000}
              className="text-[80px] md:text-[120px] font-headline-lg font-extrabold leading-none text-harvest-orange block"
            />
            <span className="text-2xl md:text-4xl font-headline-md uppercase tracking-widest block -mt-4">
              maaltijden per maand
            </span>
          </div>
          <div className="h-1 w-24 bg-harvest-orange mx-auto mb-8" />
          <p className="font-body-lg text-body-lg opacity-80 max-w-xl mx-auto">
            Via 12 buurthuizen in Rotterdam en Den Haag.
          </p>
        </div>
      </section>

      {/* Quote Block */}
      <section className="bg-sandstone-beige py-section-gap-lg overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-container-margin relative">
          <span className="material-symbols-outlined absolute -top-10 -left-4 text-[120px] text-evergreen/10 select-none">
            format_quote
          </span>
          <div className="relative z-10 max-w-4xl">
            <blockquote className="text-2xl md:text-[32px] font-body-lg leading-relaxed text-evergreen mb-10 italic">
              &quot;Door de maaltijden heb ik het gevoel dat ik het gesprek toch positief kan
              afronden en echt iets kan bieden aan mensen, waar ze op dat moment ook echt mee
              geholpen zijn.&quot;
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[2px] bg-evergreen" />
              <div>
                <p className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
                  Lysdaimarie Conep
                </p>
                <p className="font-label-sm text-label-sm uppercase opacity-70">
                  Coördinator Huis van de Wijk De Kip
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="bg-white py-12 border-y-2 border-evergreen overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-container-margin mb-8">
          <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-center text-evergreen opacity-50">
            Onze trotse partners
          </h4>
        </div>
        <PartnerStrip />
      </section>

      <Footer />
    </>
  );
}
