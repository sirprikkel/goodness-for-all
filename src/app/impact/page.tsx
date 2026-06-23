import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Counter from "@/components/home/Counter";
import ParticleField from "@/components/impact/ParticleField";
import { getSiteContent, mapsUrl } from "@/lib/content";

const site = getSiteContent();

export const metadata: Metadata = {
  title: site.impact.metaTitle,
};

export default function ImpactPage() {
  const { settings, impact } = getSiteContent();

  return (
    <>
      <Header active="/impact" settings={settings} />
      <main className="max-w-[1200px] mx-auto px-container-margin">
        <section className="py-section-gap-sm md:py-section-gap-lg flex flex-col items-center text-center">
          <div
            className="relative inline-block px-base py-4 border-2 border-evergreen mb-6 bg-pure-mist"
            style={{ transition: "0.2s ease-out" }}
          >
            <Counter
              end={impact.counterValue}
              suffix=""
              className="font-headline-lg text-headline-lg md:text-[64px] text-evergreen block"
            />
            <span className="font-headline-md text-headline-md text-harvest-orange block uppercase tracking-tighter">
              {impact.counterLabel}
            </span>
          </div>
          <p className="font-body-lg text-body-lg text-evergreen/80 italic">{impact.counterText}</p>
        </section>

        <section className="py-section-gap-sm">
          <h2 className="font-headline-md text-headline-md text-evergreen border-l-4 border-harvest-orange pl-4 mb-section-gap-sm">
            {impact.locationsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-base">
            {impact.locations.map((loc) => (
              <a
                key={`${loc.org}-${loc.name}`}
                href={mapsUrl(loc.org, loc.name, loc.city)}
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

        <section className="py-section-gap-sm">
          <div className="relative overflow-hidden bg-sandstone-beige p-section-gap-sm border-evergreen border-2 flex flex-col items-center">
            <ParticleField />
            <div className="relative z-10 flex flex-col items-center">
              <span className="material-symbols-outlined text-[48px] text-harvest-orange mb-4">
                format_quote
              </span>
              <blockquote className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen text-center max-w-3xl mb-8">
                &quot;{impact.quote.text}&quot;
              </blockquote>
              <cite className="not-italic font-label-sm text-label-sm text-evergreen uppercase tracking-widest">
                {impact.quote.author}
              </cite>
            </div>
          </div>
        </section>

        <section className="py-section-gap-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impact.gallery.map((item, index) =>
              item.placeholder ? (
                <div
                  key={`placeholder-${index}`}
                  className="aspect-square bg-surface-variant flex items-center justify-center border-2 border-dashed border-evergreen/30 p-base text-center"
                >
                  <p className="font-label-sm text-label-sm text-evergreen/50">{item.text}</p>
                </div>
              ) : (
                <div
                  key={item.image}
                  className="aspect-square bg-surface-variant relative overflow-hidden"
                >
                  <img
                    className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-500"
                    alt={item.alt}
                    src={item.image}
                  />
                </div>
              ),
            )}
          </div>
        </section>

        <section className="py-section-gap-sm md:py-section-gap-lg grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-evergreen p-section-gap-sm text-pure-mist border-2 border-evergreen transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#ED961D]">
            <h2 className="font-headline-md text-headline-md text-harvest-orange mb-6">
              {impact.research.title}
            </h2>
            <div className="font-body-md text-body-md space-y-4 mb-8">
              <p>{impact.research.text}</p>
            </div>
            <a
              href={impact.research.buttonHref}
              className="bg-harvest-orange text-evergreen px-6 py-3 font-cta text-cta uppercase active:scale-95 transition-transform inline-flex items-center gap-2"
            >
              <span className="material-symbols-outlined">download</span>
              {impact.research.buttonLabel}
            </a>
          </div>
          <div className="p-section-gap-sm bg-sandstone-beige/30 border-2 border-evergreen self-stretch flex flex-col justify-center transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-sandstone-beige hover:shadow-[8px_8px_0_0_#334E1F]">
            <h3 className="font-label-sm text-label-sm text-evergreen uppercase mb-4 tracking-widest">
              {impact.research.sroiEyebrow}
            </h3>
            <p className="font-headline-md text-headline-md text-evergreen mb-4">
              {impact.research.sroiTitle}
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {impact.research.sroiText}
            </p>
            <div className="mt-8 pt-8 border-t border-evergreen/20">
              <p className="font-label-sm text-[12px] text-evergreen/60">
                {impact.research.sroiNote}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
