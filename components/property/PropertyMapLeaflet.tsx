"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.007 3.799-5.139 3.799-9.292a8.1 8.1 0 10-16.2 0c0 4.153 1.855 7.285 3.8 9.292a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          Ver en Google Maps
        </a>
        <p className="text-xs text-[#5a5a6e]">
          La ubicación es aproximada para preservar la privacidad.
        </p>
      </div>
    </div>
  );
}
