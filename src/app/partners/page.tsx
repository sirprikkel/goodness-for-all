import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerForm from "@/components/forms/PartnerForm";
import PartnerHero from "@/components/partners/PartnerHero";
import WaveLines from "@/components/partners/WaveLines";
import { getSiteContent } from "@/lib/content";

const site = getSiteContent();

export const metadata: Metadata = {
  title: site.partners.metaTitle,
};

export default function PartnersPage() {
  const { settings, partners, forms } = getSiteContent();

  return (
    <>
      <Header active="/partners" settings={settings} />
      <main>
        <PartnerHero content={partners.hero} />

        <section className="py-section-gap-lg px-container-margin max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-headline-lg text-headline-lg text-evergreen">
              {partners.pricingTitle}
            </h2>
            <p className="text-body-lg text-body-lg mt-4">{partners.pricingText}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 border-2 flex flex-col h-full relative transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 ${
                  plan.dark
                    ? "bg-evergreen border-evergreen hover:shadow-[8px_8px_0_0_var(--color-harvest-orange)]"
                    : plan.featured
                      ? "bg-pure-mist border-harvest-orange hover:shadow-[8px_8px_0_0_var(--color-harvest-orange)]"
                      : "bg-sandstone-beige border-evergreen hover:shadow-[8px_8px_0_0_var(--color-evergreen)]"
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-harvest-orange text-evergreen px-4 py-1 font-label-sm text-label-sm">
                    {plan.featuredLabel}
                  </div>
                )}
                <span
                  className={`font-label-sm text-label-sm uppercase tracking-widest mb-4 ${
                    plan.dark ? "text-sandstone-beige" : "text-evergreen"
                  }`}
                >
                  {plan.name}
                </span>
                <div
                  className={`text-headline-lg text-headline-lg mb-6 ${
                    plan.dark ? "text-harvest-orange" : "text-evergreen"
                  }`}
                >
                  {plan.price}{" "}
                  <span className={`text-body-md ${plan.dark ? "text-sandstone-beige" : ""}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-body-md ${
                        plan.dark ? "text-sandstone-beige" : ""
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined ${
                          plan.dark ? "text-harvest-orange" : "text-evergreen"
                        }`}
                      >
                        check_box
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 font-cta text-cta transition-colors ${
                    plan.dark
                      ? "bg-sandstone-beige text-evergreen hover:bg-white"
                      : plan.featured
                        ? "bg-harvest-orange text-evergreen active:scale-95 transition-transform"
                        : "bg-evergreen text-sandstone-beige hover:bg-primary"
                  }`}
                >
                  {plan.buttonLabel}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 bg-sandstone-beige items-stretch">
          <div className="h-[400px] md:h-[600px] relative overflow-hidden">
            <img
              className="w-full h-full object-cover"
              alt={partners.freezer.alt}
              src={partners.freezer.image}
            />
          </div>
          <div className="relative overflow-hidden p-container-margin md:p-section-gap-sm flex flex-col justify-center">
            <WaveLines />
            <div className="relative z-10">
              <h3 className="font-headline-lg text-headline-lg text-evergreen mb-6">
                {partners.freezer.title}
              </h3>
              <p className="text-body-lg text-body-lg mb-8 max-w-md">
                {partners.freezer.text}
              </p>
              <div className="border-l-4 border-harvest-orange pl-6 py-2">
                <p className="italic text-body-md font-bold text-evergreen">
                  &quot;{partners.freezer.quote}&quot;
                </p>
                <p className="text-label-sm mt-2 text-on-surface-variant">
                  {partners.freezer.quoteAuthor}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-section-gap-lg px-container-margin max-w-[1200px] mx-auto text-center">
          <h2 className="font-headline-md text-headline-md text-evergreen mb-12">
            {partners.logoGridTitle}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {partners.logoGrid.map((partner) => (
              <div
                key={partner.file}
                className="flex items-center justify-center p-2 border border-evergreen/10"
              >
                <img
                  src={`/images/partners/logos/${partner.file}.png`}
                  alt={partner.alt}
                  className="max-h-40 w-auto max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="py-section-gap-lg bg-evergreen px-container-margin">
          <div className="max-w-[800px] mx-auto bg-pure-mist p-8 md:p-12 border-2 border-harvest-orange">
            <div className="mb-10">
              <h2 className="font-headline-lg text-headline-lg text-evergreen mb-2">
                {partners.formTitle}
              </h2>
              <p className="text-body-md text-evergreen">
                {partners.formText}
              </p>
            </div>
            <PartnerForm content={forms.partner} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
