import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadCard from "@/components/anbi/DownloadCard";

export const metadata: Metadata = {
  title: "ANBI-informatie | Goodness for All",
};

export default function AnbiPage() {
  return (
    <>
      <Header active="/anbi" />
      <main className="max-w-[1200px] mx-auto px-container-margin py-section-gap-sm md:py-section-gap-lg">
        {/* Hero Section / Title */}
        <div className="mb-section-gap-sm md:mb-section-gap-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-base border-b-2 border-evergreen pb-base">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen">
              Transparantie.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Als non-profit organisatie geloven wij in volledige openheid over onze
              bedrijfsvoering en bestedingen. Hieronder vindt u onze ANBI-gegevens en officiële
              documentatie.
            </p>
          </div>
        </div>

        {/* ANBI Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {/* Card 1: Officiële naam */}
          <DownloadCard icon="corporate_fare" title="Officiële naam" tone="sandstone" delay={0}>
            <p>Stichting Goodness for All Foundation Nederland</p>
          </DownloadCard>

          {/* Card 2: RSIN-nummer */}
          <DownloadCard icon="fingerprint" title="RSIN-nummer" tone="mist" delay={100}>
            <p>
              RSIN: 8593.12.744 <br /> KVK: 73004521
            </p>
          </DownloadCard>

          {/* Card 3: Contactgegevens */}
          <DownloadCard
            icon="contact_support"
            title="Contactgegevens"
            tone="sandstone"
            delay={200}
            downloadLabel="Contact"
          >
            <p>Van der Duyn van Maasdamweg 480</p>
            <div>Rotterdam</div>
            <div>info@goodnessforall.nl</div>
          </DownloadCard>

          {/* Card 6: Actueel beleidsplan */}
          <DownloadCard
            icon="description"
            title="Actueel beleidsplan"
            tone="sandstone"
            delay={300}
            downloadLabel="Download PDF"
          >
            <p>Onze strategische visie en operationele doelen voor 2024-2026.</p>
          </DownloadCard>

          {/* Card 7: Jaarverslag */}
          <DownloadCard
            icon="history_edu"
            title="Jaarverslag"
            tone="mist"
            delay={400}
            downloadLabel="Download PDF"
          >
            <p>Verslaglegging van onze activiteiten en bereikte impact van afgelopen jaar.</p>
          </DownloadCard>
        </div>

        {/* Atmospheric Section Divider */}
        <div className="mt-section-gap-lg border-t-2 border-evergreen pt-base flex flex-col md:flex-row items-center gap-gutter">
          <div className="flex-1">
            <h4 className="font-headline-md text-headline-md text-evergreen uppercase">
              Heb je vragen?
            </h4>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Ons team staat klaar om je te helpen bij aanvullende vragen over onze ANBI-status of
              financiële structuur.
            </p>
          </div>
          <div className="flex gap-base">
            <a
              href="mailto:info@goodnessforall.nl"
              className="bg-harvest-orange text-evergreen font-cta text-cta py-4 px-8 uppercase tracking-widest hover:bg-evergreen hover:text-sandstone-beige transition-all duration-300 active:scale-95"
            >
              Mail ons
            </a>
            <Link
              href="/contact"
              className="bg-evergreen text-sandstone-beige font-cta text-cta py-4 px-8 uppercase tracking-widest hover:bg-asparagus transition-all duration-300 active:scale-95"
            >
              Contactformulier
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
