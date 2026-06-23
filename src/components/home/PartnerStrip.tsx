import { getSiteContent } from "@/lib/content";

const SECONDS_PER_LOGO = 3.5;

export default function PartnerStrip() {
  const partners = getSiteContent().partnerLogos;
  const duration = `${partners.length * SECONDS_PER_LOGO}s`;

  return (
    <div
      className="partner-scroll no-scrollbar overflow-hidden"
      aria-label="Onze partners"
    >
      <div
        className="partner-marquee items-center"
        style={{ "--partner-marquee-duration": duration } as Record<string, string>}
      >
        {[...partners, ...partners].map((partner, i) => (
          <div
            key={`${partner.file}-${i}`}
            className="flex-shrink-0 px-12 flex items-center justify-center"
            aria-hidden={i >= partners.length}
          >
            <img
              src={`/images/partners/logos/${partner.file}.png`}
              alt={partner.alt}
              className="h-16 md:h-20 w-auto max-w-[280px] object-contain opacity-80 transition hover:opacity-100 select-none"
              draggable={false}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
