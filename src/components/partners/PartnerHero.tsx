"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content";

type HoverSide = "left" | "right" | null;
type PartnerHeroContent = SiteContent["partners"]["hero"];

export default function PartnerHero({ content }: { content: PartnerHeroContent }) {
  const [hover, setHover] = useState<HoverSide>(null);

  const leftBg =
    hover === "left"
      ? "bg-sandstone-beige"
      : hover === "right"
        ? "bg-pure-mist"
        : "bg-white";

  const rightBg =
    hover === "right"
      ? "bg-primary"
      : hover === "left"
        ? "bg-evergreen/80"
        : "bg-evergreen";

  return (
    <section className="flex flex-col md:flex-row min-h-[618px] border-b-2 border-evergreen">
      <div
        onMouseEnter={() => setHover("left")}
        onMouseLeave={() => setHover(null)}
        className={`${leftBg} w-full md:w-1/2 transition-colors duration-300 p-container-margin md:p-section-gap-sm flex flex-col justify-center cursor-pointer`}
      >
        <div className="w-full max-w-md mx-auto space-y-10">
          <div>
            <h1 className="hero-title font-bold text-headline-lg text-evergreen">
              {content.leftTitle}
            </h1>
            <p className="mt-6 text-body-lg text-body-lg text-on-surface-variant">
              {content.leftText}
            </p>
          </div>
          <div className="border-t-2 border-evergreen/15 pt-10">
            <h2 className="hero-title font-bold text-headline-md text-evergreen">
              {content.impactTitle}
            </h2>
            <p className="mt-4 text-body-md text-body-md text-on-surface-variant">
              {content.impactParagraph1}
            </p>
            <p className="mt-4 text-body-md text-body-md text-on-surface-variant">
              <strong className="text-evergreen">{content.impactBold}</strong>{" "}
              {content.impactParagraph2}
            </p>
          </div>
        </div>
      </div>
      <div
        onMouseEnter={() => setHover("right")}
        onMouseLeave={() => setHover(null)}
        className={`${rightBg} w-full md:w-1/2 transition-colors duration-300 p-container-margin md:p-section-gap-sm flex flex-col justify-center cursor-pointer`}
      >
        <div className="w-full max-w-md mx-auto">
          <h2 className="hero-title font-bold text-headline-lg text-harvest-orange">
            {content.rightTitle}
          </h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {content.badges.map((badge) => (
              <div
                key={badge}
                className="bg-asparagus text-evergreen px-4 py-2 font-label-sm text-label-sm"
              >
                {badge}
              </div>
            ))}
          </div>
          <p className="mt-6 text-body-md text-body-md text-sandstone-beige">
            {content.rightText}
          </p>
          <a
            href={content.buttonHref}
            className="mt-8 inline-block bg-harvest-orange text-evergreen px-8 py-4 font-cta text-cta transition-transform active:scale-95 hover:bg-secondary-container"
          >
            {content.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
