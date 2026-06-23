import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Werken bij | Goodness for All",
};

export default function IkWilHelpenPage() {
  return (
    <>
      <Header active="/ik-wil-helpen" />
      <main className="max-w-[1200px] mx-auto px-container-margin min-h-screen">
        {/* Hero Section */}
        <Reveal
          as="section"
          from="translate-y-8"
          className="py-section-gap-sm md:py-section-gap-lg border-b border-evergreen/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-7">
              <span className="inline-block bg-asparagus text-evergreen font-label-sm text-label-sm px-4 py-1 mb-base">
                CARRIÈRE
              </span>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen mb-gutter">
                Ik wil helpen
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                We bouwen aan iets wat werkt. Geen ingewikkelde structuren, maar direct resultaat
                voor de gemeenschap. Sluit je aan bij een team dat gelooft in radicale
                toegankelijkheid en eerlijke impact.
              </p>
            </div>
            <div className="md:col-span-5 relative aspect-square">
              <div className="absolute inset-0 border-2 border-evergreen translate-x-4 translate-y-4 -z-10"></div>
              <img
                className="w-full h-full object-cover border-2 border-evergreen"
                alt="A focused group of diverse professionals working together in a bright, minimalist office space. The environment features high ceilings, large windows with soft natural light, and clean lines. The team is engaged in a collaborative discussion around a large wooden table. The aesthetic is warm and grounded, utilizing a palette of greens, oranges, and soft creams, echoing a minimalist-brutalist design style with sharp edges and clear structure."
                src="/images/ik-wil-helpen/hero.jpg"
              />
            </div>
          </div>
        </Reveal>

        {/* Vacancies Section (Bento Grid) */}
        <Reveal as="section" from="translate-y-8" className="py-section-gap-lg">
          <div className="flex justify-between items-end mb-section-gap-sm">
            <div>
              <h2 className="font-headline-md text-headline-md text-evergreen">Huidige Vacatures</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Vind jouw plek in ons groeiende ecosysteem.
              </p>
            </div>
            <div className="hidden md:block">
              <button className="bg-harvest-orange text-evergreen font-cta text-cta px-gutter py-4 border-2 border-evergreen hover:bg-evergreen hover:text-sandstone-beige transition-all">
                OPEN SOLLICITATIE
              </button>
            </div>
          </div>
          {/* Placeholder Card for No Vacancies */}
          <div className="bg-pure-mist border-2 border-evergreen p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
            <span
              className="material-symbols-outlined text-evergreen text-5xl mb-base"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              search_off
            </span>
            <p className="font-headline-md text-headline-md text-evergreen mb-gutter max-w-md">
              We zoeken mensen die kunnen helpen met promotie, logistiek en een co-founder.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-section-gap-sm">
              Van een unieke bijbaan voor een paar uur in de week waar je écht verschil maakt, en
              ca. €20 per uur verdient, tot mede founder worden. Kom met een goed verhaal en we zijn
              in gesprek!
            </p>
            <div className="w-full h-px bg-evergreen/20 mb-section-gap-sm max-w-sm"></div>
            <a
              href="mailto:info@goodnessforall.nl"
              className="inline-block bg-evergreen text-sandstone-beige font-cta text-cta px-gutter py-4 border-2 border-evergreen hover:bg-harvest-orange hover:text-evergreen transition-all"
            >
              STUUR EEN E-MAIL
            </a>
          </div>
        </Reveal>

        {/* Culture Blocks */}
        <Reveal as="section" from="translate-y-8" className="pb-section-gap-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-evergreen">
            <div className="p-gutter border-b md:border-b-0 md:border-r border-evergreen bg-sandstone-beige">
              <span className="material-symbols-outlined text-evergreen mb-base">diversity_3</span>
              <h3 className="font-headline-md text-headline-md text-evergreen mb-base">
                Community First
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Alles wat we doen begint bij de buurt. Onze medewerkers staan met hun voeten in de
                klei.
              </p>
            </div>
            <div className="p-gutter border-b md:border-b-0 md:border-r border-evergreen bg-pure-mist">
              <span className="material-symbols-outlined text-evergreen mb-base">speed</span>
              <h3 className="font-headline-md text-headline-md text-evergreen mb-base">
                Directe Impact
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Geen lange vergaderingen. We zien een kans, we toetsen het, en we voeren het uit, en
                leren van wat er goed en fout ging.
              </p>
            </div>
            <div className="p-gutter bg-asparagus/20">
              <span className="material-symbols-outlined text-evergreen mb-base">balance</span>
              <h3 className="font-headline-md text-headline-md text-evergreen mb-base">
                Eerlijk &amp; Open
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Transparantie is onze basis. We delen onze successen én onze uitdagingen.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Quote Section */}
        <Reveal as="section" from="translate-y-8" className="py-section-gap-lg">
          <div className="bg-evergreen p-10 md:p-20 text-sandstone-beige relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-6xl font-headline-lg opacity-20 absolute -top-10 -left-6">
                &ldquo;
              </span>
              <p className="font-headline-md text-headline-md md:text-4xl italic mb-gutter leading-tight">
                Bij Goodness for All zie je dat je echt een verschil maakt voor de mensen om de
                hoek. Eigenlijk maken we het makkelijk voor mensen om elkaar verder te helpen.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-harvest-orange border border-sandstone-beige"></div>
                <div>
                  <p className="font-label-sm text-label-sm text-harvest-orange">
                    REINOUT DE KRAKER
                  </p>
                  <p className="font-body-md text-body-md opacity-80">Founder</p>
                </div>
              </div>
            </div>
            {/* Abstract geometry for brutalist feel */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-harvest-orange/10 transform rotate-45 translate-x-10 translate-y-10"></div>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
