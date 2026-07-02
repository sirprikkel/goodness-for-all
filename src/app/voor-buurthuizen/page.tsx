import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderFlow from "@/components/forms/OrderFlow";
import { getSiteContent } from "@/lib/content";

const site = getSiteContent();

export const metadata: Metadata = {
  title: site.neighborhoods.metaTitle,
  description: site.neighborhoods.metaDescription,
};

export default function VoorBuurthuizenPage() {
  const { settings, neighborhoods, forms } = getSiteContent();

  return (
    <>
      <Header active="/voor-buurthuizen" settings={settings} />

      <main className="flex-grow">
        <section className="max-w-[1200px] mx-auto px-container-margin py-section-gap-sm md:py-section-gap-lg">
          <div className="flex flex-col md:flex-row gap-section-gap-sm items-start">
            <div className="w-full md:w-1/2">
              <h1 className="hero-title font-bold text-headline-lg-mobile md:text-headline-lg text-evergreen mb-base">
                {neighborhoods.title}
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl">
                {neighborhoods.text}
              </p>
              <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl mt-4">
                {neighborhoods.textSecondary}
              </p>
              <p className="text-body-md font-body-md text-on-surface-variant max-w-xl mt-6">
                {neighborhoods.howItWorksText}
              </p>
              <p className="text-body-md font-body-md text-on-surface-variant max-w-xl mt-6">
                {neighborhoods.accessText}
              </p>
              <Link
                href={neighborhoods.accessButtonHref}
                className="inline-block mt-4 bg-harvest-orange text-evergreen font-cta text-cta px-8 py-4 uppercase tracking-widest hover:bg-evergreen hover:text-sandstone-beige transition-all active:scale-95"
              >
                {neighborhoods.accessButtonLabel}
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <OrderFlow content={forms.order} />
            </div>
          </div>
        </section>

        <section className="w-full bg-evergreen py-section-gap-lg">
          <div className="max-w-[1200px] mx-auto px-container-margin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="aspect-square bg-sandstone-beige overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  alt={neighborhoods.visualAlt}
                  src={neighborhoods.visualImage}
                />
              </div>
              <div className="aspect-square bg-harvest-orange flex flex-col justify-end p-gutter">
                <h2 className="font-headline-lg text-headline-lg text-white leading-none">
                  {neighborhoods.visualTitle}
                </h2>
                <p className="text-evergreen font-bold mt-base">
                  {neighborhoods.visualText}
                </p>
              </div>
              <div className="aspect-square border-2 border-sandstone-beige flex items-center justify-center p-gutter">
                <div className="text-center">
                  <span className="material-symbols-outlined text-harvest-orange text-6xl mb-base">
                    {neighborhoods.visualIcon}
                  </span>
                  <p className="text-sandstone-beige font-headline-md text-headline-md uppercase">
                    {neighborhoods.visualIconText}
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
