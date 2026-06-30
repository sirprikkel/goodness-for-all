"use client";

import dynamic from "next/dynamic";

// De kaart wordt client-side geladen (ssr: false). Leaflet heeft de browser-API
// (window/document) nodig, dus we slaan server-side rendering over. Omdat
// `ssr: false` alleen in een Client Component mag, staat dit in dit bestand met
// 'use client' bovenaan.
const LocationsMapView = dynamic(() => import("./LocationsMapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-sandstone-beige/40 text-evergreen/60 font-label-sm text-label-sm">
      Kaart laden…
    </div>
  ),
});

export default function LocationsMap() {
  return (
    <div className="h-[420px] md:h-[520px] w-full overflow-hidden rounded-[12px] border-2 border-evergreen">
      <LocationsMapView />
    </div>
  );
}
