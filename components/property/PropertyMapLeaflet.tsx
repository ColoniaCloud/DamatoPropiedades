"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { GoogleMapsIcon } from "@/components/ui/Icons";


interface PropertyMapLeafletProps {
  lat: number;
  lng: number;
  address: string;
}

const markerIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 38" width="28" height="38">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 9.625 14 24 14 24S28 23.625 28 14C28 6.268 21.732 0 14 0z" fill="#1a5fb4" stroke="white" stroke-width="2"/>
    <circle cx="14" cy="14" r="5" fill="white"/>
  </svg>`,
  className: "",
  iconSize: [28, 38],
  iconAnchor: [14, 38],
  popupAnchor: [0, -38],
});

export default function PropertyMapLeaflet({ lat, lng, address }: PropertyMapLeafletProps) {
  const position: [number, number] = [lat, lng];
  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="w-full">
      <div className="w-full h-64 md:h-80 rounded-xl border border-[#e2e4e8] overflow-hidden">
        <MapContainer
          center={position}
          zoom={15}
          style={{ width: "100%", height: "100%" }}
          zoomControl={true}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={markerIcon}>
            <Popup>{address}</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="mt-3 flex flex-col items-center gap-2">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a5fb4] text-white text-sm font-medium hover:bg-[#0e3d7a] transition-colors"
        >
          <GoogleMapsIcon className="w-4 h-4" />
          Ver en Google Maps
        </a>
        <p className="text-xs text-[#5a5a6e]">
          La ubicación es aproximada para preservar la privacidad.
        </p>
      </div>
    </div>
  );
}
