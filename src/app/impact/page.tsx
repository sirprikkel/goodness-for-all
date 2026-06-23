import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Counter from "@/components/home/Counter";
import ParticleField from "@/components/impact/ParticleField";

export const metadata: Metadata = {
  title: "Impact | Goodness for All",
};

/** Build a Google Maps search URL for a location by name + city. */
function mapsUrl(org: string, name: string): string {
  const query = `${org} ${name} Rotterdam`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const LOCATIONS = [
  { org: "Incluzio", name: "De Kip" },
  { org: "Incluzio", name: "De Gaffel" },
  { org: "Incluzio", name: "Middelpunt" },
  { org: "Stichting", name: "Overwin de Armoede" },
  { org: "Speelcentrum", name: "Weena" },
  { org: "Stichting", name: "Isaak en de Schittering" },
  { org: "SOL", name: "Riederkwartier" },
  { org: "SOL", name: "Feyenoord" },
  { org: "Buurtinitiatief", name: "Huiskamer Crooswijk" },
  { org: "Hotspot", name: "Hutspot" },
  { org: "Villa", name: "Vonk" },
  { org: "St. Bewonersgroep", name: "Kralingen-West" },
];

export default function ImpactPage() {
  return (
    <>
      <Header active="/impact" />
      <main className="max-w-[1200px] mx-auto px-container-margin">
        {/* Hero Counter Section */}
        <section className="py-section-gap-sm md:py-section-gap-lg flex flex-col items-center text-center">
          <div
            className="relative inline-block px-base py-4 border-2 border-evergreen mb-6 bg-pure-mist"
            style={{ transition: "0.2s ease-out" }}
          >
            <Counter
              end={6240}
              suffix=""
              className="font-headline-lg text-headline-lg md:text-[64px] text-evergreen block"
            />
            <span className="font-headline-md text-headline-md text-harvest-orange block uppercase tracking-tighter">
              maaltijden uitgedeeld
            </span>
          </div>
          <p className="font-body-lg text-body-lg text-evergreen/80 italic">op weg naar 100.000.</p>
        </section>

        {/* Location Grid Section */}
        <section className="py-section-gap-sm">
          <h2 className="font-headline-md text-headline-md text-evergreen mb-base border-l-4 border-harvest-orange pl-4 mb-section-gap-sm">
            Impact Locaties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-base">
            {LOCATIONS.map((loc) => (
              <a
                key={`${loc.org}-${loc.name}`}
                href={mapsUrl(loc.org, loc.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Bekijk ${loc.name} op Google Maps`}
                className="group p-base bg-pure-mist border border-evergreen flex flex-col justify-between transition-all duration-200 ease-out hover:-translate-y-1 hover:border-2 hover:border-harvest-orange hover:shadow-[4px_4px_0_0_#334E1F] focus:outline-none focus-visible:border-2 focus-visible:border-harvest-orange"
              >
                <div>
                  <p className="font-label-sm text-label-sm text-harvest-orange uppercase mb-2">
                    {loc.org}
                  </p>
                  <h3 className="font-headline-md text-[18px] text-evergreen leading-tight">
                    {loc.name}
                  </h3>
                </div>
                <span className="material-symbols-outlined text-evergreen mt-4 transition-colors group-hover:text-harvest-orange">
                  location_on
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-section-gap-sm">
          <div className="relative overflow-hidden bg-sandstone-beige p-section-gap-sm border-evergreen border-2 flex flex-col items-center">
            <ParticleField />
            <div className="relative z-10 flex flex-col items-center">
              <span className="material-symbols-outlined text-[48px] text-harvest-orange mb-4">
                format_quote
              </span>
              <blockquote className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen text-center max-w-3xl mb-8">
                &quot;Onze samenwerking met Goodness for All brengt mensen echt weer bij elkaar aan
                tafel, zonder drempels.&quot;
              </blockquote>
              <cite className="not-italic font-label-sm text-label-sm text-evergreen uppercase tracking-widest">
                — Rozanne Boelijn (SOL)
              </cite>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-section-gap-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-surface-variant relative overflow-hidden">
              <img
                className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                alt="A documentary style candid photograph of diverse community members sharing a vibrant, colorful meal in a bright Rotterdam community center. The lighting is warm and natural, emphasizing the organic textures of fresh vegetables and wooden tables. The overall aesthetic is minimalist yet deeply human, reflecting the Evergreen and Sandstone Beige palette of the brand."
                src="/images/impact/gallery-1.jpg"
              />
            </div>
            <div className="aspect-square bg-surface-variant flex items-center justify-center border-2 border-dashed border-evergreen/30 p-base text-center">
              <p className="font-label-sm text-label-sm text-evergreen/50">
                Voeg hier je eigen foto&apos;s toe.
              </p>
            </div>
            <div className="aspect-square bg-surface-variant relative overflow-hidden">
              <img
                className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                alt="A high-contrast close-up of hands preparing healthy meals in a professional community kitchen setting. The focus is on the fresh, green ingredients and the precision of the work. The style is brutalist-minimalist, with sharp edges and clear focus, lit by bright, high-key studio-like light against a clean Pure Mist background."
                src="/images/impact/gallery-2.jpg"
              />
            </div>
            <div className="aspect-square bg-surface-variant relative overflow-hidden">
              <img
                className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                alt="An wide-angle atmospheric shot of an urban neighborhood center in Rotterdam at dusk, with warm light glowing from the large square windows. The architecture is modern and geometric. The mood is welcoming and secure, utilizing a deep Evergreen sky and Harvest Orange interior lights to create a comforting community beacon."
                src="/images/impact/gallery-3.jpg"
              />
            </div>
          </div>
        </section>

        {/* Research Block */}
        <section className="py-section-gap-sm md:py-section-gap-lg grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-evergreen p-section-gap-sm text-pure-mist border-2 border-evergreen transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#ED961D]">
            <h2 className="font-headline-md text-headline-md text-harvest-orange mb-6">
              Onderzoeksrapport
            </h2>
            <div className="font-body-md text-body-md space-y-4 mb-8">
              <p>
                Ons laatste onafhankelijke onderzoek toont aan dat de impact van een gezamenlijke
                maaltijd verder gaat dan alleen voeding. Het verlaagt de drempel naar verdere
                hulpverlening en versterkt de sociale cohesie in de wijk.
              </p>
            </div>
            <button className="bg-harvest-orange text-evergreen px-6 py-3 font-cta text-cta uppercase active:scale-95 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined">download</span>
              Rapport downloaden
            </button>
          </div>
          <div className="p-section-gap-sm bg-sandstone-beige/30 border-2 border-evergreen self-stretch flex flex-col justify-center transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-sandstone-beige hover:shadow-[8px_8px_0_0_#334E1F]">
            <h3 className="font-label-sm text-label-sm text-evergreen uppercase mb-4 tracking-widest">
              SROI Analyse
            </h3>
            <p className="font-headline-md text-headline-md text-evergreen mb-4">9-33x Rendement</p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Voor elke euro geïnvesteerd in onze programma&apos;s, genereert de maatschappij een
              waarde tussen de 9 en 33 euro door vermindering van eenzaamheid en verbeterde
              gezondheid.
            </p>
            <div className="mt-8 pt-8 border-t border-evergreen/20">
              <p className="font-label-sm text-[12px] text-evergreen/60">
                * Gebaseerd op externe Social Return on Investment berekeningen 2023-2024.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
