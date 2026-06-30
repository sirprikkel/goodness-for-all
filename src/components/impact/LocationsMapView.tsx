"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./locations-map.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { IMPACT_LOCATIONS } from "./locations";

// Een afbeeldingsimport levert hier de URL-string op (Turbopack), maar kan in
// andere setups een StaticImageData-object met `.src` zijn. We ondersteunen
// beide vormen.
const assetUrl = (img: string | { src: string }): string =>
  typeof img === "string" ? img : img.src;

// Standaard Leaflet-marker-druppels. De default-iconen verwijzen normaal naar
// bestanden die de bundler niet meeneemt; daarom koppelen we de meegeleverde
// afbeeldingen expliciet aan het default-icoon.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: assetUrl(markerIcon2x),
  iconUrl: assetUrl(markerIcon),
  shadowUrl: assetUrl(markerShadow),
});

// Begrenzing rond alle 14 locaties (Rotterdam + Den Haag), zodat ze allemaal
// goed zichtbaar zijn bij het laden van de kaart.
const bounds = L.latLngBounds(IMPACT_LOCATIONS.map((loc) => loc.position));

export default function LocationsMapView() {
  return (
    <MapContainer
      className="gfa-map"
      bounds={bounds}
      boundsOptions={{ padding: [40, 40] }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bijdragers'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {IMPACT_LOCATIONS.map((loc) => (
        <Marker key={`${loc.title}-${loc.address}`} position={loc.position}>
          <Popup>
            <span className="gfa-popup__subtitle">{loc.subtitle}</span>
            <p className="gfa-popup__title">{loc.title}</p>
            <p className="gfa-popup__city">{loc.city}</p>
            <p className="gfa-popup__address">{loc.address}</p>
            <a
              className="gfa-popup__link"
              href={loc.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Bezoek website
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
