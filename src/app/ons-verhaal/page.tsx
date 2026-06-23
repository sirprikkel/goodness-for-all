import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SubsidyFlowScroll from "@/components/ons-verhaal/SubsidyFlowScroll";
import { getSiteContent } from "@/lib/content";

const site = getSiteContent();

export const metadata: Metadata = {
  title: site.story.metaTitle,
};

export default function OnsVerhaalPage() {
  const { settings, story } = getSiteContent();

  return (
    <>
      <Header active="/ons-verhaal" settings={settings} />

      <main className="max-w-[1200px] mx-auto px-container-margin">
        <section className="py-section-gap-lg flex flex-col md:flex-row items-center gap-section-gap-sm pt-section-gap-sm">
          <Reveal className="w-full md:w-1/2 overflow-hidden border-2 border-evergreen">
            <img
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              alt={story.challenge.imageAlt}
              src={story.challenge.image}
            />
          </Reveal>
          <Reveal className="w-full md:w-1/2">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen mb-8">
              {story.challenge.title}
            </h1>
            {story.challenge.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`${
                  index === 0
                    ? "font-body-lg text-body-lg text-evergreen/90 mb-6"
                    : "font-body-md text-body-md text-evergreen/80"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </section>
      </main>

      <SubsidyFlowScroll />

      <main className="max-w-[1200px] mx-auto px-container-margin">
        <section className="py-section-gap-lg">
          <Reveal className="flex flex-col md:flex-row-reverse items-center gap-section-gap-sm">
            <div className="w-full md:w-1/2 overflow-hidden border-2 border-evergreen">
              <img
                className="w-full h-[500px] object-cover hover:grayscale transition-all duration-500"
                alt={story.distribution.imageAlt}
                src={story.distribution.image}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen mb-8">
                {story.distribution.title}
              </h2>
              <p className="font-body-lg text-body-lg text-evergreen/90 mb-6">
                {story.distribution.text}
              </p>
              <ul className="space-y-4">
                {story.distribution.points.map((point) => (
                  <li
                    key={point.label}
                    className="flex items-center gap-4 border-b border-evergreen pb-4"
                  >
                    <span className="material-symbols-outlined text-harvest-orange">
                      {point.icon}
                    </span>
                    <span className="font-label-sm text-label-sm uppercase">{point.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="py-section-gap-lg grid grid-cols-1 md:grid-cols-2 gap-base border-2 border-evergreen">
          <div className="p-12 flex flex-col justify-center bg-pure-mist">
            <div className="mb-6">
              <span className="bg-asparagus text-evergreen font-label-sm text-[10px] px-3 py-1 uppercase tracking-tighter inline-block mb-4">
                {story.meal.eyebrow}
              </span>
              <h2 className="font-headline-md text-headline-md text-evergreen uppercase">
                {story.meal.title}
              </h2>
            </div>
            <p className="font-body-md text-body-md text-evergreen/90 mb-8">
              {story.meal.text}
            </p>
            <div className="flex gap-4">
              {story.meal.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 bg-sandstone-beige border border-evergreen/20 flex-1"
                >
                  <p className="font-headline-md text-harvest-orange mb-1">{stat.value}</p>
                  <p className="text-[10px] uppercase font-bold text-evergreen">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] md:h-full overflow-hidden border-l-2 border-evergreen">
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-full">
              {story.meal.slides.map((slide) => (
                <div key={slide.image} className="flex-none w-full h-full snap-start relative group">
                  <img
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    src={slide.image}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-evergreen/80 p-4">
                    <p className="font-body-lg text-sandstone-beige text-center">
                      {slide.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {story.meal.slides.map((slide, index) => (
                <div
                  key={slide.image}
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? "bg-harvest-orange" : "bg-sandstone-beige/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-section-gap-lg mb-section-gap-lg">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-evergreen mb-12 text-center">
            {story.teamTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {story.team.map((member) => (
              <div key={member.name} className="team-card group">
                <div className="border-2 border-evergreen overflow-hidden aspect-square relative">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={member.alt}
                    src={member.image}
                  />
                  <div className="absolute inset-0 bg-evergreen/10 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="mt-4">
                  <h3 className="font-headline-md text-evergreen">{member.name}</h3>
                  <p className="font-label-sm text-label-sm text-harvest-orange uppercase">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
