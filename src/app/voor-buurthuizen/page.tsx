import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderFlow from "@/components/forms/OrderFlow";

export const metadata: Metadata = {
  title: "Voor buurthuizen | Goodness for All",
  description: "Bestel gezonde, betaalbare maaltijden voor jouw buurthuis.",
};

export default function VoorBuurthuizenPage() {
  return (
    <>
      <Header active="/voor-buurthuizen" />

      <main className="flex-grow">
        {/* Hero + multi-step order form */}
        <section className="max-w-[1200px] mx-auto px-container-margin py-section-gap-sm md:py-section-gap-lg">
          <div className="flex flex-col md:flex-row gap-section-gap-sm items-start">
            <div className="w-full md:w-1/2">
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen mb-base">
                Maaltijden bestellen voor jouw buurthuis.
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl">
                Samen maken we een verschil in de buurt. Wij leveren gezonde, betaalbare maaltijden
                die mensen verbinden. Vul het onderstaande formulier in en we regelen de rest.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <OrderFlow />
            </div>
          </div>
        </section>

        {/* Visual Block */}
        <section className="w-full bg-evergreen py-section-gap-lg">
          <div className="max-w-[1200px] mx-auto px-container-margin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="aspect-square bg-sandstone-beige overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  alt="Buurtbewoners delen samen een maaltijd"
                  src="/images/voor-buurthuizen/meal.jpg"
                />
              </div>
              <div className="aspect-square bg-harvest-orange flex flex-col justify-end p-gutter">
                <h2 className="font-headline-lg text-headline-lg text-white leading-none">
                  GEZOND &amp; VERS
                </h2>
                <p className="text-evergreen font-bold mt-base">
                  Dagelijks bereid door onze chefs.
                </p>
              </div>
              <div className="aspect-square border-2 border-sandstone-beige flex items-center justify-center p-gutter">
                <div className="text-center">
                  <span className="material-symbols-outlined text-harvest-orange text-6xl mb-base">
                    volunteer_activism
                  </span>
                  <p className="text-sandstone-beige font-headline-md text-headline-md uppercase">
                    Voor elkaar, door elkaar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
