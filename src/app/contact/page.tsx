import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Goodness for All",
  description: "Heb je een vraag of wil je partner worden? Neem contact op.",
};

export default function ContactPage() {
  return (
    <>
      <Header active="/contact" position="fixed" />

      <main className="pt-24 pb-section-gap-lg">
        {/* Hero & Contact Header */}
        <section className="max-w-[1200px] mx-auto px-container-margin py-section-gap-sm border-b-2 border-evergreen">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-base">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen max-w-2xl">
              Neem contact op.
            </h1>
            <p className="font-body-lg text-body-lg text-evergreen/80 max-w-md pb-1">
              Samen bouwen we aan een buurt zonder drempels. Heb je een vraag of wil je partner
              worden? We horen het graag.
            </p>
          </div>
        </section>

        {/* Main Content Area: Asymmetric Layout */}
        <section className="max-w-[1200px] mx-auto px-container-margin mt-gutter grid grid-cols-1 md:grid-cols-12 gap-section-gap-sm">
          {/* Left Column: Form */}
          <div className="md:col-span-7 bg-pure-mist border-2 border-evergreen p-section-gap-sm">
            <ContactForm />
          </div>

          {/* Right Column: Details & Visual */}
          <div className="md:col-span-5 flex flex-col gap-gutter">
            <div className="bg-sandstone-beige p-section-gap-sm border-2 border-evergreen">
              <h3 className="font-label-sm text-label-sm text-evergreen uppercase border-b border-evergreen pb-2 mb-4">
                Onze Basis
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-base">
                  <span className="material-symbols-outlined text-evergreen">mail</span>
                  <a
                    className="font-body-lg text-body-lg font-bold text-evergreen underline decoration-harvest-orange hover:text-harvest-orange transition-colors"
                    href="mailto:info@goodnessforall.nl"
                  >
                    info@goodnessforall.nl
                  </a>
                </div>
                <div className="flex items-start gap-base">
                  <span className="material-symbols-outlined text-evergreen">location_on</span>
                  <p className="font-body-lg text-body-lg text-evergreen">Rotterdam, Nederland</p>
                </div>
                <div className="flex items-start gap-base">
                  <span className="material-symbols-outlined text-evergreen">share</span>
                  <a
                    className="font-body-lg text-body-lg text-evergreen flex items-center gap-2 group"
                    href="#"
                  >
                    <span className="font-bold underline decoration-evergreen group-hover:text-harvest-orange group-hover:decoration-harvest-orange transition-all">
                      LinkedIn
                    </span>
                    <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Visual Detail / Map */}
            <div className="relative overflow-hidden border-2 border-evergreen h-full min-h-[300px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/contact/map.jpg)" }}
              />
              <div className="absolute bottom-4 left-4 bg-evergreen text-sandstone-beige px-4 py-2 font-label-sm text-label-sm uppercase">
                Gevestigd in Rotterdam
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter / Secondary CTA */}
        <section className="max-w-[1200px] mx-auto px-container-margin mt-section-gap-lg">
          <div className="bg-asparagus p-section-gap-sm flex flex-col md:flex-row items-center justify-between gap-base border-2 border-evergreen">
            <div>
              <h4 className="font-headline-md text-headline-md text-evergreen">Blijf op de hoogte.</h4>
              <p className="font-body-md text-body-md text-evergreen/80">
                Ontvang maandelijks onze impact-updates.
              </p>
            </div>
            <div className="flex w-full md:w-auto mt-4 md:mt-0">
              <input
                className="bg-pure-mist border-2 border-evergreen border-r-0 p-base focus:outline-none focus:border-evergreen w-full md:w-64"
                placeholder="E-mail"
                type="email"
              />
              <button className="bg-evergreen text-sandstone-beige px-base py-base border-2 border-evergreen font-cta text-cta uppercase active:scale-95 transition-transform">
                OK
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
