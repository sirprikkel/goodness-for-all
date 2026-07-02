"use client";

import { useState, type ReactNode } from "react";

type Props = {
  /** Deel vóór de @ (bijv. "info"). */
  user: string;
  /** Deel ná de @ (bijv. "goodnessforall.nl"). */
  domain: string;
  /** Optioneel onderwerp voor de mail. */
  subject?: string;
  className?: string;
  children: ReactNode;
};

/**
 * E-mailadres met eenvoudige bot-beveiliging: het volledige adres staat niet in
 * de statische HTML, maar wordt pas in de browser (bij hover/focus/klik) met
 * JavaScript samengesteld. Adres-harvesters die alleen de HTML scrapen vinden
 * dus geen `info@…`-adres.
 */
export default function ObfuscatedMailto({
  user,
  domain,
  subject,
  className,
  children,
}: Props) {
  const [href, setHref] = useState<string>("#");

  const build = () => {
    const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    return `mailto:${user}@${domain}${query}`;
  };

  const reveal = () => {
    setHref((current) => (current === "#" ? build() : current));
  };

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={reveal}
      onFocus={reveal}
      onClick={(e) => {
        // Zorg dat de klik ook bij het eerste bezoek werkt: stel het echte adres
        // direct op het element in voordat de browser navigeert.
        const real = build();
        e.currentTarget.href = real;
        setHref(real);
      }}
    >
      {children}
    </a>
  );
}
