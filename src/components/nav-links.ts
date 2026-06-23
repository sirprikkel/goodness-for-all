/** Single source of truth for site navigation. */
export type NavLink = {
  href: string;
  label: string;
  /** Material Symbols icon name for the mobile drawer. */
  icon: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/ons-verhaal", label: "Ons verhaal", icon: "history_edu" },
  { href: "/impact", label: "Impact", icon: "query_stats" },
  { href: "/partners", label: "Partners", icon: "handshake" },
  { href: "/ik-wil-helpen", label: "Werken bij", icon: "work" },
  { href: "/contact", label: "Contact", icon: "mail" },
];

export const FOOTER_LINKS: { href: string; label: string }[] = [
  { href: "/voor-buurthuizen", label: "Voor buurthuizen" },
  { href: "/anbi", label: "ANBI-informatie" },
  { href: "#", label: "Privacy" },
];
